<script lang="ts">
    import { fsrc, fshow, ftype } from "$lib/stores/fullscreen";
    import { onMount } from "svelte";
    export let src: string
    export let type: string
    export let width: number = 64
    export let height: number = 64

    let fullscr_src: string
    fsrc.subscribe(val => fullscr_src = val)
    let fullscr_show: boolean
    fshow.subscribe(val => fullscr_show = val)

    const setthis = () => {
        fshow.set(src != fullscr_src || !fullscr_show)
        fsrc.set(src)
        ftype.set(type)
    }

    let vid: HTMLVideoElement

    const resizeVideo = () => {
        const hratio = height / vid.clientHeight
        const wratio = width / vid.clientWidth
        if (hratio > wratio)
            vid.style.height = `${height}px`
        else
            vid.style.width = `${width}px`
    }

    if (type.match(/^video/))
        onMount(resizeVideo)
</script>

<div class="thumbnail" on:click|stopPropagation={setthis}>
    {#if type.match(/^image/)}
        <img src={src} alt="" width={width} height={height}>
    {:else if type.match(/^audio/)}
        <img src="audio.svg" alt="" width={width} height={height}>
    {:else if type.match(/^video/)}
        <div style="overflow: hidden; width: {width}px; height: {height}px;">
            <video bind:this={vid}>
                <source src={src}>
            </video>
        </div>
    {/if}
</div>

<style>
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }

    .thumbnail {
        display: inline-block;
        width: 50%;
        border: none;
        background-color: var(--none);
    }

    .thumbnail > * {
        margin: auto;
        display: block;
        object-fit: cover;
        border-radius: 8px;
        border-width: 8px;
        border: 4px var(--dec2) solid;
    }

</style>
