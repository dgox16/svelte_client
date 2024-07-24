export const tipoProveedor = {
	Nacional: "Nacional",
	Extranjera: "Extranjera",
	Global: "Global",
} as const;
export type TipoProveedor = keyof typeof tipoProveedor;

export const operacionProveedor = {
	ServiciosProfesionales: "Servicios Profesionales",
	Arrendamiento: "Arrendamiento",
	Otros: "Otros",
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
