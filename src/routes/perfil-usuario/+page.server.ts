import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch("http://localhost:8000/api/usuarios/actual", {
		method: "GET",
		credentials: "include",
	});

	const result = await response.json();
	return result;
};
