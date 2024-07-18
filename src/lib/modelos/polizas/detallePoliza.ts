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

export const tipoProveedor = {
	Nacional: "nacional",
	Extranjera: "extranjera",
	Global: "global",
} as const;
export type TipoProveedor = keyof typeof tipoProveedor;

export const operacionProveedor = {
	ServiciosProfesionales: "servicios_profesionales",
	Arrendamiento: "arrendamiento",
	Otros: "otros",
} as const;
export type OperacionProveedor = keyof typeof operacionProveedor;

export interface Proveedor {
	id_proveedor: number;
	nombre: string;
	domicilio: number;
	rfc: string;
	curp: string;
	telefono: string;
	tipo: TipoProveedor;
	operacion: OperacionProveedor;
	regimen: string;
	nombre_extranjero?: string;
	pais_residencia: number;
	pais_nacimiento: number;
	banco: number;
	cuenta_clabe: string;
}
