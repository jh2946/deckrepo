<script lang="ts">
    import { v_email, v_password, v_username } from '$lib/auth/validation/client';
    let u_cid = 0
    let username: string
    let username_error: string[] = []
    $: (async () => {
        username_error = ['']
        const anticlash = ++u_cid
        const client_error = v_username(username)
        if (client_error.length) {
            username_error = client_error
            return
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (anticlash != u_cid)
            return
        const data = await (await fetch(`/auth/register/endpoint/?id=${u_cid}&username=${username}`)).json()
        if (anticlash != data.id)
            return
        username_error = data.username
        ? [] : ['Username already exists.']
        return
    })()
    let e_cid = 0
    let email: string
    let email_error: string[] = []
    $: (async () => {
        email_error = ['']
        const anticlash = ++e_cid
        const client_error = v_email(email)
        if (client_error.length) {
            email_error = client_error
            return
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (anticlash != e_cid)
            return
        const data = await (await fetch(`/auth/register/endpoint/?id=${e_cid}&email=${email}`)).json()
        if (anticlash != data.id)
            return
        email_error = data.email
        ? [] : ['Email already exists.']
        return
    })()
    let password: string
    $: password_error = v_password(password)
    $: has_error = Boolean(username_error.length
    + email_error.length
    + password_error.length)
</script>

<div class="w-center h-center h-full">
    <form method="POST" class="form-outer">
        <h2>Register</h2>
        <div class="form-entry">
            <label for="username">Username</label>
            <input name="username" id="username" bind:value={username} type="text">
            <p class="input-error">
                {#each username_error as e}
                    {e}
                {/each}
            </p>
        </div>
        <div class="form-entry">
            <label for="email">Email</label>
            <input name="email" id="email" bind:value={email} type="text">
            <p class="input-error">
                {#each email_error as e}
                    {e}
                {/each}
            </p>
        </div>
        <div class="form-entry">
            <label for="password">Password</label>
            <input name="password" id="password" bind:value={password} type="password">
            <p class="input-error">
                {#each password_error as e}
                    {e}
                {/each}
            </p>
        </div>
        <div class="submit-row">
            <input type="submit" value="Register" disabled="{has_error}">
            <a href="/auth/login"><input type="button" value="Login"></a>
        </div>
    </form>
</div>

<style>
    @import "$lib/style/form.css";
</style>
