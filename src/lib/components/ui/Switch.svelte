<script lang="ts">
  import { Check, X } from "@lucide/svelte";

  let { toggled = $bindable() } = $props();
</script>

<button
  onclick={() => (toggled = !toggled)}
  class={[
    "rounded-full p-1 cursor-pointer duration-200 active:scale-90",
    toggled ? "bg-green-500/50" : "bg-red-500/50",
  ]}
>
  {#if toggled}
    <Check size={16} color="white" absoluteStrokeWidth={true} />
  {:else}
    <X size={16} absoluteStrokeWidth={true} />
  {/if}
</button>
