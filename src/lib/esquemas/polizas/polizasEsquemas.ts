import { z } from "zod";

export const tiposPoliza = {
	Diario: "Diario",
	Egreso: "Egreso",
	Ingreso: "Ingreso",
} as const;
type TipoPoliza = keyof typeof tiposPoliza;

export const aplicacionesPoliza = {
	Normal: "Normal",
	Condonacion: "Condonacion",
	ChequeOrden: "Cheque Orden",
	CierreDiario: "Cierre Diario",
	CierreMensual: "Cierre Mensual",
	CierreAnual: "Cierre Anual",
} as const;
type AplicacionPoliza = keyof typeof aplicacionesPoliza;

export const fuentesPoliza = {
	Operacion: "Operacion",
	Activos: "Activos",
	Nomina: "Nomina",
	Gastos: "Gastos",
	Pasiva: "Pasiva",
	Traslados: "Traslados",
	Traspasos: "Traspasos",
} as const;
type FuentePoliza = keyof typeof fuentesPoliza;

export const ivaDetallePoliza = {
	NoAplica: "No aplica",
	Iva0: "0",
	Iva8: "8",
	Iva11: "11",
	Iva16: "16",
} as const;
type IvaDetallePoliza = keyof typeof ivaDetallePoliza;

let poliza_egreso = z.object({
	beneficiario: z.string().min(1).default("test"),
	banco: z.number().default(1),
	cheque: z.string().min(1).default("test"),
});

export const detalle_poliza_defecto = {
	cuenta: 1,
	cargo: 1.0,
	abono: 1.0,
	proveedor: 1,
	concepto: "test",
};

let detalles_polizas = z
	.array(
		z.object({
			cuenta: z.number().int(),
			cargo: z.number().gte(0),
			abono: z.number().gte(0),
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
	detalles_polizas,
});

export type AgregarPolizaFormType = typeof AgregarPolizaEsquema;
