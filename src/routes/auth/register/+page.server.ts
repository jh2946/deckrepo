import { auth } from "$lib/auth/lucia";
import { v_all } from "$lib/auth/validation/server";
import { fail, type Actions, redirect } from "@sveltejs/kit";

import { toHome } from "$lib/redirects/home";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = toHome

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { username, email, password } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
        if (!await v_all(username, email, password))
            return fail(400, {
                message: 'Invalid registration arguments.'
            })
        const user = await auth.createUser({
            primaryKey: {
                providerId: 'email',
                providerUserId: email,
                password
            },
            attributes: {
                username,
                email,
                email_verified: false
            }
        })
        const session = await auth.createSession(user.userId)
        locals.auth.setSession(session)
        throw redirect(302, '/auth/verify')
    }
}