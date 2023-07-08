import { prismaClient } from "$lib/db";
import { toHome } from "$lib/redirects/home";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth, authenticate } from "$lib/auth/lucia";
import { LuciaError } from "lucia-auth";

export const load: PageServerLoad = toHome

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { username_email, password } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
        let key = await authenticate(username_email, password)
        if (!key) {
            const user = await prismaClient.authUser.findUnique({
                where: {
                    username: username_email
                }
            })
            if (!user)
                return fail(400, {
                    message: 'Incorrect login attempt.'
                })
            key = await authenticate(user.email, password)
            if (!key)
                return fail(400, {
                    message: 'Incorrect login attempt.'
                })
        }
        const session = await auth.createSession(key.userId)
        locals.auth.setSession(session)
        throw redirect(303, '/')
    }
}
