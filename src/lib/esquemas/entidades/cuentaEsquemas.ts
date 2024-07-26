import {
	clasificacionCuenta,
	finalidadCuenta,
	grupoCuenta,
	naturalezaCuenta,
	type ClasificacionCuenta,
	type FinalidadCuenta,
	type GrupoCuenta,
	type NaturalezaCuenta,
} from "$lib/modelos/entidades/cuentas";
import { z } from "zod";

export const AgregarCuentaEsquema = z.object({
	cuenta: z.string().min(1, "Coloca una cuenta"),
	cuenta_siti: z.string().min(1, "Coloca una cuenta"),
	nombre: z.string().min(1, "Coloca un nombre"),
	clasificacion: z
		.enum(
			Object.keys(clasificacionCuenta) as [
				ClasificacionCuenta,
				...ClasificacionCuenta[],
			],
		)
		.default("Capitulo"),
	grupo: z
		.enum(Object.keys(grupoCuenta) as [GrupoCuenta, ...GrupoCuenta[]])
		.default("Activo"),
	finalidad: z
		.enum(
			Object.keys(finalidadCuenta) as [FinalidadCuenta, ...FinalidadCuenta[]],
		)
		.default("Otros"),
	naturaleza: z
		.enum(
			Object.keys(naturalezaCuenta) as [
				NaturalezaCuenta,
				...NaturalezaCuenta[],
			],
		)
		.default("Deudora"),
	padre: z.string().min(1, "Coloca un padre"),
	nivel: z.coerce
		.number()
		.int("El numero debe ser entero")
		.min(1, "El numero debe ser mayor a 1"),
	en_catalogo_minimo: z.boolean(),
	nombre_balance: z.string().min(1, "Coloca el nombre del balance"),
	nombre_siti: z.string().min(1, "Coloca el nombre SITI"),
	cuenta_padre_siti: z.string().min(1, "Coloca la cuenta padre SITI"),
	cuenta_agrupar: z.string().min(1, "Coloca la cuenta a agrupar"),
	orden_siti: z.coerce
		.number()
		.int("El numero debe ser entero")
		.min(1, "El numero debe ser mayor a 1"),
	prorrateo: z.boolean(),
});
export type AgregarCuentaFormType = typeof AgregarCuentaEsquema;
