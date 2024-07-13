<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import SuperDebug, {
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

    export let datos;

    let formD: SuperValidated<Infer<EditarPolizaFormType>> = datos.form;

    const sucursales = datos.sucursales;
    const bancos = datos.bancos;

    const form = superForm(formD, {
        validators: zodClient(EditarPolizaEsquema),
        dataType: "json",
    });

    const { form: formDatos, enhance, message } = form;

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }

    let mostrarPolizaEgreso = datos.esEgreso;
</script>

<form method="POST" use:enhance>
    <EditarPolizaBasica {form} {sucursales} bind:mostrarPolizaEgreso />

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
<SuperDebug data={formDatos} />
