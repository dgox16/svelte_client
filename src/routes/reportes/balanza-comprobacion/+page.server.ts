import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const hoy = new Date();
	const unaSemanaAtras = new Date(hoy);
	unaSemanaAtras.setDate(hoy.getDate() - 15);
	const fechaFormateadaAntes = unaSemanaAtras.toISOString().split("T")[0];
	const fechaFormateadaHoy = hoy.toISOString().split("T")[0];

	const respuesta = await fetch(
		`http://localhost:8000/api/balanza_comprobacion?fecha_inicial=${fechaFormateadaAntes}&fecha_final=${fechaFormateadaHoy}`,
	);
	const resultado = await respuesta.json();

	let cuentas = resultado.datos.balanza;
	let total = resultado.datos.total;

	return {
		fechaInicial: fechaFormateadaAntes,
		fechaFinal: fechaFormateadaHoy,
		cuentas,
		total,
	};
};
