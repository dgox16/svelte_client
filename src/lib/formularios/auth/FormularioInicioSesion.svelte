<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import {
        InicioSesionEsquema,
        type InicioSesionFormulario,
    } from "$lib/esquemas/auth/AutorizacionEsquemas";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import ExclamationTriangle from "svelte-radix/ExclamationTriangle.svelte";

    export let datos: SuperValidated<Infer<InicioSesionFormulario>>;

    const form = superForm(datos, {
        validators: zodClient(InicioSesionEsquema),
    });

    const { form: formDatos, enhance, message } = form;

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="usuario" class="py-2">
        <Form.Control let:attrs>
            <Form.Label>Usuario</Form.Label>
            <Input {...attrs} bind:value={$formDatos.usuario} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="contraseña" class="py-2">
        <Form.Control let:attrs>
            <Form.Label>Contraseña</Form.Label>
            <Input
                type="password"
                {...attrs}
                bind:value={$formDatos.contraseña}
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    {#if $message}
        <Alert.Root variant="destructive" class="mb-1">
            <ExclamationTriangle class="h-4 w-4" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{$message}</Alert.Description>
        </Alert.Root>
    {/if}

    <Form.Button class="w-full font-semibold mt-2">INICIAR SESIÓN</Form.Button>
</form>
