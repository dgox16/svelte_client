<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import { ExclamationTriangle } from "svelte-radix";
    import { Input } from "$lib/components/ui/input";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import {
        ivaDetallePoliza,
        type DetallePoliza,
    } from "$lib/modelos/polizas/detallePoliza";
    import {
        AgregarDetallePolizaEsquema,
        type AgregarDetallePolizaFormType,
    } from "$lib/esquemas/polizas/polizasEsquemas";
    import {
        superForm,
        type Infer,
        type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { createEventDispatcher } from "svelte";

    export let formD: SuperValidated<Infer<AgregarDetallePolizaFormType>>;
    export let cuentas;
    export let proveedores;
    export let abrirFormulario;

    const dispatch = createEventDispatcher();

    const form = superForm(formD, {
        validators: zodClient(AgregarDetallePolizaEsquema),
        dataType: "json",

        onResult({ result }) {
            if (result.type === "success") {
                dispatch(
                    "agregar-detalle",
                    result.data?.nuevo_detalle as DetallePoliza,
                );
                abrirFormulario = false;
            }
        },
    });

    const { form: formDatos, enhance, message } = form;

    $: if ($message) {
        setTimeout(() => {
            message.set("");
        }, 4000);
    }

    $: cuentaSeleccionada = $formDatos.cuenta
        ? {
              label: cuentas.find(
                  (cuenta) => cuenta.id_cuenta === $formDatos.cuenta,
              )?.nombre,
              value: $formDatos.cuenta,
          }
        : undefined;

    $: ivaSeleccionada = {
        label: ivaDetallePoliza[$formDatos.iva],
        value: $formDatos.iva,
    };

    $: proveedorSeleccionado = $formDatos.proveedor
        ? {
              label: proveedores.find(
                  (proveedor) =>
                      proveedor.id_proveedor === $formDatos.proveedor,
              )?.nombre,
              value: $formDatos.proveedor,
          }
        : undefined;
</script>

<form method="POST" use:enhance>
    <Form.Field {form} name="cuenta">
        <Form.Control let:attrs>
            <div class="py-2 flex flex-row items-center">
                <Form.Label class="mr-5 mt-2">Cuenta:</Form.Label>
                <Select.Root
                    selected={cuentaSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.cuenta = Number(v.value));
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona la cuenta" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each cuentas as cuenta}
                            <Select.Item
                                value={cuenta.id_cuenta}
                                label={cuenta.nombre}
                                >{cuenta.nombre}</Select.Item
                            >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </div>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="proveedor" class="py-2 flex flex-row items-center">
        <Form.Control let:attrs>
            <Form.Label class="mr-5 mt-2">Proveedor:</Form.Label>
            <Select.Root
                selected={proveedorSeleccionado}
                onSelectedChange={(v) => {
                    console.info(v.value);
                    v && ($formDatos.proveedor = Number(v.value));
                }}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Selecciona el proveedor" />
                </Select.Trigger>
                <Select.Content>
                    {#each proveedores as proveedor}
                        <Select.Item
                            value={proveedor.id_proveedor}
                            label={proveedor.nombre}
                            >{proveedor.nombre}</Select.Item
                        >
                    {/each}
                </Select.Content>
            </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="concepto">
        <Form.Control let:attrs>
            <div class="py-2 flex flex-row items-center">
                <Form.Label class="mr-5 mt-2">Concepto:</Form.Label>
                <Input {...attrs} bind:value={$formDatos.concepto} />
            </div>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="abono" class="py-2 flex flex-row items-center">
        <Form.Control let:attrs>
            <Form.Label class="mr-5 mt-2">Abono:</Form.Label>
            <Input
                type="number"
                min="0"
                step="0.01"
                {...attrs}
                bind:value={$formDatos.abono}
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="cargo" class="py-2 flex flex-row items-center">
        <Form.Control let:attrs>
            <Form.Label class="mr-5 mt-2">Cargo:</Form.Label>
            <Input
                type="number"
                min="0"
                step="0.01"
                {...attrs}
                bind:value={$formDatos.cargo}
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="iva" class="py-2 flex flex-row items-center">
        <Form.Control let:attrs>
            <Form.Label class="mr-5 mt-2">IVA:</Form.Label>
            <Select.Root
                selected={ivaSeleccionada}
                onSelectedChange={(v) => {
                    v && ($formDatos.iva = v.value);
                }}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Selecciona el IVA" />
                </Select.Trigger>
                <Select.Content>
                    {#each Object.entries(ivaDetallePoliza) as [value, label]}
                        <Select.Item {value} {label} />
                    {/each}
                </Select.Content>
            </Select.Root>
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
