<script lang="ts">
  import { Plus } from "@lucide/svelte";

  let {
    macros = $bindable(),
    draftedMessage = $bindable(),
  }: { macros: { name: string; message: string }[]; draftedMessage: string } =
    $props();
</script>

<div class="space-y-2">
  <p class="text-lg font-semibold">Macros</p>

  <div class="grid grid-cols-2 gap-2">
    {#each macros as macro}
      <button
        onclick={() => {
          draftedMessage = macro.message;
          document.querySelector("form")?.requestSubmit();
        }}
        class="bg-zinc-800 hover:scale-105 rounded-lg p-2 duration-200 select-none"
      >
        {macro.name}
      </button>
    {/each}

    <button
      onclick={() => {
        const name = window.prompt("Macro name?");
        const message = window.prompt("Macro text?");
        if (!name || !message) return alert("Invalid macro");

        macros = [...macros, { name, message }];
        localStorage.macros = macros;
      }}
      class="bg-zinc-800 hover:scale-105 flex items-center justify-center rounded-lg p-2 duration-200"
    >
      <Plus />
    </button>
  </div>
</div>
