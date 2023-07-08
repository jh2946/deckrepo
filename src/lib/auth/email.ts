import { auth } from "./lucia";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import type { User } from "lucia-auth";
import { idToken } from "@lucia-auth/tokens";

config()

export const emailVerification = idToken(auth, 'email_verification', {
    expiresIn: 3600
})

export const passwordReset = idToken(auth, 'password_reset', {
    expiresIn: 3600
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACC,
        pass: process.env.EMAIL_KEY
    }
})

export function send_email(to: string, subject: string, text: string) {
    transporter.sendMail({
        from: process.env.EMAIL_ACC,
        to, subject, text
    })
}

export async function send_verification(user: User) {
    const token = await emailVerification.issue(user.userId)
    send_email(
        user.email,
        'DeckRepo - Email verification',
        `Your email has been used to sign up for an account on DeckRepo. Click on this link to verify the account: ${process.env.URL}/auth/verify/link?token=${token}\nIf this wasn't you, please ignore this message.`
    )
}

export async function send_reset(user: User) {
    const token = await passwordReset.issue(user.userId)
    send_email(
        user.email,
        'DeckRepo - Password reset',
        `A password reset request for your account was made on DeckRepo. Click on this link to reset your password: ${process.env.URL}/auth/reset/link?token=${token}\nIf this wasn't you, please ignore this message.`
    )
}
