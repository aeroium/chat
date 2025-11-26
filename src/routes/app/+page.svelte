<script lang="ts">
  import type { Message as MessageType } from "$lib/types/message";
  import type { PageServerData } from "./$types";

  import { makehash } from "$lib/hash";

  import MessageBox from "$lib/components/message/MessageBox.svelte";
  import Message from "$lib/components/message/Message.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  import { LoaderCircle } from "@lucide/svelte";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { emojify } from "node-emoji";

  const { data }: { data: PageServerData } = $props();

  let messages: MessageType[] = $state(data.messages);
  let draft = $state("");

  // we import these on the client-side later heh
  let socket: any = null;
  let DOMPurify: any = null;

  $effect(() => {
    draft = emojify(draft);
  });

  onMount(async () => {
    console.log("[debug] app has been loaded");

    const [{ ChatSocket }, dompurifyModule] = await Promise.all([
      import("$lib/socket"),
      import("dompurify"),
    ]);

    DOMPurify = dompurifyModule.default;

    socket = new ChatSocket(data?.token ?? "");

    socket.listen((message: MessageType) => {
      message._id = makehash(12);
      message.raw = message.content;
      message.content = DOMPurify.sanitize(message.content, {
        FORBID_ATTR: ["style", "direction"],
        FORBID_TAGS: ["big", "small"],
      });
      messages = [message, ...messages];
    });
  });
</script>

<svelte:head>
  <title>Aero - Chat</title>
</svelte:head>

<main class="flex gap-2 justify-center">
  <Sidebar bind:draftedMessage={draft} />

  <div class="w-150">
    <div
      class="[&::-webkit-scrollbar]:w-0 rounded-xl h-[70.67vh] flex flex-col-reverse mb-2 overflow-y-auto gap-2.5"
    >
      {#if browser}
        {#each messages as message (message._id)}
          <Message data={message} />
        {/each}
      {:else}
        <div class="flex items-center justify-center min-h-[73.5vh]">
          <p
            class="text-2xl flex items-center gap-2 font-bold p-5 rounded-xl bg-zinc-900"
          >
            <LoaderCircle class="animate-spin" />
            Loading messages...
          </p>
        </div>
      {/if}
    </div>

    <MessageBox
      bind:value={draft}
      send={() => {
        if (socket) socket.send(draft);
      }}
      exportMessages={() => {
        const blob = new Blob([JSON.stringify(messages, null, 2)], {
          type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `messages-${makehash(8)}.json`;
        a.click();

        URL.revokeObjectURL(url);
        a.remove();
      }}
    />
  </div>
</main>
