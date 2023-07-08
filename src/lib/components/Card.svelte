<script lang="ts">

    let flip = false
</script>

<button class="card" on:click={() => flip = !flip}>
    <div class="card-inner" class:flip={flip}>
        <div class="card-front">
            {#if $$slots.mediaFront}
                <div class="media-area"><slot name="mediaFront"></slot></div>
            {/if}
            {#if $$slots.textFront}
                <div class="text-area"><slot name="textFront"></slot></div>
            {/if}
        </div>
        <div class="card-back">
            {#if $$slots.mediaBack}
                <div class="media-area"><slot name="mediaBack"></slot></div>
            {/if}
            {#if $$slots.textBack}
                <div class="text-area"><slot name="textBack"></slot></div>
            {/if}
        </div>
    </div>
</button>

<style>

    .card {
        width: 300px;
        height: 400px;
        perspective: 1000px;
    }

    .card-inner {
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    .card-inner.flip {
        transform: rotateY(180deg);
    }

    .card-front, .card-back {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 32px;
        border: var(--bd1);
        border-radius: 16px;
        position: absolute;
        background-color: var(--bg2);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        overflow: hidden;
        box-sizing: border-box;
    }

    .card-back {
        transform: rotateY(180deg);
    }

    .media-area, .text-area {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg1);
        color: var(--txt);
        border: var(--bd1);
        border-radius: 12px;
    }

    .text-area {
        flex: 2;
        overflow-y: scroll;
    }

    .media-area {
        flex: 1;
        white-space: nowrap;
        text-align: center;
        overflow-x: scroll;
        line-height: 0;
    }

    .media-area :global(div) {
        width: 100%;
    }

    .media-area + .text-area {
        margin-top: 24px;
    }

</style>
