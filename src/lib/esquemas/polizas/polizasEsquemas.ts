import {
	aplicacionesPoliza,
	fuentesPoliza,
	ivaDetallePoliza,
	tiposPoliza,
	type AplicacionPoliza,
	type FuentePoliza,
	type IvaDetallePoliza,
	type TipoPoliza,
} from "$lib/modelos/polizas/polizaBasica";
import { z } from "zod";

let poliza_egreso = z.object({
	beneficiario: z.string().min(1).default("test"),
	banco: z.number().default(1),
	cheque: z.string().min(1).default("test"),
});

export const detalle_poliza_defecto = {
	cuenta: 1,
	cargo: 0,
	abono: 0,
	proveedor: 1,
	concepto: "test",
};

export let detalles_poliza = z
	.array(
		z.object({
			cuenta: z.number().int(),
			cargo: z.coerce.number().gte(0, "No puedes colocar un numero negativo"),
			abono: z.coerce.number().gte(0, "No puedes colocar un numero negativo"),
			proveedor: z.number().int(),
			concepto: z.string().min(1),
			iva: z
				.enum(
					Object.keys(ivaDetallePoliza) as [
						IvaDetallePoliza,
						...IvaDetallePoliza[],
					],
				)
				.default("NoAplica"),
		}),
	)
	.default(Array(5).fill(detalle_poliza_defecto));

export const AgregarPolizaEsquema = z.object({
	tipo: z
		.enum(Object.keys(tiposPoliza) as [TipoPoliza, ...TipoPoliza[]])
		.default("Diario"),
	numero: z.coerce
		.number()
		.int("El numero debe ser entero")
		.min(1, "El numero debe ser mayor a 1")
		.default(1),
	sucursal: z.number().int().default(2),
	concepto: z.string().min(1, "Debe agregar un concepto"),
	numeroDetalles: z.number().default(0),
	aplicacion: z
		.enum(
			Object.keys(aplicacionesPoliza) as [
				AplicacionPoliza,
				...AplicacionPoliza[],
			],
		)
		.default("Normal"),
	fuente: z
		.enum(Object.keys(fuentesPoliza) as [FuentePoliza, ...FuentePoliza[]])
		.default("Operacion"),

	poliza_egreso,
	detalles_poliza,
});

export type AgregarPolizaFormType = typeof AgregarPolizaEsquema;
