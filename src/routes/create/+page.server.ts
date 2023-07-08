import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request }) => [
        console.log(Object.fromEntries(
            await request.formData()
        ))
    ]
}