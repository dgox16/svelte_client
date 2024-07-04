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
    import * as Select from "$lib/components/ui/select";
    import Input from "$lib/components/ui/input/input.svelte";
    import {
        tiposPoliza,
        aplicacionesPoliza,
        fuentesPoliza,
    } from "$lib/esquemas/polizas/polizasEsquemas";

    export let datos;

    let formD: SuperValidated<Infer<AgregarPolizaFormType>> = datos.form;

    let sucursales: Array<{
        id_sucursal: number;
        nombre: string;
        domicilio: number;
        encargado: 1;
    }> = datos.sucursales;

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

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }
</script>

<form method="POST" use:enhance>
    <div class="grid grid-cols-3 gap-x-10 gap-y-5">
        <Form.Field {form} name="tipo">
            <Form.Control let:attrs>
                <Form.Label>Tipo de poliza</Form.Label>
                <Select.Root
                    selected={tipoSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.tipo = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona el tipo de poliza"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(tiposPoliza) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="numero">
            <Form.Control let:attrs>
                <Form.Label>Numero de poliza</Form.Label>
                <Input
                    type="number"
                    step="1"
                    min="0"
                    {...attrs}
                    bind:value={$formDatos.numero}
                />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="sucursal">
            <Form.Control let:attrs>
                <Form.Label>Sucursal</Form.Label>
                <Select.Root
                    selected={sucursalSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.sucursal = Number(v.value));
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona la sucursal" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each sucursales as sucursal}
                            <Select.Item
                                value={sucursal.id_sucursal}
                                label={sucursal.nombre}
                                >{sucursal.nombre}</Select.Item
                            >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="concepto">
            <Form.Control let:attrs>
                <Form.Label>Concepto</Form.Label>
                <Input {...attrs} bind:value={$formDatos.concepto} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="aplicacion">
            <Form.Control let:attrs>
                <Form.Label>Aplicación</Form.Label>
                <Select.Root
                    selected={aplicacionSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.aplicacion = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona la aplicacion de la poliza"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(aplicacionesPoliza) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="fuente">
            <Form.Control let:attrs>
                <Form.Label>Fuente</Form.Label>
                <Select.Root
                    selected={fuenteSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.fuente = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona la fuente de la poliza"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(fuentesPoliza) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>

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
