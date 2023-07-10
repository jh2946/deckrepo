<script lang="ts">
    import type { PageData } from "./$types";

    let show = false
    let title: string

    export let data: PageData
</script>

<div class="view-column">
    <button class="deck-create" on:click={() => show = !show}>
        <img src="/plus.svg" class="plus" alt="Create">
    </button>
    {#each data.decks as deck}
        <a href="/deck?deck={deck.id}">
            <div class="deck-link">
                <h2>{deck.title}</h2>
                <hr>
                <p>{deck.description}</p>
            </div>
        </a>
    {/each}
</div>

<div class="fullscreen-container" class:hidden={!show} on:click|stopPropagation={() => show = false}>
    <form method="POST" class="form-outer" on:click|stopPropagation={() => {}}>
        <div class="form-entry">
            <label for="title">Deck title</label>
            <input type="text" name="title" bind:value={title}>
        </div>
        <div class="form-entry">
            <label for="description">Description</label>
            <textarea name="description"></textarea>
        </div>
        <div class="submit-row">
            <input type="submit" disabled={!title} value="Create">
        </div>
    </form>
</div>

<style>

    @import "$lib/style/form.css";

    .deck-link {
        background-color: var(--bg2);
        border: var(--bd1);
        margin: 32px 0;
        border-radius: 32px;
        padding: 32px;
    }

    .deck-create {
        border: var(--bd2);
        display: flex;
        margin: 32px 0;
        width: 100%;
        justify-content: center;
        align-items: center;
        border-radius: 32px;
        height: 96px;
    }

    .deck-link h2, .deck-link p {
        margin: 0;
    }

    .plus {
        color: #808080;
        width: 100px;
    }

</style>
