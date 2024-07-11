import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { toast } from "svelte-sonner";

export const GET = (async ({ fetch, params }) => {
	const respuesta = await fetch(
		`http://localhost:8000/api/poliza/eliminar/${params.id}`,
		{
			method: "DELETE",
		},
	);
	const resultado = await respuesta.json();
	if (resultado.estado) {
		redirect(302, "/polizas/ver-todas");
	}

	return new Response(
		JSON.stringify({
			estado: false,
			mensaje: "Fallo",
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
}) satisfies RequestHandler;
