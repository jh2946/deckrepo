import { prismaClient } from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ url }) => {
    const id = url.searchParams.get('deck')
    if (!id) throw redirect(302, '/')
    const deck = await prismaClient.deck.findUnique({
        where: {
            id
        }
    })
    if (!deck) return fail(404)
    
}
