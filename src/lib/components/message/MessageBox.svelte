<script lang="ts">
  import { Download, Plus, Send } from "@lucide/svelte";
  let { value = $bindable(), send, exportMessages } = $props();

  let files = $state<FileList>();

  function handleUpload() {
    const picker = document.querySelector<HTMLInputElement>("#file-select");

    if (picker) {
      picker.click();
    }
  }
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    send();
    value = "";
  }}
  class="flex gap-2 items-center"
>
  <div
    class="focus-within:ring-2 duration-200 ring-zinc-100 bg-zinc-900 w-full flex items-center rounded-xl"
  >
    <button
      onclick={handleUpload}
      class="m-2 p-1 hover:bg-zinc-800 duration-200 rounded-lg cursor-pointer"
    >
      <Plus size={26} class="hover:rotate-180 duration-300" />
    </button>

    <input
      bind:value
      id="messagebox"
      autocomplete="off"
      type="text"
      placeholder="Type your message here..."
      class="w-full p-2 pl-0 outline-none"
    />
  </div>

  <button
    onclick={(e) => {
      e.preventDefault();
      exportMessages();
    }}
    class="cursor-pointer active:scale-90 duration-200 p-3.75 bg-zinc-900 font-bold rounded-xl flex items-center gap-2"
  >
    <Download size={19} />
  </button>

  <button
    class="cursor-pointer active:scale-90 duration-200 p-3.5 bg-zinc-100 text-black font-bold rounded-xl flex items-center gap-2"
  >
    <Send size={19} />
  </button>
</form>

<input
  onchange={async () => {
    const file = files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      files = undefined;
      return;
    }

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      alert("Upload failed: " + (await res.text()));
      return;
    }

    const { url } = await res.json();
    value = `<img src="${url}" />`;
    document.querySelector("form")?.requestSubmit();

    files = undefined;
  }}
  bind:files
  type="file"
  id="file-select"
  accept="image/*"
  class="absolute invisible"
/>
