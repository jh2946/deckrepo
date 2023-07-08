<script lang="ts">
    import { v_password } from "$lib/auth/validation/client";

    let password: string
    $: password_error = v_password(password)
</script>

<div class="w-center h-center h-full">
    <form method="POST" class="form-outer">
        <h2>Password reset</h2>
        <div class="form-entry">
            <label for="password">Password</label>
            <input type="password" name="password" bind:value={password} />
            <p class="input-error">
                {#each password_error as e}
                    {e}
                {/each}
            </p>
        </div>
        <div class="submit-row">
            <input type="submit" value="Reset password" disabled="{!!password_error.length}">
        </div>
    </form>
</div>

<style>
    @import "$lib/style/form.css";
</style>
