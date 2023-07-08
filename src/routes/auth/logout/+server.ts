import { auth } from "$lib/auth/lucia";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (!session) return
    await auth.invalidateSession(session.sessionId)
    locals.auth.setSession(null)
    throw redirect(302, '/')
}
