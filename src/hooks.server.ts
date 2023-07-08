import { auth } from "$lib/auth/lucia";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.auth = auth.handleRequest(event)
    event.locals.user = (await event.locals.auth.validateUser()).user
    
    return await resolve(event)

}
