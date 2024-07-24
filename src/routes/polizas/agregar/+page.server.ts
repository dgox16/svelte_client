import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { AgregarPolizaEsquema } from "$lib/esquemas/polizas/polizasEsquemas.js";
import { zod } from "sveltekit-superforms/adapters";
import { AgregarSucursalEsquema } from "$lib/esquemas/entidades/sucursalEsquemas.js";
import { AgregarBancoEsquema } from "$lib/esquemas/entidades/bancoEsquemas.js";

export const load: PageServerLoad = async ({ locals, fetch }) => {
	if (!locals.userId) redirect(302, "/auth/iniciar-sesion");

	const respuestaSucursales = await fetch(
		"http://localhost:8000/api/sucursal/buscar",
	);
	const resultadoSucursales = await respuestaSucursales.json();
	let sucursales = resultadoSucursales.datos;

	const respuestaBancos = await fetch("http://localhost:8000/api/banco/buscar");
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

	const respuestaUsuarios = await fetch(
		"http://localhost:8000/api/usuarios/buscar",
	);
	const resultadoUsuarios = await respuestaUsuarios.json();
	let usuarios = resultadoUsuarios.datos;

	const respuestaDomicilios = await fetch(
		"http://localhost:8000/api/domicilio/buscar",
	);
	const resultadoDomicilios = await respuestaDomicilios.json();
	let domicilios = resultadoDomicilios.datos;

	return {
		form: await superValidate(zod(AgregarPolizaEsquema)),
		formSucursal: await superValidate(zod(AgregarSucursalEsquema)),
		formBanco: await superValidate(zod(AgregarBancoEsquema)),
		sucursales,
		bancos,
		cuentas,
		proveedores,
		usuarios,
		domicilios,
	};
};

export const actions: Actions = {
	agregarPoliza: async ({ fetch, request }) => {
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
	agregarSucursal: async ({ fetch, request }) => {
		const form = await superValidate(request, zod(AgregarSucursalEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const respuesta = await fetch("http://localhost:8000/api/sucursal/nueva", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form.data),
			credentials: "include",
		});
		const resultado = await respuesta.json();

		if (!respuesta.ok) {
			const error = await respuesta.json();
			setError(form, "general", error.mensaje);
			return message(form, error.mensaje);
		}

		return { form, nuevaSucursal: resultado.datos };
	},
	agregarBanco: async ({ fetch, request }) => {
		const form = await superValidate(request, zod(AgregarBancoEsquema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}
		const respuesta = await fetch("http://localhost:8000/api/banco/nuevo", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form.data),
			credentials: "include",
		});
		const resultado = await respuesta.json();

		if (!respuesta.ok) {
			const error = await respuesta.json();
			setError(form, "general", error.mensaje);
			return message(form, error.mensaje);
		}

		return { form, nuevoBanco: resultado.datos };
	},
};
