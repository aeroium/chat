<script lang="ts">
  let { emoji, ref = $bindable(), emojis = $bindable<string[]>() } = $props();
</script>

<button
  oncontextmenu={(e) => {
    event?.preventDefault()
    emojis = emojis.filter((item: string) => item !== emoji)
    localStorage.emojis = emojis.join(",")
  }}
  onclick={() => {
    ref = `${ref} ${emoji}`;
    document.querySelector<HTMLInputElement>("#messagebox")?.focus();
  }}
  class="bg-zinc-800 select-none hover:scale-115 cursor-pointer duration-200 rounded-lg p-2"
  >{emoji}</button
>
