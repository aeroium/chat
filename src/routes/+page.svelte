<script>
  import { ExternalLink } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Aero — The Better wasteof.money/chat</title>
</svelte:head>

<main class="space-y-4">
  <span class="flex items-center">
    <h1 class="text-4xl font-bold">Aero</h1>
    <sup class="text-lg">(BETA)</sup>
  </span>
  <p>
    Revolutionize your <span class="font-bold animate-pulse text-indigo-400"
      >wasteof.money/chat</span
    > experience, with Aero.
  </p>

  <button
    onclick={function () {
      this.disabled = true;
      location.href = "/login";
    }}
    class="disabled:opacity-50 disabled:cursor-wait duration-200 w-fit cursor-pointer p-3 bg-zinc-100 text-black font-bold rounded-xl flex items-center gap-2"
  >
    <ExternalLink size={22} />
    Launch Aero
  </button>

  <p></p>
</main>
