<script lang="ts">
  import SettingToggle from "$lib/components/ui/SettingToggle.svelte";
  import { defaultSettings } from "$lib/settings";

  import { House, Image, Lock, RotateCcw, Save, User } from "@lucide/svelte";
  import { onMount, type Component } from "svelte";

  let category = $state("general");

  let settings = $state<{
    general: {
      showCompactMessages: boolean;
    };
  }>(defaultSettings);

  onMount(() => {
    const savedSettings = localStorage.settings;
    if (!savedSettings) {
      localStorage.settings = JSON.stringify(defaultSettings);
    }

    settings = JSON.parse(localStorage.settings);
  });

  function saveSettings() {
    localStorage.settings = JSON.stringify(settings);
  }
</script>

{#snippet CategoryButton(Icon: Component<any, {}, "">, title: string)}
  <button
    onclick={() => (category = title.toLowerCase())}
    class="p-3 flex items-center gap-3 hover:translate-x-1.5 active:scale-95 hover:bg-zinc-800 text-left cursor-pointer font-semibold duration-200 w-full rounded-xl"
  >
    <Icon size={24} />
    <p>{title}</p>
  </button>
{/snippet}

<svelte:head>
  <title>Aero - Settings</title>
</svelte:head>

<main>
  <div class="flex gap-2 mx-auto w-4/5">
    <div class="bg-zinc-900 p-6 rounded-xl h-[78.5vh] w-1/3">
      <h1 class="text-3xl font-bold">Settings</h1>

      <div class="flex flex-col my-2">
        {@render CategoryButton(House, "General")}
        {@render CategoryButton(User, "Account")}
        {@render CategoryButton(Image, "Content")}
        {@render CategoryButton(Lock, "Privacy")}
      </div>
    </div>

    <div class="relative bg-zinc-900 p-6 rounded-xl w-2/3">
      <h1 class="text-3xl font-bold mb-2">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      {#if category === "general"}
        <div>
          <div class="space-y-4">
            <p>Basic settings</p>

            <SettingToggle
              bind:setting={settings.general.showCompactMessages}
              name="Compact Messages"
            />
          </div>
        </div>
      {:else if category === "account"}
        <div class="space-y-4">
          <p>Account-related settings, like blocking users</p>
        </div>
      {:else if category === "content"}
        <div class="space-y-4">
          <p>Manage and control how images are shown</p>

          <div></div>
        </div>
      {:else if category === "privacy"}
        <div class="space-y-4">
          <p>
            Aero does not store any information that can be traced back to you.
            Cloudflare Analytics is used but that's only so I can monitor
            performance and how often the application is being used (helps me
            know what to improve).
          </p>
          <p>
            Big things are planned, so there may be settings here in the future.
          </p>
        </div>
      {:else}
        <p>You shouldn't be here?</p>
      {/if}

      <button
        onclick={saveSettings}
        class="active:scale-90 mb-6 absolute bottom-0 left-1/ duration-200 w-fit cursor-pointer p-3 bg-zinc-100 text-black font-bold rounded-xl flex items-center gap-2"
      >
        <Save />
        Save Changes
      </button>

      <button
        onclick={() => {
          settings = defaultSettings;
        }}
        class="active:scale-90 mb-6 absolute bottom-0 left-2/8 duration-200 w-fit cursor-pointer p-3 bg-zinc-800 text-zinc-100 font-bold rounded-xl flex items-center gap-2"
      >
        <RotateCcw />
        Reset
      </button>
    </div>
  </div>
</main>
