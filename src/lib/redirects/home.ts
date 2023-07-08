import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../routes/auth/login/$types";

export function toHomeFunc(locals: App.Locals) {
    if (locals.user) {
        if (locals.user.email_verified)
            throw redirect(302, '/')
        throw redirect(302, '/auth/verify')
    }
}

export const toHome: PageServerLoad = async ({ locals }) => {
    toHomeFunc(locals)
}
