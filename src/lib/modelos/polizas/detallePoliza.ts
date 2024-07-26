export const ivaDetallePoliza = {
	NoAplica: "No aplica",
	Iva0: "0",
	Iva8: "8",
	Iva11: "11",
	Iva16: "16",
} as const;
export type IvaDetallePoliza = keyof typeof ivaDetallePoliza;

export interface DetallePoliza {
	id_detalle_poliza: number;
	poliza: number;
	cuenta: number;
	sucursal: number;
	cargo: number;
	abono: number;
	proveedor: number;
	concepto: string;
	iva: IvaDetallePoliza;
}
