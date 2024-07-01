import { removerAutorizacion } from "$lib/server/utils/util";
import { error, redirect, type NumericRange } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { Usuario } from "$lib/modelos/usuarios/usuario";

export const load = (async ({ locals, cookies, fetch, url }) => {
	if (url.pathname === "/error") {
		return;
	}

	if (!locals.userId) return { user: null };

	try {
		const respuesta = await fetch("http://localhost:8000/api/usuarios/actual", {
			method: "GET",
			credentials: "include",
		});

		const resultado = await respuesta.json();

		if (!resultado.estado) {
			if (respuesta.status === 401) {
				removerAutorizacion(cookies, locals);
				redirect(302, "/");
			}
			error(respuesta.status as NumericRange<400, 599>, {
				message: resultado.mensaje,
			});
		}

		return { usuario: resultado.datos as Usuario };
	} catch (err) {
		console.error("Error loading data:", err);
		throw error(500, "Error en el servidor");
	}
}) satisfies LayoutServerLoad;
