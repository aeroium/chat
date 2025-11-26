<script lang="ts">
  import { Cog } from "@lucide/svelte";
  import "../app.css";

  import type { LayoutProps } from "./$types";
  import { goto } from "$app/navigation";

  let { children, data }: LayoutProps = $props();

  const user = data?.user;
</script>

<svelte:head>
  <meta name="title" content="Aero — The Better wasteof.money/chat" />
  <meta
    name="description"
    content="Revolutionize your wasteof.money/chat experience with Aero, a clean, sleek, and modern chat client."
  />

  <meta name="theme-color" content="#e4e4e7" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Aero — The Better wasteof.money/chat" />
  <meta
    property="og:description"
    content="Revolutionize your wasteof.money/chat experience with Aero, a clean, sleek, and modern chat client."
  />
  <meta property="og:image" content="/assets/images/bg.png" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta
    property="twitter:title"
    content="Aero — The Better wasteof.money/chat"
  />
  <meta
    property="twitter:description"
    content="Revolutionize your wasteof.money/chat experience with Aero, a clean, sleek, and modern chat client."
  />
  <meta property="twitter:image" content="/assets/images/bg.png" />
</svelte:head>

<div class="text-gray-200 bg-zinc-950 h-screen">
  <nav class="bg-zinc-900 px-8 py-4 flex items-center justify-between">
    <a href="/" class="text-3xl font-bold no-underline!">Aero</a>
    <div class="flex items-center gap-4">
      {#if user.name}
        <a href="/logout" class="font-bold no-underline!">@{user?.name}</a>
        <div class="flex items-center gap-0.5">
          <button
            onclick={() => goto("/settings")}
            class="p-2 hover:bg-zinc-800 rounded-lg active:scale-90 group duration-200 cursor-pointer"
          >
            <Cog class="group-active:rotate-180 duration-500" />
          </button>
        </div>
      {:else}
        <a href="/login" class="no-underline!">Login</a>
      {/if}
    </div>
  </nav>

  <div class="p-10">
    {@render children()}
  </div>
</div>
