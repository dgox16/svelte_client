<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import TablaDetallesVerPoliza from "./TablaDetallesVerPoliza.svelte";
    import FormularioAgregarDetallePoliza from "$lib/formularios/polizas/visualizar/FormularioAgregarDetallePoliza.svelte";
    import type { DetallePoliza } from "$lib/modelos/polizas/detallePoliza";

    export let detalles_poliza: Array<DetallePoliza>;
    export let formD;
    export let cuentas;
    export let proveedores;

    let abrirFormulario = false;
    function agregarDetalle(nuevo_detalle: DetallePoliza) {
        detalles_poliza = [...detalles_poliza, nuevo_detalle];
    }
</script>

<Card.Root class="mt-7">
    <Card.Header>
        <div class="flex justify-between">
            <Card.Title class="text-2xl">Detalles de poliza</Card.Title>
            <Dialog.Root bind:open={abrirFormulario}>
                <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
                    >Agregar nuevo detalle</Dialog.Trigger
                >
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>Agregar nuevo detalle</Dialog.Title>
                        <Dialog.Description>
                            Completa los campos siguientes.
                        </Dialog.Description>
                    </Dialog.Header>
                    <FormularioAgregarDetallePoliza
                        {formD}
                        {cuentas}
                        {proveedores}
                        bind:abrirFormulario
                        on:agregar-detalle={(event) =>
                            agregarDetalle(event.detail)}
                    />
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </Card.Header>
    <Card.Content>
        <TablaDetallesVerPoliza {detalles_poliza} />
    </Card.Content>
</Card.Root>
