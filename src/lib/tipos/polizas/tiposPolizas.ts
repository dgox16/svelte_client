export const tiposPoliza = {
	Diario: "Diario",
	Egreso: "Egreso",
	Ingreso: "Ingreso",
} as const;
export type TipoPoliza = keyof typeof tiposPoliza;

export const aplicacionesPoliza = {
	Normal: "Normal",
	Condonacion: "Condonacion",
	ChequeOrden: "Cheque Orden",
	CierreDiario: "Cierre Diario",
	CierreMensual: "Cierre Mensual",
	CierreAnual: "Cierre Anual",
} as const;
export type AplicacionPoliza = keyof typeof aplicacionesPoliza;

export const fuentesPoliza = {
	Operacion: "Operacion",
	Activos: "Activos",
	Nomina: "Nomina",
	Gastos: "Gastos",
	Pasiva: "Pasiva",
	Traslados: "Traslados",
	Traspasos: "Traspasos",
} as const;
export type FuentePoliza = keyof typeof fuentesPoliza;

export const ivaDetallePoliza = {
	NoAplica: "No aplica",
	Iva0: "0",
	Iva8: "8",
	Iva11: "11",
	Iva16: "16",
} as const;
export type IvaDetallePoliza = keyof typeof ivaDetallePoliza;

export interface PolizaTipo {
	id_poliza: number;
	tipo: TipoPoliza;
	numero: number;
	sucursal: number;
	fecha_poliza: Date;
	fecha_registro_poliza: Date;
	concepto: string;
	usuario_autoriza: number;
	usuario_elabora: number;
	aplicacion: AplicacionPoliza;
	fuente: FuentePoliza;
	automatico?: boolean;
}
