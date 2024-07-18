import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import {
	AgregarDetallePolizaEsquema,
	EditarPolizaEsquema,
} from "$lib/esquemas/polizas/polizasEsquemas.js";
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

	const respuestaCuentas = await fetch(
		"http://localhost:8000/api/cuenta/buscar",
	);
	const resultadoCuentas = await respuestaCuentas.json();
	let cuentas = resultadoCuentas.datos;

	const respuestaProveedores = await fetch(
		"http://localhost:8000/api/proveedor/buscar",
	);
	const resultadoProveedores = await respuestaProveedores.json();
	let proveedores = resultadoProveedores.datos;

	return {
		form: await superValidate(zod(AgregarDetallePolizaEsquema)),
		poliza,
		poliza_egreso,
		detalles_poliza,
		cuentas,
		proveedores,
	};
};

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		console.info(request);
		const form = await superValidate(request, zod(AgregarDetallePolizaEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const formAuxiliar = JSON.parse(JSON.stringify(form));
		console.info(formAuxiliar);

		// if (formAuxiliar.tipo !== "Egreso") {
		// 	delete formAuxiliar.poliza_egreso;
		// }
		//
		// if (formAuxiliar.numeroDetalles === 0) {
		// 	delete formAuxiliar.detalles_poliza;
		// } else {
		// 	formAuxiliar.detalles_poliza = formAuxiliar.detalles_poliza.slice(
		// 		0,
		// 		formAuxiliar.numeroDetalles,
		// 	);
		// }
		//
		// delete formAuxiliar.numeroDetalles;
		// console.info(JSON.stringify(formAuxiliar));
		//
		// const respuesta = await fetch("http://localhost:8000/api/poliza/nueva", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(formAuxiliar),
		// 	credentials: "include",
		// });
		//
		// if (!respuesta.ok) {
		// 	const error = await respuesta.json();
		// 	setError(form, "general", error.mensaje);
		// 	return message(form, error.mensaje);
		// }

		// redirect(302, "/polizas/ver-todas");
		return { form };
	},
};
