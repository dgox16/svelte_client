import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { AgregarPolizaEsquema } from "$lib/esquemas/polizas/polizasEsquemas.js";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.userId) redirect(302, "/iniciar-sesion");

	const respuesta = await fetch("http://localhost:8000/api/sucursal/buscar/", {
		method: "GET",
	});

	const resultado = await respuesta.json();

	let sucursales: Array<{
		id_sucursal: number;
		nombre: string;
		domicilio: number;
		encargado: 1;
	}> = resultado.datos;

	return {
		form: await superValidate(zod(AgregarPolizaEsquema)),
		sucursales,
	};
};

export const actions: Actions = {
	default: async ({ fetch, request, cookies }) => {
		const form = await superValidate(request, zod(AgregarPolizaEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const respuesta = await fetch("http://localhost:8000/api/poliza/nueva", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form.data),
			credentials: "include",
		});

		if (!respuesta.ok) {
			const error = await respuesta.json();
			setError(form, "general", error.mensaje);
			return message(form, error.mensaje);
		}

		//const resultado = await response.json();
		// redirect(302, "/auth/perfil-usuario");
		return { form };
	},
};
