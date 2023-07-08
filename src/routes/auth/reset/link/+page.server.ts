import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { emailVerification, passwordReset } from "$lib/auth/email";
import { auth } from "$lib/auth/lucia";

export const load: PageServerLoad = async ({ url, locals }) => {
    const tokenId = url.searchParams.get('token')
    if (!tokenId)
        return fail(400)
    try {
        const token = await passwordReset.validate(tokenId)
        const session = await auth.createSession(token.userId)
        locals.auth.setSession(session)
    }
    catch (e) {
        return fail(400)
    }
    throw redirect(302, '/auth/reset/authorised')
}
