<script lang="ts">
    import type { PageData } from "./$types.js";
    import { type Poliza } from "$lib/modelos/polizas/polizaBasica.js";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import PrincipalVerPoliza from "./PrincipalVerPoliza.svelte";
    import DetallesVerPoliza from "./DetallesVerPoliza.svelte";

    export let data: PageData;

    const poliza: Poliza = data.poliza;
    const poliza_egreso = data.poliza_egreso;
    const formD = data.form;
    const cuentas = data.cuentas;
    const proveedores = data.proveedores;
    let detalles_poliza = data.detalles_poliza;
</script>

<PrincipalVerPoliza {poliza} {poliza_egreso} />

<DetallesVerPoliza {formD} {detalles_poliza} {cuentas} {proveedores} />
<Toaster />
