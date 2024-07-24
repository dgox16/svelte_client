<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { ExclamationTriangle } from "svelte-radix";
    import { Input } from "$lib/components/ui/input";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import {
        AgregarBancoEsquema,
        type AgregarBancoFormType,
    } from "$lib/esquemas/entidades/bancoEsquemas";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { createEventDispatcher } from "svelte";
    import { toast } from "svelte-sonner";

    const dispatch = createEventDispatcher();
    export let formDBanco: SuperValidated<Infer<AgregarBancoFormType>>;
    export let abrirFormularioBanco;

    const form = superForm(formDBanco, {
        validators: zodClient(AgregarBancoEsquema),
        dataType: "json",

        onResult({ result }) {
            if (result.type === "success") {
                dispatch("agregar-banco", result.data?.nuevoBanco);
                abrirFormularioBanco = false;
                toast("El banco fue agregado correctamente.");
            }
        },
    });
    const { form: formDatos, enhance, message } = form;
</script>

<form method="POST" use:enhance action="?/agregarBanco">
    <Form.Field {form} name="nombre">
        <Form.Control let:attrs>
            <div class="py-2 flex flex-row items-center">
                <Form.Label class="mr-5 mt-2">Nombre:</Form.Label>
                <Input {...attrs} bind:value={$formDatos.nombre} />
            </div>
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

    <Form.Button class="w-full font-semibold mt-2">AGREGAR</Form.Button>
</form>
