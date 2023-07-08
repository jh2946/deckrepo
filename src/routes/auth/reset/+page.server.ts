import { prismaClient } from "$lib/db";
import { passwordReset, send_reset } from "$lib/auth/email";
import { auth } from "$lib/auth/lucia";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user)
        throw redirect(302, '/auth/reset/authenticated')
}

export const actions: Actions = {
    default: async ({ request }) => {
        const { email } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
        const user = await prismaClient.authUser.findFirst({
            where: {
                email: email
            }
        })
        send_reset(user)
    }
}