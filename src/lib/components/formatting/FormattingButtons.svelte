<script lang="ts">
  import {
    Bold,
    Code,
    GalleryHorizontal,
    Highlighter,
    Italic,
    Quote,
    Strikethrough,
    Subscript,
    Superscript,
    Underline,
  } from "@lucide/svelte";
  import Format from "./Format.svelte";

  let { ref = $bindable() } = $props();
</script>

<div class="space-y-2">
  <h1 class="text-lg font-semibold">Formatting</h1>

  <div class="grid grid-cols-5 gap-2">
    <Format bind:ref Icon={Bold} format="b" />
    <Format bind:ref Icon={Italic} format="i" />
    <Format bind:ref Icon={Highlighter} format="mark" />
    <Format bind:ref Icon={Strikethrough} format="del" />
    <Format bind:ref Icon={Underline} format="ins" />
    <Format bind:ref Icon={Quote} format="blockquote" />
    <Format bind:ref Icon={Code} format="code" />
    <Format bind:ref Icon={GalleryHorizontal} format="marquee" />
    <Format bind:ref Icon={Superscript} format="sup" />
    <Format bind:ref Icon={Subscript} format="sub" />
  </div>
</div>
