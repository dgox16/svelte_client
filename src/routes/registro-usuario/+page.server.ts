import { RegistroUsuarioEsquema } from "$lib/esquemas/registroEsquemas.js";
import type { Actions, PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(RegistroUsuarioEsquema)),
	};
};

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		const form = await superValidate(request, zod(RegistroUsuarioEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		if (form.data.contraseña !== form.data.confirmarContraseña) {
			return setError(
				form,
				"confirmarContraseña",
				"Las contraseñas no coinciden",
			);
		}

		try {
			const response = await fetch("http://localhost:8000/api/auth/registro", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form.data),
			});

			if (!response.ok) {
				const error = await response.json();
				return message(form, error.mensaje);
			} else {
				const result = await response.json();
				console.log("Success:", result);
				return { form, result };
			}
		} catch (error: unknown) {
			console.error("Fetch error:", error);
			if (error instanceof Error) {
				return fail(500, { form, error: error.message });
			} else {
				return fail(500, { form, error: "Unknown error occurred" });
			}
		}
	},
};
