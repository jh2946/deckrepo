<script lang="ts">
    import Media from "$lib/components/Media.svelte";
    import { read } from "$lib/utils";
    export let items: {
        file: File,
        src: string
    }[] = []
    export let dzid: string
    export let label: string = ''
    let files: File[]
    async function addFiles() {
        const zone = document.getElementById(`${dzid}`) as HTMLInputElement
        for (const file of zone.files as FileList) {
            const reader = new FileReader()
            items.push({
                file,
                src: await read(file)
            })
            items = items
        }
    }
</script>

<div class="outer-dropzone">
    <label for="{dzid}">
        {label}
        <div class="dropzone">
            {#if !items.length}
                <div class="dropzone-msg"><p>Select files</p></div>
            {/if}
            {#each items as item, idx}
                <div class="media-container">
                    <Media src={item.src} type={item.file.type} />
                    <button on:click={(e) => {
                        e.preventDefault()
                        items.splice(idx, 1)
                        items = items
                    }}>
                        <img class="x" src="x.svg" alt="x" />
                    </button>
                </div>
    
            {/each}
        </div>
        <input type="file" name="{dzid}" id="{dzid}" tabindex="0" on:input={addFiles} multiple />
    </label>
</div>



<style>

    .dropzone {
        background-color: var(--bg1);
        border: var(--bd1);
        min-height: 92px;
        padding: 16px;
        border-radius: 8px;
    }

    .dropzone-msg {
        width: 100%;
        color: var(--ftxt);
        height: 92px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input[type="file"] {
        position: absolute;
        opacity: 0;
    }

    .drop-media {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 8px;
        border-width: 8px;
        border: 4px var(--dec2) solid;
        margin: 8px 12px;
    }

    .media-container {
        display: inline-block;
        margin: 8px 12px;
    }

    button {
        overflow: hidden;
        padding: 0;
        border: 0;
        border-radius: 10px;
        background-color: var(--bg2);
        border: 2px solid var(--txt);
        position: absolute;
    }

    .x {
        width: 16px;
        display: block;
        color: var(--etxt);
    }

</style>
