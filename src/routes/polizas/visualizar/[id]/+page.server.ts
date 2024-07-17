import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { EditarPolizaEsquema } from "$lib/esquemas/polizas/polizasEsquemas.js";
import { zod } from "sveltekit-superforms/adapters";
import type { Poliza } from "$lib/modelos/polizas/polizaBasica.js";

export const load: PageServerLoad = async ({ locals, fetch, params }) => {
	if (!locals.userId) redirect(302, "/auth/iniciar-sesion");

	const respuestaPoliza = await fetch(
		`http://localhost:8000/api/poliza/obtener/${params.id}`,
	);
	const resultadoPoliza = await respuestaPoliza.json();
	const poliza: Poliza = resultadoPoliza.datos.poliza;
	const poliza_egreso = resultadoPoliza.datos.poliza_egreso;
	const detalles_poliza = resultadoPoliza.datos.detalles_poliza;

	return {
		poliza,
		poliza_egreso,
		detalles_poliza,
	};
};
