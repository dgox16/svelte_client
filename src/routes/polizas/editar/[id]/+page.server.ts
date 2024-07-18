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

	const formLlenado = {
		tipo: poliza.tipo,
		numero: poliza.numero,
		sucursal: poliza.sucursal,
		concepto: poliza.concepto,
		aplicacion: poliza.aplicacion,
		fuente: poliza.fuente,
		poliza_egreso,
	};

	const respuestaSucursales = await fetch(
		"http://localhost:8000/api/sucursal/buscar",
	);
	const resultadoSucursales = await respuestaSucursales.json();
	let sucursales = resultadoSucursales.datos;

	const respuestaBancos = await fetch(
		"http://localhost:8000/api/banco/buscar",
		{
			method: "GET",
		},
	);
	const resultadoBancos = await respuestaBancos.json();
	let bancos = resultadoBancos.datos;

	return {
		form: await superValidate(formLlenado, zod(EditarPolizaEsquema)),
		esEgreso: poliza.tipo == "Egreso",
		sucursales,
		bancos,
	};
};

export const actions: Actions = {
	default: async ({ fetch, request, params }) => {
		const form = await superValidate(request, zod(EditarPolizaEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const formAuxiliar = JSON.parse(JSON.stringify(form.data));

		if (formAuxiliar.tipo !== "Egreso") {
			delete formAuxiliar.poliza_egreso;
		}

		const respuesta = await fetch(
			`http://localhost:8000/api/poliza/editar/${params.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formAuxiliar),
				credentials: "include",
			},
		);

		if (!respuesta.ok) {
			const error = await respuesta.json();
			setError(form, "general", error.mensaje);
			return message(form, error.mensaje);
		}

		redirect(302, "/polizas/ver-todas");
		// return { form };
	},
};
