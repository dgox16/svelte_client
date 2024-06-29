import { InicioSesionEsquema } from "$lib/esquemas/inicioSesionEsquemas.js";
import type { AuthTokens } from "$lib/modelos/auth/auth-tokens.js";
import type { Actions, PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
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

		try {
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
			} else {
				const resultado = await response.json();
				const { access_token, refresh_token } = resultado.datos as AuthTokens;

				cookies.set("accessToken", access_token, {
					path: "/",
					sameSite: "strict",
					httpOnly: true,
				});

				cookies.set("refreshToken", refresh_token, {
					path: "/",
					sameSite: "strict",
					httpOnly: true,
				});

				return {
					form,
					resultado,
				};
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				return fail(500, { form, error: error.message });
			} else {
				return fail(500, { form, error: "Unknown error occurred" });
			}
		}
	},
};
