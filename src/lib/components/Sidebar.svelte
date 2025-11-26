<script lang="ts">
    import { onMount } from "svelte";
    import EmojiPicker from "./emoji/EmojiPicker.svelte";
    import MacroList from "./macros/MacroList.svelte";

    import list from "$lib/emojis.json";
    import FormattingButtons from "./formatting/FormattingButtons.svelte";

    let { draftedMessage = $bindable() } = $props();

    let emojis = $state<string[]>([]);
    let macros = $state<{ name: string; message: string }[] | null>(null);

    onMount(() => {
        emojis = (localStorage.emojis ?? "😄").split(",");
        const stored = localStorage.getItem("macros");
        macros = stored ? JSON.parse(stored) : [];
    });

    $effect(() => {
        if (macros) localStorage.setItem("macros", JSON.stringify(macros));
    });
</script>

<div class="w-96 hidden md:block bg-zinc-900 p-6 rounded-xl space-y-4">
    <EmojiPicker bind:emojis bind:draftedMessage />
    <FormattingButtons bind:ref={draftedMessage} />

    {#if macros !== null}
        <MacroList bind:macros bind:draftedMessage />
    {:else}
        <p>Loading macros…</p>
    {/if}
</div>
