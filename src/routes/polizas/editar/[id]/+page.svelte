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
        EditarPolizaEsquema,
        type EditarPolizaFormType,
    } from "$lib/esquemas/polizas/polizasEsquemas";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";
    import EditarPolizaEgreso from "./EditarPolizaEgreso.svelte";
    import EditarPolizaBasica from "./EditarPolizaBasica.svelte";

    export let data: PageData;

    let formD: SuperValidated<Infer<EditarPolizaFormType>> = data.form;
    let formDSucursal = data.formSucursal;

    const sucursales = data.sucursales;
    const bancos = data.bancos;
    const usuarios = data.usuarios;
    const domicilios = data.domicilios;

    const form = superForm(formD, {
        validators: zodClient(EditarPolizaEsquema),
        dataType: "json",
    });

    const { enhance, message } = form;

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }

    let mostrarPolizaEgreso = data.esEgreso;
</script>

<MainTitle titulo="Editar la poliza" subtitulo="Ajuste los data necesarios." />

<Card.Root>
    <Card.Content class="py-4">
        <form method="POST" use:enhance action="?/editarPoliza">
            <EditarPolizaBasica
                {form}
                {sucursales}
                bind:mostrarPolizaEgreso
                {formDSucursal}
                {usuarios}
                {domicilios}
            />

            {#if mostrarPolizaEgreso}
                <EditarPolizaEgreso {form} {bancos} />
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
