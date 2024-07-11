export interface JwtPayload {
	sub: string;
	iat: number;
	exp: number;
	purpose: JwtPurpose;
}

export enum JwtPurpose {
	ACCESS_TOKEN = "ACCESS_TOKEN",
	REFRESH_TOKEN = "REFRESH_TOKEN",
	VERIFY_EMAIL_TOKEN = "VERIFY_EMAIL_TOKEN",
	RESET_PASSWORD_TOKEN = "RESET_PASSWORD_TOKEN",
}
