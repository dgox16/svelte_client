import { z } from "zod";

export const AgregarSucursalEsquema = z.object({
	nombre: z.string().min(1, "Coloca un nombre"),
	encargado: z.number().int().gt(0, "Selecciona una opcion"),
	domicilio: z.number().int().gt(0, "Selecciona una opcion"),
});
export type AgregarSucursalFormType = typeof AgregarSucursalEsquema;
