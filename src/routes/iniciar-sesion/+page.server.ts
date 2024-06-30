import { InicioSesionEsquema } from "$lib/esquemas/inicioSesionEsquemas.js";
import type { AuthTokens } from "$lib/modelos/auth/auth-tokens.js";
import {
	colocarAccessTokenCookie,
	colocarRefreshTokenCookie,
} from "$lib/server/utils/util.js";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.userId) redirect(302, "/");
	return {
		form: await superValidate(zod(InicioSesionEsquema)),
	};
};

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const form = await superValidate(request, zod(InicioSesionEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const response = await fetch(
			"http://localhost:8000/api/auth/inicio_sesion",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form.data),
				credentials: "include",
			},
		);

		if (!response.ok) {
			const error = await response.json();
			setError(form, "general", error.mensaje);
			return message(form, error.mensaje);
		}

		const resultado = await response.json();
		const { access_token, refresh_token } = resultado.datos as AuthTokens;

		colocarAccessTokenCookie(cookies, access_token);
		colocarRefreshTokenCookie(cookies, refresh_token);

		return {
			form,
			resultado,
		};
	},
};
