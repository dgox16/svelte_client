import { removerAutorizacion } from "$lib/funciones/auth/cookies";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ locals, cookies }) => {
	removerAutorizacion(cookies, locals);
	redirect(302, "/auth/iniciar-sesion");
}) satisfies RequestHandler;
