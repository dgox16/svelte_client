<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import { ExclamationTriangle } from "svelte-radix";
    import { Input } from "$lib/components/ui/input";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import {
        AgregarSucursalEsquema,
        type AgregarSucursalFormType,
    } from "$lib/esquemas/entidades/sucursalEsquemas";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { createEventDispatcher } from "svelte";
    import { toast } from "svelte-sonner";

    const dispatch = createEventDispatcher();
    export let formDSucursal: SuperValidated<Infer<AgregarSucursalFormType>>;
    export let abrirFormularioSucursal;
    export let usuarios;
    export let domicilios;

    const form = superForm(formDSucursal, {
        validators: zodClient(AgregarSucursalEsquema),
        dataType: "json",

        onResult({ result }) {
            if (result.type === "success") {
                dispatch("agregar-sucursal", result.data?.nuevaSucursal);
                abrirFormularioSucursal = false;
                toast("La sucursal fue agregada correctamente.");
            }
        },
    });
    const { form: formDatos, enhance, message } = form;

    $: encargadoSeleccionado = $formDatos.encargado
        ? {
              label: usuarios.find(
                  (usuario) => usuario.id == $formDatos.encargado,
              )?.usuario,
              value: $formDatos.encargado,
          }
        : undefined;

    $: domicilioSeleccionado = $formDatos.domicilio
        ? (() => {
              const domicilio = domicilios.find(
                  (domicilio) =>
                      domicilio.id_domicilio === $formDatos.domicilio,
              );
              return {
                  label: `${domicilio?.cp} - ${domicilio?.numero_exterior}`,
                  value: $formDatos.domicilio,
              };
          })()
        : undefined;
</script>

<form method="POST" use:enhance action="?/agregarSucursal">
    <Form.Field {form} name="nombre">
        <Form.Control let:attrs>
            <div class="py-2 flex flex-row items-center">
                <Form.Label class="mr-5 mt-2">Nombre:</Form.Label>
                <Input {...attrs} bind:value={$formDatos.nombre} />
            </div>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="encargado">
        <Form.Control let:attrs>
            <div class="py-2 flex flex-row items-center">
                <Form.Label class="mr-5 mt-2">Encargado:</Form.Label>
                <Select.Root
                    selected={encargadoSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.encargado = Number(v.value));
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona un encargado" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each usuarios as usuario}
                            <Select.Item
                                value={usuario.id}
                                label={usuario.usuario}
                                >{usuario.usuario}</Select.Item
                            >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="domicilio">
        <Form.Control let:attrs>
            <div class="py-2 flex flex-row items-center">
                <Form.Label class="mr-5 mt-2">Domicilio:</Form.Label>
                <Select.Root
                    selected={domicilioSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.domicilio = Number(v.value));
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona un domicilio" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each domicilios as domicilio}
                            <Select.Item
                                value={domicilio.id_domicilio}
                                label={`${domicilio.cp} - ${domicilio.numero_exterior}`}
                                >{`${domicilio.cp} - ${domicilio.numero_exterior}`}</Select.Item
                            >
                        {/each}
                    </Select.Content>
                </Select.Root>
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
