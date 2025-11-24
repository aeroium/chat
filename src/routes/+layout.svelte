<script lang="ts">
  import "../app.css";
  import type { LayoutProps } from "./$types";

  let { children, data }: LayoutProps = $props();

  const user = data?.user;
</script>

<div class="text-gray-200 bg-zinc-950 h-screen">
  <nav class="bg-zinc-900 px-8 py-4 flex items-center justify-between">
    <a href="/" class="text-3xl font-bold no-underline!">Aero</a>
    <div>
      {#if user.name}
        <a href="/logout" class="font-bold no-underline!">@{user?.name}</a>
      {:else}
        <a href="/login" class="no-underline!">Login</a>
      {/if}
    </div>
  </nav>

  <div class="p-10">
    {@render children()}
  </div>
</div>
