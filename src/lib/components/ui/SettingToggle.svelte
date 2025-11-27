<script lang="ts">
  import Switch from "./Switch.svelte";

  let { setting = $bindable(), name } = $props();
</script>

<div class="flex items-center gap-2">
  <Switch bind:toggled={setting} />
  <p>{name}</p>
</div>
