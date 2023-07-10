import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { randomBytes } from "crypto";
import { prismaClient } from "$lib/db";

export const load: PageServerLoad = async () => {
    return { decks: await prismaClient.deck.findMany() }
}

export const actions: Actions = {
    default: async ({ request }) => {
        let { title, description } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>
        let id = ''
        while (!id || await prismaClient.deck.findUnique({
            where: {
                id
            }
        })) id = randomBytes(6).toString('base64url')
        await prismaClient.deck.create({
            data: {
                id,
                title,
                description
            }
        })
        throw redirect(302, `deck?deck=${id}`)
    }
}
