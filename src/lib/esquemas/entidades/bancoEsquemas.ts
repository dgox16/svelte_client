import { z } from "zod";

export const AgregarBancoEsquema = z.object({
	nombre: z.string().min(1, "Coloca un nombre"),
});
export type AgregarBancoFormType = typeof AgregarBancoEsquema;
