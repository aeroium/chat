<script lang="ts">
  import { tick } from "svelte";

  let { ref = $bindable(), Icon, format } = $props();

  function formatText() {
    const input = document.querySelector<HTMLInputElement>("#messagebox");
    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    if (start !== end) {
      const before = ref.slice(0, start);
      const selected = ref.slice(start, end);
      const after = ref.slice(end);

      ref = `${before}<${format}>${selected}</${format}>${after}`;

      const newStart = start + format.length + 2;
      const newEnd = newStart + selected.length;
      tick().then(() => input.setSelectionRange(newStart, newEnd));
    } else {
      const before = ref.slice(0, start);
      const after = ref.slice(start);

      ref = `${before}<${format}></${format}>${after}`;

      const cursorPos = start + format.length + 2;
      tick().then(() => input.setSelectionRange(cursorPos, cursorPos));
    }

    input.focus();
  }
</script>

<button
  onclick={formatText}
  class="bg-zinc-800 active:scale-90 w-full flex items-center justify-center select-none hover:scale-115 cursor-pointer duration-200 rounded-lg p-2"
>
  <Icon size={18} />
</button>
