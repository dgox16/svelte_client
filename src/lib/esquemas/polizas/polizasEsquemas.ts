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

	poliza_egreso: z.object({
		beneficiario: z.string().min(1).default("test"),
		banco: z.number().default(1),
		cheque: z.string().min(1).default("test"),
	}),
});

export type AgregarPolizaFormType = typeof AgregarPolizaEsquema;
