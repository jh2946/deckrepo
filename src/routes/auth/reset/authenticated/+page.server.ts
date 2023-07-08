import { auth } from "$lib/auth/lucia"
import { v_password } from "$lib/auth/validation/client"
import { fail, type Actions, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../$types"
import { toRegister } from "$lib/redirects/register"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user)
        throw redirect(302, '/auth/reset')
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { password } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
        if (v_password(password).length)
            return fail(400)
        if (!locals.user.email_verified)
            await auth.updateUserAttributes(locals.user.userId, {
                email_verified: true
            })
        await auth.invalidateAllUserSessions(locals.user.userId)
        await auth.updateKeyPassword('email', locals.user.email, password)
        const session = await auth.createSession(locals.user.userId)
        locals.auth.setSession(session)
        throw redirect(302, '/')
    }
}
