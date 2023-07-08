import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma"
import { prismaClient } from "../db";
import { sveltekit } from "lucia-auth/middleware";
import { LuciaError } from "lucia-auth";

export const auth = lucia({
    env: 'PROD',
    adapter: prisma(prismaClient),
    middleware: sveltekit(),
    transformDatabaseUser: (user) => {
        return {
            userId: user.id,
            username: user.username,
            email: user.email,
            email_verified: user.email_verified
        }
    }
})

export async function authenticate(identifier: string, password: string) {
    try {
        const key = await auth.useKey('email', identifier, password)
        return key
    }
    catch (e) {
        if (e instanceof LuciaError && (
            e.message == 'AUTH_INVALID_KEY_ID' ||
            e.message == 'AUTH_INVALID_PASSWORD'
        )) return
        throw e
    }
}
