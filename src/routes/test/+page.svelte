<script>
    let x = true
</script>
<button on:click={() => {x = !x}}>Hi</button>
<form method="POST">
    <input type="text" name="a" class:hidden={x}>
    <input type="text" name="b" class:hidden={!x}>
    <input type="submit" value="submit">
</form>
<style>
    @import "$lib/style/app.css";
</style>
