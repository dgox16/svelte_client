<script lang="ts">
    import type { PageData } from "./$types.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import * as Form from "$lib/components/ui/form";
    import {
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

    export let data: PageData;

    let formD: SuperValidated<Infer<AgregarPolizaFormType>> = data.form;
    let formDSucursal = data.formSucursal;
    let formDBanco = data.formBanco;

    const sucursales = data.sucursales;
    const bancos = data.bancos;
    const cuentas = data.cuentas;
    const proveedores = data.proveedores;
    const usuarios = data.usuarios;
    const domicilios = data.domicilios;

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

<MainTitle
    titulo="Crear una nueva poliza"
    subtitulo="Llena los data solicitados."
/>

<Card.Root>
    <Card.Content class="py-4">
        <form method="POST" use:enhance action="?/agregarPoliza">
            <AgregarPolizaBasica
                {form}
                {usuarios}
                {domicilios}
                {formDSucursal}
                {sucursales}
                bind:mostrarPolizaEgreso
            />

            {#if mostrarPolizaEgreso}
                <AgregarPolizaEgreso {form} {bancos} {formDBanco} />
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
    </Card.Content>
</Card.Root>

<Toaster />
