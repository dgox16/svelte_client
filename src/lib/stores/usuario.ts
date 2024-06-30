import type { Usuario } from "$lib/modelos/usuarios/usuario";
import { writable } from "svelte/store";

export const usuarioStore = writable<Usuario | null>(null);
