<script lang="ts">
  let { ref = $bindable(), Icon, format } = $props();
</script>

<button
  onclick={() => {
    ref = `${ref}<${format}></${format}>`;
    document.querySelector<HTMLInputElement>("#messagebox")?.focus();
  }}
  class="bg-zinc-800 flex items-center justify-center select-none hover:scale-115 cursor-pointer duration-200 rounded-lg p-2"
>
  <Icon size={18} />
</button>
