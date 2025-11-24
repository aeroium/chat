<script lang="ts">
  import Emoji from "./Emoji.svelte";
  import { Plus } from "@lucide/svelte";
  import { find } from "node-emoji";

  let { emojis = $bindable(), draftedMessage = $bindable() } = $props();
</script>

<div class="space-y-2">
  <p class="text-lg font-semibold">Emojis</p>

  <div class="grid grid-cols-7 gap-2">
    {#each emojis as emoji}
      <Emoji {emoji} bind:ref={draftedMessage} />
    {/each}

    <button
      onclick={() => {
        const emoji = window.prompt("Enter emoji or emoji name to add:");

        const result = find(emoji?.trim().replaceAll(" ", "_") || "");
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
