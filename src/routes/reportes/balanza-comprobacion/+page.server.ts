import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const hoy = new Date();
	const fechaFormateada = hoy.toISOString().split("T")[0];

	const respuesta = await fetch(
		`http://localhost:8000/api/poliza/balanza_comprobacion?fecha=${fechaFormateada}`,
	);

	const resultado = await respuesta.json();

	let cuentas = resultado.datos.balanza;
	let total = resultado.datos.total;

	return {
		fechaActual: fechaFormateada,
		cuentas,
		total,
	};
};
