import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { AgregarPolizaEsquema } from "$lib/esquemas/polizas/polizasEsquemas.js";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.userId) redirect(302, "/auth/iniciar-sesion");

	const respuestaSucursales = await fetch(
		"http://localhost:8000/api/sucursal/buscar",
		{
			method: "GET",
		},
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
		form: await superValidate(zod(AgregarPolizaEsquema)),
		sucursales,
		bancos,
		cuentas,
		proveedores,
	};
};

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		const form = await superValidate(request, zod(AgregarPolizaEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const formAuxiliar = JSON.parse(JSON.stringify(form.data));

		if (formAuxiliar.tipo !== "Egreso") {
			delete formAuxiliar.poliza_egreso;
		}

		if (formAuxiliar.numeroDetalles === 0) {
			delete formAuxiliar.detalles_poliza;
		} else {
			formAuxiliar.detalles_poliza = formAuxiliar.detalles_poliza.slice(
				0,
				formAuxiliar.numeroDetalles,
			);
		}

		delete formAuxiliar.numeroDetalles;
		console.info(JSON.stringify(formAuxiliar));

		const respuesta = await fetch("http://localhost:8000/api/poliza/nueva", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formAuxiliar),
			credentials: "include",
		});

		if (!respuesta.ok) {
			const error = await respuesta.json();
			setError(form, "general", error.mensaje);
			return message(form, error.mensaje);
		}

		redirect(302, "/polizas/ver-todas");
	},
};
