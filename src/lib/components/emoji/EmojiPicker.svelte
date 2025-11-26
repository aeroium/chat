<script lang="ts">
  import Emoji from "./Emoji.svelte";
  import { Plus } from "@lucide/svelte";

  let { emojis = $bindable(), draftedMessage = $bindable() } = $props();
</script>

<div class="space-y-2">
  <p class="text-lg font-semibold">Emojis</p>

  <div class="grid grid-cols-7 gap-2">
    {#each emojis as emoji}
      <Emoji {emoji} bind:emojis bind:ref={draftedMessage} />
    {/each}

    <button
      onclick={async () => {
        const query = window.prompt("Enter emoji or emoji name to add:");
        if (!query) return;

        const { find } = await import("node-emoji");
        const result = find(query.trim().replaceAll(" ", "_"));

        if (!result?.emoji) {
          return void alert("Invalid emoji or emoji name");
        } else {
          emojis = [...emojis, result.emoji];
          localStorage.emojis = emojis;
        }
      }}
      class="bg-zinc-800 select-none hover:scale-115 cursor-pointer duration-200 rounded-lg p-2"
    >
      <Plus />
    </button>
  </div>
</div>
