import { z } from "zod";

export const InicioSesionEsquema = z.object({
	usuario: z
		.string()
		.min(4, { message: "El usuario debe tener al menos 4 caracteres" })
		.max(50),
	contraseña: z
		.string()
		.min(6, { message: "Contraseña debe tener mas de 6 caracteres" }),
});

export const RegistroUsuarioEsquema = z.object({
	usuario: z
		.string()
		.min(4, { message: "El usuario debe tener al menos 4 caracteres" })
		.max(50),
	email: z.string().email({ message: "Email invalido" }),
	contraseña: z
		.string()
		.min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
	confirmarContraseña: z
		.string()
		.min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type InicioSesionFormType = typeof InicioSesionEsquema;
export type RegistroUsuarioFormType = typeof RegistroUsuarioEsquema;
