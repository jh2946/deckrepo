import { prismaClient } from "$lib/db"

export async function server_v_email(email: string) {
    return await prismaClient.authUser.findUnique({
        where: {
            email
        }
    })
}

export async function server_v_username(username: string) {
    return await prismaClient.authUser.findUnique({
        where: {
            username
        }
    })
}

export async function v_all(
    username: string,
    email: string,
    password: string
) {
    const p_username = prismaClient.authUser.findUnique({
        where: {
            username
        }
    })
    const p_email = prismaClient.authUser.findUnique({
        where: {
            email
        }
    })
    return email.length <= 320
    && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    && username.match(/^[a-zA-Z0-9\-_]{6,24}$/)
    && password.match(/^[ -~]{8,255}$/)
    && !await p_username
    && !await p_email
}