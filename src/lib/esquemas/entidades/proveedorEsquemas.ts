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
	curp: z.string().length(18, "Formato invalido"),
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
	regimen: z.string().min(1, "Agregue un regimen"),
	pais_residencia: z.number().int().gt(0, "Seleccione un pais"),
	pais_nacimiento: z.number().int().gt(0, "Seleccione un pais"),
	banco: z.number().int().gt(0, "Seleccione un banco"),
	cuenta_clabe: z.string().min(1),
});
export type AgregarProveedorFormType = typeof AgregarProveedorEsquema;
