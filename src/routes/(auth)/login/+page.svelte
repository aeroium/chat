<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import axios from "axios";

  let username = $state<string>();
  let password = $state<string>();
  let error = $state({
    error: false,
    message: "",
  });

  async function login() {
    if (!username || !password) {
      error.error = true;
      error.message = "Please provide valid login details";
      return;
    }

    const res = await axios.post("/login", {
      username,
      password,
    });
    const {
      success,
      message,
    }: {
      success: boolean;
      message: string;
    } = res.data;

    if (success) {
      location.href = "/app"
      return;
    }

    error.error = true;
    error.message = message;
  }
</script>

<svelte:head>
  <title>Aero - Login</title>
</svelte:head>

<main class="flex flex-col items-center">
  <div class="p-6 md:w-3/10 bg-zinc-900 rounded-xl space-y-4">
    <h1 class="text-3xl font-bold">Log into Aero</h1>

    <p>
      Using your
      <span class="animate-pulse font-bold text-indigo-400">
        wasteof.money
      </span>
      account
    </p>

    <form
      onsubmit={async (e) => {
        e.preventDefault();
        await login();
      }}
    >
      <div class="flex flex-col gap-2">
        <input
          type="text"
          bind:value={username}
          class="bg-zinc-950/40 outline-none focus:ring-zinc-100 focus:ring-2 duration-200 rounded-xl p-3"
          placeholder="Username"
        />

        <input
          type="password"
          bind:value={password}
          class="bg-zinc-950/40 outline-none focus:ring-zinc-100 focus:ring-2 duration-200 rounded-xl p-3"
          placeholder="Password"
        />

        <input
          type="submit"
          value="Log in"
          class="active:scale-95 active:animate-pulse duration-200 cursor-pointer mt-2 p-3 bg-zinc-100 text-black font-bold rounded-xl flex items-center gap-2"
        />
      </div>
    </form>

    <small>
      Please note that Aero is a third-party client and has no affiliation with
      wasteof.money whatsoever. Aero does not store your credentials.
    </small>
  </div>

  {#if error.error}
    <div class="mt-3 bg-red-400/30 w-3/10 rounded-xl p-3">
      <h1 class="text-xl font-bold">Oops! That's an error.</h1>
      <p>{error.message.charAt(0).toUpperCase() + error.message.slice(1)}</p>
    </div>
  {/if}
</main>
