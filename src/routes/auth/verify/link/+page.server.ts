import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { emailVerification } from "$lib/auth/email";
import { auth } from "$lib/auth/lucia";

export const load: PageServerLoad = async ({ url, locals }) => {
    const tokenId = url.searchParams.get('token')
    if (!tokenId)
        return fail(400)
    try {
        const token = await emailVerification.validate(tokenId)
        await auth.updateUserAttributes(token.userId, {
            email_verified: true
        })
    }
    catch (e) {
        throw fail(400)
    }
    throw redirect(302, '/')
}
