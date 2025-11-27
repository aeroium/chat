<script lang="ts">
  import moment from "moment";

  import { type Component } from "svelte";
  import type { Message } from "$lib/types/message";

  import { page } from "$app/state";
  import { BadgeCheck, Code } from "@lucide/svelte";
  import { unemojify } from "node-emoji";
  import { loadSettings } from "$lib/settings";

  const { data }: { data: Message } = $props();

  let rawToggled = $state(false);
  let settings = loadSettings();
</script>

{#snippet action(title: string, Icon: Component, action: () => any)}
  <button
    class="p-1 rounded-lg duration-200 cursor-pointer hover:bg-zinc-800"
    onclick={action}
    {title}
  >
    <Icon size={18} />
  </button>
{/snippet}

<div
  class={[
    "bg-zinc-900 p-3 rounded-xl relative group",
    data.content.includes(`@${page.data.user.name}`) ? "bg-yellow-500/10!" : "",
  ]}
>
  <div
    class="absolute text-zinc-200/75 m-1 top-1 right-1 hidden group-hover:block"
  >
    <div class="grid grid-cols-1 gap-1">
      {@render action("Toggle Raw", Code, () => (rawToggled = !rawToggled))}
    </div>
  </div>

  <div class="flex items-center mb-2">
    {#if !settings.general.showCompactMessages}
      <img
        class="size-10 rounded-full! mr-2"
        src={`https://api.wasteof.money/users/${data.from.name}/picture`}
        alt=""
      />

      <div>
        <div class="flex items-center gap-2">
          <a
            target="_blank"
            href={`https://wasteof.money/@${data.from.name}`}
            class="cursor-pointer font-bold no-underline!">@{data.from.name}</a
          >
          {#if data.from.verified}
            <BadgeCheck size={18} />
          {/if}
        </div>
        <p class="text-zinc-200/50 text-xs">
          {moment(data.time).format("h:mm:ss A")}
        </p>
      </div>
    {:else}
      <div class="flex items-center gap-1.5 -mb-2">
        <div class="flex items-center gap-1.5">
          <a
            target="_blank"
            href={`https://wasteof.money/@${data.from.name}`}
            class="cursor-pointer font-bold no-underline! text-sm"
            >@{data.from.name}</a
          >
          {#if data.from.verified}
            <BadgeCheck size={12} />
          {/if}
        </div>
        <span class="text-sm text-zinc-200/50">&bull;</span>
        <p class="text-zinc-200/50 text-xs">
          {moment(data.time).format("h:mm:ss A")}
        </p>
      </div>
    {/if}
  </div>

  <p
    class={[
      "space-y-2 wrap-break-word",
      settings.general.showCompactMessages ? "text-sm" : "text-base",
    ]}
  >
    {@html data.content}
  </p>

  {#if rawToggled}
    <p class="text-sm mt-2 text-zinc-200/50 italic">
      Raw: {unemojify(data.raw || data.content)}
    </p>
  {/if}
</div>
