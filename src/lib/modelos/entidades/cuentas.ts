export const clasificacionCuenta = {
	Capitulo: "Capitulo",
	Subcapitulo: "Subcapitulo",
	Mayor: "Mayor",
	Menor: "Menor",
} as const;
export type ClasificacionCuenta = keyof typeof clasificacionCuenta;

export const grupoCuenta = {
	Activo: "Activo",
	Pasivo: "Pasivo",
	Capital: "Capital",
	ResultadoAcreedor: "Resultado acreedor",
	ResultadoDeudor: "Resultado deudor",
	Orden: "Orden",
	Puente: "Puente",
} as const;
export type GrupoCuenta = keyof typeof grupoCuenta;

export const finalidadCuenta = {
	Caja: "Caja",
	Banco: "Banco",
	Otros: "Otros",
} as const;
export type FinalidadCuenta = keyof typeof finalidadCuenta;

export const naturalezaCuenta = {
	Deudora: "Deudora",
	Acreedora: "Acreedora",
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
