import { removerAutorizacion } from "$lib/server/utils/util";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ locals, cookies }) => {
	removerAutorizacion(cookies, locals);
	redirect(302, "/iniciar-sesion");
}) satisfies RequestHandler;
