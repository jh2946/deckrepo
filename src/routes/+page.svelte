<script lang="ts">
    import Media from "$lib/components/Media.svelte";
    import Card from "$lib/components/Card.svelte";
</script>

<Card>
    <div slot="mediaFront">
        <Media src="sample.mp4" type="video" />
        <Media src="audio.svg" type="image" />
        <Media src="audio.svg" type="image" />
        <Media src="audio.svg" type="image" />
    </div>
    <div slot="textFront">
        Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>Text front<br>
    </div>
    <div slot="mediaBack">
        <Media src="audio.svg" type="image" />
    </div>
    <div slot="textBack">Text back</div>
</Card>
