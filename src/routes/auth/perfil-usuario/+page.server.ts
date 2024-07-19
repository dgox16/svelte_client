import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../iniciar-sesion/$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.userId) redirect(302, "/auth/iniciar-sesion");

	return {};
};
