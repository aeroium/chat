<script lang="ts">
    import { Plus, Edit } from "@lucide/svelte";

    let {
        macros = $bindable(),
        draftedMessage = $bindable(),
    }: { macros: { name: string; message: string }[]; draftedMessage: string } =
        $props();
</script>

<div class="space-y-2">
    <p class="text-lg font-semibold">Macros</p>

    <div class="grid grid-cols-2 gap-2">
        {#each macros as macro, i}
            <div
                class="bg-zinc-800 rounded-lg p-2 flex items-center gap-2 min-h-[50px]"
            >
                <button
                    onclick={() => {
                        draftedMessage = macro.message;
                        document.querySelector("form")?.requestSubmit();
                    }}
                    class="flex-1 text-left break-words leading-tight text-[0.7rem]
                               min-w-0 pr-1"
                >
                    {macro.name}
                </button>
                <button
                    onclick={() => {
                        const name = window.prompt("Macro name?", macro.name);
                        const message = window.prompt(
                            "Macro text?",
                            macro.message,
                        );
                        if (!name || !message) return alert("Invalid macro");
                        macros[i] = { name, message };
                        macros = [...macros];
                        localStorage.macros = macros;
                    }}
                    class="flex-shrink-0 p-1.5 rounded-lg hover:scale-105 duration-200"
                >
                    <Edit />
                </button>
            </div>
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
