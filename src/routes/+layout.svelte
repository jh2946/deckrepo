<script lang="ts">
    import { fshow, fsrc, ftype } from '$lib/stores/fullscreen';
    import type { PageData } from './$types'

    let src: string
    let show: boolean
    let type: string

    fsrc.subscribe(val => src = val)
    fshow.subscribe(val => show = val)
    ftype.subscribe(val => type = val)

    export let data: PageData
    let visible = false
</script>

<div class="master">
    <div class="header-outline">
        <header>
            <a href="/"><h2>DeckRepo</h2></a>
            <a href="/about"><p>About</p></a>
            <a href="/create">Create</a>
            {#if data.user}
                <div class="dropdown right-sep">
                    <button class="dropbtn"
                    on:click|capture|stopPropagation={() => visible = !visible}>
                    {data.user.username}
                    &nbsp;&nbsp;
                    <img src="down-arrow.svg" width="12" alt="">
                    <div class="dropdown-content" class:visible={visible} id="dropdown-content">
                        {#if !data.user.email_verified}
                            <a href="/auth/verify">Verify email</a>
                        {/if}
                        <a href="/auth/logout">Logout</a>
                    </div>
                </div>
            {:else}
            <a href="/auth/register" class="right-sep">Register</a>
            <a href="/auth/login">Login</a>
            {/if}

        </header>
    </div>

    <slot></slot>
</div>

<div class="fullscreen-container" class:hidden={!show} on:click|stopPropagation={() => fshow.set(false)}>
    {#if type.match(/^image/)}
        <img src={src} alt="" class="fullscreen-media">
    {:else if type.match(/^audio/)}
        <audio controls={true}>
            <source src={src}>
        </audio>
    {:else if type.match(/^video/)}
        <video class="fullscreen-media" controls>
            <source src={src}>
        </video>
    {/if}
</div>

<svelte:window on:click={() => visible = false} />

<style>

    @import "$lib/style/colors.css";
    @import "$lib/style/app.css";

    div.master {
        min-height: 100vh;
    }

    header {
        display: flex;
        height: 50px;
        background-color: var(--bg2);
        padding: 0 16px;
    }

    header button.dropbtn {
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: var(--txt);
        padding: 0 16px;
    }

    header button.dropbtn:hover {
        background-color: var(--hlg);
    }

    header div.dropdown-content {
        display: none;
        position: absolute;
        width: 200px;
        right: 0;
        top: 54px;
        border-left: var(--bd1);
        border-bottom: var(--bd1);
    }

    header div.dropdown-content.visible {
        display: flex;
    }

    header div.dropdown-content a {
        margin: 0;
        padding: 12px 16px;
        width: 100%;
        box-sizing: border-box;
    }

    header div.dropdown-content a + a {
        border-top: var(--bd1);
    }

    header button {
        background-color: #00000000;
        font: inherit;
        border: none;
    }

    div.header-outline {
        width: 100%;
        background: var(--dec1);
        padding-bottom: 4px;
    }

    header a {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 12px;
        margin: 0 4px;
        color: var(--txt);
        text-decoration: none;
    }

    header a:hover {
        background-color: var(--hlg);
    }

    .fullscreen-container {
        background-color: #00000080;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
    }

    .fullscreen-media {
        object-fit: contain;
        max-width: 100%;
        max-height: 100%;
        z-index: 2;
    }

</style>
