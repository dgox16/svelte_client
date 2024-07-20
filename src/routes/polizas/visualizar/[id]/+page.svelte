<script lang="ts">
    import type { PageData } from "./$types.js";
    import { type Poliza } from "$lib/modelos/polizas/polizaBasica.js";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import PrincipalVerPoliza from "./PrincipalVerPoliza.svelte";
    import DetallesVerPoliza from "./DetallesVerPoliza.svelte";

    export let data: PageData;

    const poliza: Poliza = data.poliza;
    const polizaEgreso = data.polizaEgreso;
    const formD = data.form;
    const cuentas = data.cuentas;
    const proveedores = data.proveedores;
    let detallesPoliza = data.detallesPoliza;
</script>

<PrincipalVerPoliza {poliza} {polizaEgreso} {detallesPoliza} />
<DetallesVerPoliza {formD} {detallesPoliza} {cuentas} {proveedores} />
<Toaster />
