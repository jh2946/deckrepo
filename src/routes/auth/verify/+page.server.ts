import { send_verification } from "$lib/auth/email";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { toHomeFunc } from "$lib/redirects/home";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user)
        throw redirect(302, '/auth/login')
    if (locals.user.email_verified)
        throw redirect(302, '/')
    send_verification(locals.user)
}

export const actions: Actions = {
    default: async ({ locals }) => {
        send_verification(locals.user)
    }
}
