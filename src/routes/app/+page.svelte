<script lang="ts">
  import type { Message as MessageType } from "$lib/types/message";
  import type { PageServerData } from "./$types";
  import * as emoji from "node-emoji";

  import { ChatSocket } from "$lib/socket";
  import { makehash } from "$lib/hash";

  import DOMPurify from "dompurify";
  import { browser } from "$app/environment";

  import MessageBox from "$lib/components/message/MessageBox.svelte";
  import Message from "$lib/components/message/Message.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  import { LoaderCircle } from "@lucide/svelte";

  const { data }: { data: PageServerData } =
    $props();
  const socket = new ChatSocket(data?.token ?? "");

  let messages: MessageType[] = $state(data.messages);

  let draft = $state("");
  $effect(() => {
    draft = emoji.emojify(draft);
  });

  socket.listen((message) => {
    message._id = makehash(12);

    if (browser) {
      message.raw = message.content;
      message.content = DOMPurify.sanitize(message.content);
    }

    messages = [message, ...messages];
  });
</script>

<svelte:head>
  <title>Aero - Chat</title>
</svelte:head>

<main class="flex gap-2 justify-center">
  <Sidebar bind:draftedMessage={draft} />

  <div class="w-150">
    <div
      class="[&::-webkit-scrollbar]:w-0 rounded-xl h-[71.67vh] flex flex-col-reverse mb-2 overflow-y-auto gap-2.5"
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

    <MessageBox bind:value={draft} send={() => socket.send(draft)} />
  </div>
</main>
