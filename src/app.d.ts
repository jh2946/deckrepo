// See https://kit.svelte.dev/docs/types#app

import type { User, AuthRequest } from "lucia-auth";

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: AuthRequest,
			user: User
		}
	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/lucia').Auth;
		type UserAttributes = {
			email: string,
			email_verified: boolean,
			username: string
		};
	}
}

export {};

