<div class="w-center h-center h-full">
    <form method="POST" class="form-outer">
        <h2>Login</h2>
        <div class="form-entry">
            <label for="username_email">Username/Email</label>
            <input name="username_email" type="text">
        </div>
        <div class="form-entry">
            <label for="password">Password</label>
            <input name="password" type="password">
        </div>
        <div class="submit-row">
            <input type="submit" value="Login">
            <a href="/auth/register"><input type="button" value="Register"></a>
        </div>
    </form>
</div>

<style>
    @import "$lib/style/form.css";
</style>
