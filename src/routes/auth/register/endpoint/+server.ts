import { server_v_email, server_v_username } from "$lib/auth/validation/server";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const username = url.searchParams.get('username')
    const email = url.searchParams.get('email')
    const id = url.searchParams.get('id')
    let ans = {
        id: Number(id),
        username: !!username && !await server_v_username(username),
        email: !!email && !await server_v_email(email)
    }
    return new Response(JSON.stringify(ans))
}
