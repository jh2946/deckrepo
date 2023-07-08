import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../routes/auth/login/$types";

export function toRegisterFunc(locals: App.Locals) {
    if (!locals.user)
        throw redirect(302, '/auth/register')
    if (!locals.user.email_verified)
        throw redirect(302, '/auth/verify')
}

export const toRegister: PageServerLoad = async ({ locals }) => {
    toRegisterFunc(locals)
}
