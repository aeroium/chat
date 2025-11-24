<script>
  import { goto } from "$app/navigation";
  import { ExternalLink } from "@lucide/svelte";
</script>

<main class="space-y-4">
  <span class="flex items-center">
    <h1 class="text-6xl font-bold">Aero</h1>
    <sup class="text-lg">(BETA)</sup>
  </span>
  <p>
    Revolutionize your <span class="font-bold animate-pulse text-indigo-400"
      >wasteof.money/chat</span
    > experience, with Aero.
  </p>

  <button
    onclick={() => goto("/app")}
    class="w-fit cursor-pointer p-3 bg-zinc-100 text-black font-bold rounded-xl flex items-center gap-2"
  >
    <ExternalLink size={22} />
    Launch Aero
  </button>
</main>
