import type { JwtPayload } from "$lib/modelos/auth/jwt-payload";
import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export function colocarAccessTokenCookie(
	cookies: Cookies,
	accessToken: string,
): void {
	const { exp } = jwt.decode(accessToken) as JwtPayload;
	cookies.set("accessToken", accessToken, {
		httpOnly: true,
		path: "/",
		secure: false,
		sameSite: "strict",
		expires: new Date(exp * 1000),
	});
}

export function colocarRefreshTokenCookie(
	cookies: Cookies,
	refreshToken: string,
): void {
	const { exp } = jwt.decode(refreshToken) as JwtPayload;
	cookies.set("refreshToken", refreshToken, {
		httpOnly: true,
		path: "/",
		secure: false,
		sameSite: "strict",
		expires: new Date(exp * 1000),
	});
}
