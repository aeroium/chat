<script>
  import { invalidateAll } from "$app/navigation";

  async function logout() {
    await fetch("/logout");
    invalidateAll();
    window.location.href = "/login";
  }
</script>

<svelte:head>
  <title>Aero — Log out?</title>
</svelte:head>

<p>Are you sure you want to log out?</p>

<div class="grid grid-cols-2 w-64 text-center gap-2">
  <button
    class="cursor-pointer p-2 mt-4 bg-zinc-100 justify-center text-black font-bold rounded-xl flex items-center gap-2"
    onclick={logout}>Yes, I'm sure</button
  >
  <button
    class="cursor-pointer p-2 mt-4 bg-red-400 justify-center text-black font-bold rounded-xl flex items-center gap-2"
    onclick={() => (location.href = "/app")}>No thanks</button
  >
</div>
