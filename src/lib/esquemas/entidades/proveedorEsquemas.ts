import {
	operacionProveedor,
	tipoProveedor,
	type OperacionProveedor,
	type TipoProveedor,
} from "$lib/modelos/entidades/proveedores";
import { z } from "zod";

export const AgregarProveedorEsquema = z.object({
	nombre: z.string().min(1, "Coloca un nombre"),
	domicilio: z.number().int().gt(0, "Selecciona una opcion"),
	rfc: z.string().min(1, "Coloca un RFC invalido").max(13, "Formato invalido"),
	curp: z
		.string()
		.min(1, "Coloca una CURP invalida")
		.max(18, "Formato invalido"),
	telefono: z
		.string()
		.min(1, "Coloca un numero invalido")
		.max(10, "Formato invalido"),
	tipo: z
		.enum(Object.keys(tipoProveedor) as [TipoProveedor, ...TipoProveedor[]])
		.default("Nacional"),
	operacion: z
		.enum(
			Object.keys(operacionProveedor) as [
				OperacionProveedor,
				...OperacionProveedor[],
			],
		)
		.default("Otros"),
	regimen: z.string().min(1, "Agregue una regimen"),
	pais_residencia: z.number().int(),
	pais_nacimiento: z.number().int(),
	banco: z.number().int(),
	cuenta_clabe: z.string().min(1),
});
export type AgregarProveedorFormType = typeof AgregarProveedorEsquema;
