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

export const clasificacionCuenta = {
	Capitulo: "capitulo",
	Subcapitulo: "subcapitulo",
	Mayor: "mayor",
	Menor: "menor",
} as const;
export type ClasificacionCuenta = keyof typeof clasificacionCuenta;

export const grupoCuenta = {
	Activo: "activo",
	Pasivo: "pasivo",
	Capital: "capital",
	ResultadoAcreedor: "resultado_acreedor",
	ResultadoDeudor: "resultado_deudor",
	Orden: "orden",
	Puente: "puente",
} as const;
export type GrupoCuenta = keyof typeof grupoCuenta;

export const finalidadCuenta = {
	Caja: "caja",
	Banco: "banco",
	Otros: "otros",
} as const;
export type FinalidadCuenta = keyof typeof finalidadCuenta;

export const naturalezaCuenta = {
	Deudora: "deudora",
	Acreedora: "acreedora",
} as const;
export type NaturalezaCuenta = keyof typeof naturalezaCuenta;

export interface Cuenta {
	id_cuenta: number;
	cuenta: string;
	cuenta_siti: string;
	nombre: string;
	clasificacion: ClasificacionCuenta;
	grupo: GrupoCuenta;
	finalidad: FinalidadCuenta;
	naturaleza: NaturalezaCuenta;
	afectable: boolean;
	padre: string;
	nivel: number;
	en_balance: boolean;
	en_catalogo_minimo: boolean;
	nombre_balance: string;
	nombre_siti: string;
	cuenta_padre_siti: string;
	cuenta_agrupar: string;
	orden_siti: number;
	subcuenta_siti: boolean;
	prorrateo: boolean;
}
