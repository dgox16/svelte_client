<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import SuperDebug, {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import {
        AgregarPolizaEsquema,
        type AgregarPolizaFormType,
    } from "$lib/esquemas/polizas/polizasEsquemas";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";
    import AgregarPolizaEgreso from "./AgregarPolizaEgreso.svelte";
    import AgregarPolizaBasica from "./AgregarPolizaBasica.svelte";
    import AgregarDetallesPoliza from "./AgregarDetallesPoliza.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    export let datos;

    let formD: SuperValidated<Infer<AgregarPolizaFormType>> = datos.form;

    const sucursales = datos.sucursales;
    const bancos = datos.bancos;
    const cuentas = datos.cuentas;
    const proveedores = datos.proveedores;

    const form = superForm(formD, {
        validators: zodClient(AgregarPolizaEsquema),
        dataType: "json",
    });

    const { form: formDatos, enhance, message } = form;

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }

    let mostrarPolizaEgreso = false;
    let mostrarDetalles = false;
    let numeroDetalles = 0;

    const llenarDetalles = (aMostrar: boolean, numeroDetalle: number) => {
        console.info(numeroDetalle);
        $formDatos.detalles_poliza[numeroDetalle].concepto = aMostrar
            ? ""
            : "test";

        $formDatos.detalles_poliza[numeroDetalle].cargo = aMostrar
            ? undefined
            : 0;
        $formDatos.detalles_poliza[numeroDetalle].abono = aMostrar
            ? undefined
            : 0;
    };
</script>

<form method="POST" use:enhance>
    <AgregarPolizaBasica {form} {sucursales} bind:mostrarPolizaEgreso />

    {#if mostrarPolizaEgreso}
        <AgregarPolizaEgreso {form} {bancos} />
    {/if}

    <div class="flex justify-center my-4">
        <Button
            variant="secondary"
            on:click={() => {
                mostrarDetalles = !mostrarDetalles;
                numeroDetalles = mostrarDetalles ? 1 : 0;
                $formDatos.numeroDetalles = numeroDetalles;
                llenarDetalles(mostrarDetalles, 0);
            }}
            >{mostrarDetalles
                ? "No agregar detalles de poliza"
                : "Agregar detalles de poliza"}</Button
        >
    </div>
    {#if mostrarDetalles}
        <AgregarDetallesPoliza
            {form}
            {cuentas}
            {proveedores}
            bind:numeroDetalles
            {llenarDetalles}
        />
    {/if}

    {#if $message}
        <Alert.Root variant="destructive" class="mb-1">
            <ExclamationTriangle class="h-4 w-4" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{$message}</Alert.Description>
        </Alert.Root>
    {/if}

    <div class="flex justify-end">
        <Form.Button class="font-semibold mt-3">AGREGAR</Form.Button>
    </div>
</form>
