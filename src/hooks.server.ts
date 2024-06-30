import { JWT_SECRETO } from "$env/static/private";
import type { AuthTokens } from "$lib/modelos/auth/auth-tokens";
import type { JwtPayload } from "$lib/modelos/auth/jwt-payload";
import {
	colocarAccessTokenCookie,
	colocarRefreshTokenCookie,
	removerAutorizacion,
} from "$lib/server/utils/util";
import {
	redirect,
	type Cookies,
	type Handle,
	type RequestEvent,
} from "@sveltejs/kit";
import jwt from "jsonwebtoken";

const rutasProtegidas = ["/perfil-usuario"];

export const handle = (async ({ event, resolve }) => {
	await obtenerAutorizacion(event);
	revisarRutasProtegidas(event.url, event.cookies);
	return await resolve(event);
}) satisfies Handle;

async function obtenerAutorizacion(event: RequestEvent): Promise<void> {
	try {
		const accessToken = event.cookies.get("accessToken") ?? "";
		const { sub } = jwt.verify(accessToken, JWT_SECRETO) as JwtPayload;
		event.locals.userId = sub;
	} catch (error) {
		await refrescar_token(event);
	}
}

async function refrescar_token(event: RequestEvent): Promise<void> {
	const refreshToken = event.cookies.get("refreshToken");
	if (refreshToken) {
		const response = await event.fetch(
			"http://localhost:8000/api/auth/refrescar_token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refresh_token: refreshToken }),
			},
		);

		const resultado = await response.json();

		if (!resultado.estado) {
			removerAutorizacion(event.cookies, event.locals);
		} else {
			const { access_token, refresh_token } = resultado.datos as AuthTokens;
			colocarAccessTokenCookie(event.cookies, access_token);
			colocarRefreshTokenCookie(event.cookies, refresh_token);
			const { sub } = jwt.decode(access_token) as JwtPayload;
			event.locals.userId = sub;
		}
	}
}

function revisarRutasProtegidas(url: URL, cookies: Cookies): void {
	if (rutasProtegidas.some((route) => url.pathname.startsWith(route))) {
		const accessToken = cookies.get("accessToken");
		if (!accessToken) redirect(302, "/iniciar-sesion");
	}
}
