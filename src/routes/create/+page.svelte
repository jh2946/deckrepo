<script lang="ts">
    import Dropzone from "$lib/components/Dropzone.svelte"

    let view = 0
    let card_section = 0
    let deck_section = 0

    let itemsFront: {
        file: File,
        src: string
    }[] = []
    let itemsBack: {
        file: File,
        src: string
    }[] = []

</script>

<svelte:window on:keydown={e => {
    if (e.ctrlKey && !e.repeat) {
        if (e.key == '[')
            card_section--
        if (e.key == ']' || e.key == 'Enter')
            card_section++
    }
}} />

<div class="w-center h-center h-full">
    {#if view == 0}
        <form method="POST" class="form-outer">
            <h2>New card</h2>
            <div class={card_section != 0 ? "hide-input" : ""}>
                <label for="text-front">Text on front of card:</label>
                <textarea name="text-front" id="text-front"></textarea>
            </div>
            <div class={card_section != 1 ? "hide-input" : ""}>
                <Dropzone bind:items={itemsFront} dzid="file-front" label="Media on front of card"/>
            </div>
            <div class={card_section != 2 ? "hide-input" : ""}>
                <label for="text-back">Text on back of card:</label>
                <textarea name="text-back" id="text-back"></textarea>
            </div>
            <div class={card_section != 3 ? "hide-input" : ""}>
                <Dropzone bind:items={itemsBack} dzid="file-back" label="Media on back of card:"/>
            </div>
            <div class="submit-row form-steps">
                <input type="button" value="Back" on:click={() => card_section--}>
                <input type="button" class="right-sep" value="Next" on:click={() => card_section++}>
            </div>
            <input type="submit" value="Submit">
        </form>
    {:else}
        <form method="POST" class="form-outer">
            <h2>New deck</h2>
        </form>
    {/if}
</div>

<style>
    @import "$lib/style/form.css";

    .form-steps input[type="button"] {
        background-color: var(--none);
        color: var(--txt);
        padding: 0;
        border-radius: 0;
    }

    .right-sep {
        float: right;
    }

</style>

<!-- <div class="display-area">
    <div class="deck-display">
        <button>hi</button><button>hi</button>
    </div>
</div>

<style>
    @import "$lib/style/app.css";

    .deck-display {
        border-radius: 8px;
        background-color: var(--bg3);
        width: 100%;
    }
</style> -->
