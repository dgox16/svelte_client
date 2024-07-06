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
    import {
        tiposPoliza,
        aplicacionesPoliza,
        fuentesPoliza,
    } from "$lib/esquemas/polizas/polizasEsquemas";
    import AgregarPolizaEgreso from "./AgregarPolizaEgreso.svelte";
    import AgregarPolizaBasica from "./AgregarPolizaBasica.svelte";
    import AgregarDetallesPoliza from "./AgregarDetallesPoliza.svelte";

    export let datos;

    let formD: SuperValidated<Infer<AgregarPolizaFormType>> = datos.form;

    let sucursales: Array<{
        id_sucursal: number;
        nombre: string;
        domicilio: number;
        encargado: 1;
    }> = datos.sucursales;

    let bancos: Array<{
        id_banco: number;
        nombre: string;
    }> = datos.bancos;

    const form = superForm(formD, {
        validators: zodClient(AgregarPolizaEsquema),
        dataType: "json",
    });

    const { form: formDatos, enhance, message } = form;

    $: tipoSeleccionado = {
        label: tiposPoliza[$formDatos.tipo],
        value: $formDatos.tipo,
    };

    $: aplicacionSeleccionada = {
        label: aplicacionesPoliza[$formDatos.aplicacion],
        value: $formDatos.aplicacion,
    };

    $: fuenteSeleccionada = {
        label: fuentesPoliza[$formDatos.fuente],
        value: $formDatos.fuente,
    };

    $: sucursalSeleccionada = $formDatos.sucursal
        ? {
              label: sucursales.find(
                  (sucursal) => sucursal.id_sucursal === $formDatos.sucursal,
              )?.nombre,
              value: $formDatos.sucursal,
          }
        : undefined;

    $: bancoSeleccionado = $formDatos.poliza_egreso?.banco
        ? {
              label: bancos.find(
                  (sucursal) =>
                      sucursal.id_banco === $formDatos.poliza_egreso?.banco,
              )?.nombre,
              value: $formDatos.poliza_egreso?.banco,
          }
        : undefined;

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }

    let mostrarPolizaEgreso = false;
</script>

<form method="POST" use:enhance>
    <AgregarPolizaBasica
        {form}
        {formDatos}
        {tiposPoliza}
        {tipoSeleccionado}
        {sucursales}
        {sucursalSeleccionada}
        {aplicacionesPoliza}
        {aplicacionSeleccionada}
        {fuentesPoliza}
        {fuenteSeleccionada}
        bind:mostrarPolizaEgreso
    />

    {#if mostrarPolizaEgreso}
        <AgregarPolizaEgreso {form} {formDatos} {bancos} {bancoSeleccionado} />
    {/if}

    <AgregarDetallesPoliza {form} {formDatos} />

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
    <SuperDebug data={$formDatos} />
</form>
