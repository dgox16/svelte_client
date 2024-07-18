<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import type { PageData } from "./$types.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { format } from "date-fns";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { DotsHorizontal, ExclamationTriangle } from "svelte-radix";
    import * as Select from "$lib/components/ui/select";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import {
        ivaDetallePoliza,
        type Poliza,
    } from "$lib/modelos/polizas/polizaBasica.js";
    import { toast } from "svelte-sonner";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import {
        AgregarDetallePolizaEsquema,
        type AgregarDetallePolizaFormType,
    } from "$lib/esquemas/polizas/polizasEsquemas.js";
    import SuperDebug, {
        superForm,
        type Infer,
        type SuperValidated,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: PageData;

    const poliza: Poliza = data.poliza;
    const poliza_egreso = data.poliza_egreso;
    const cuentas = data.cuentas;
    const proveedores = data.proveedores;
    let detalles_poliza = data.detalles_poliza;

    const formD: SuperValidated<Infer<AgregarDetallePolizaFormType>> =
        data.form;

    const form = superForm(formD, {
        validators: zodClient(AgregarDetallePolizaEsquema),
        dataType: "json",
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

    const eliminarDetallePoliza = async (id: Number) => {
        const respuesta = await fetch(
            `http://localhost:8000/api/poliza/detalles/eliminar/${id}`,
            {
                method: "DELETE",
            },
        );
        const resultado = await respuesta.json();
        if (!resultado.estado) {
            toast.error("Error al eliminar el detalle.");
        } else {
            toast.info("Detalle eliminado correctamente.");
            detalles_poliza = detalles_poliza.filter(
                (d) => d.id_detalle_poliza !== id,
            );
        }
    };
</script>

<MainTitle
    titulo="Visualización de poliza"
    subtitulo="Puedes revisar todos los detalle de la poliza"
/>
<div class="grid grid-cols-3 gap-4">
    <span><span class="font-bold">ID: </span>{poliza.id_poliza}</span>
    <span class="col-span-2"
        ><span class="font-bold">Concepto: </span>{poliza.concepto}</span
    >
    <span><span class="font-bold">Tipo: </span>{poliza.tipo}</span>
    <span
        ><span class="font-bold">Fecha: </span>{format(
            new Date(poliza.fecha_poliza),
            "dd/MM/yyyy HH:mm:ss",
        )}</span
    >
    <span><span class="font-bold">Sucursal: </span>{poliza.sucursal}</span>
    <span><span class="font-bold">Fuente: </span>{poliza.fuente}</span>
    <span><span class="font-bold">Aplicación: </span>{poliza.aplicacion}</span>
    <span
        ><span class="font-bold"
            >ID del usuario:
        </span>{poliza.usuario_elabora}</span
    >
</div>

{#if poliza.tipo == "Egreso"}
    <Card.Root class="mt-7">
        <Card.Header>
            <Card.Title class="text-2xl">Datos de egreso</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-3 gap-4">
                <span
                    ><span class="font-bold"
                        >Beneficiario:
                    </span>{poliza_egreso.beneficiario}</span
                >
                <span
                    ><span class="font-bold"
                        >Banco:
                    </span>{poliza_egreso.banco}</span
                >
                <span
                    ><span class="font-bold"
                        >Cheque:
                    </span>{poliza_egreso.cheque}</span
                >
            </div>
        </Card.Content>
    </Card.Root>
{/if}

<Card.Root class="mt-7">
    <Card.Header>
        <div class="flex justify-between">
            <Card.Title class="text-2xl">Detalles de poliza</Card.Title>
            <Dialog.Root>
                <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
                    >Agregar nuevo detalle</Dialog.Trigger
                >
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>Agregar nuevo detalle</Dialog.Title>
                        <Dialog.Description>
                            Completa los campos siguientes.
                        </Dialog.Description>
                    </Dialog.Header>
                    <form method="POST" use:enhance>
                        <Form.Field {form} name="cuenta">
                            <Form.Control let:attrs>
                                <div class="py-2 flex flex-row items-center">
                                    <Form.Label class="mr-5 mt-2"
                                        >Cuenta:</Form.Label
                                    >
                                    <Select.Root
                                        selected={cuentaSeleccionada}
                                        onSelectedChange={(v) => {
                                            v &&
                                                ($formDatos.cuenta = Number(
                                                    v.value,
                                                ));
                                        }}
                                    >
                                        <Select.Trigger {...attrs}>
                                            <Select.Value
                                                placeholder="Selecciona la cuenta"
                                            />
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
                        <Form.Field
                            {form}
                            name="proveedor"
                            class="py-2 flex flex-row items-center"
                        >
                            <Form.Control let:attrs>
                                <Form.Label class="mr-5 mt-2"
                                    >Proveedor:</Form.Label
                                >
                                <Select.Root
                                    selected={proveedorSeleccionado}
                                    onSelectedChange={(v) => {
                                        console.info(v.value);
                                        v &&
                                            ($formDatos.proveedor = Number(
                                                v.value,
                                            ));
                                    }}
                                >
                                    <Select.Trigger {...attrs}>
                                        <Select.Value
                                            placeholder="Selecciona el proveedor"
                                        />
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
                                    <Form.Label class="mr-5 mt-2"
                                        >Concepto:</Form.Label
                                    >
                                    <Input
                                        {...attrs}
                                        bind:value={$formDatos.concepto}
                                    />
                                </div>
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                        <Form.Field
                            {form}
                            name="abono"
                            class="py-2 flex flex-row items-center"
                        >
                            <Form.Control let:attrs>
                                <Form.Label class="mr-5 mt-2">Abono:</Form.Label
                                >
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
                        <Form.Field
                            {form}
                            name="cargo"
                            class="py-2 flex flex-row items-center"
                        >
                            <Form.Control let:attrs>
                                <Form.Label class="mr-5 mt-2">Cargo:</Form.Label
                                >
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
                        <Form.Field
                            {form}
                            name="iva"
                            class="py-2 flex flex-row items-center"
                        >
                            <Form.Control let:attrs>
                                <Form.Label class="mr-5 mt-2">IVA:</Form.Label>
                                <Select.Root
                                    selected={ivaSeleccionada}
                                    onSelectedChange={(v) => {
                                        v && ($formDatos.iva = v.value);
                                    }}
                                >
                                    <Select.Trigger {...attrs}>
                                        <Select.Value
                                            placeholder="Selecciona el IVA"
                                        />
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
                                <Alert.Description>{$message}</Alert.Description
                                >
                            </Alert.Root>
                        {/if}

                        <Form.Button class="w-full font-semibold mt-2"
                            >AGREGAR</Form.Button
                        >
                    </form>
                    <SuperDebug data={formDatos} />
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </Card.Header>
    <Card.Content>
        {#if detalles_poliza == undefined}
            <div class="flex justify-center items-center my-6">
                <h1 class="text-lg font-semibold uppercase">No hay detalles</h1>
            </div>
        {:else}
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.Head class="w-[100px]">ID</Table.Head>
                        <Table.Head>Concepto</Table.Head>
                        <Table.Head>Cuenta</Table.Head>
                        <Table.Head>Iva</Table.Head>
                        <Table.Head>Cargo</Table.Head>
                        <Table.Head>Abono</Table.Head>
                        <Table.Head class="w-[10px]"></Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {#each detalles_poliza as detalle, i (i)}
                        <Table.Row>
                            <Table.Cell class="font-medium"
                                >{detalle.id_detalle_poliza}</Table.Cell
                            >
                            <Table.Cell>{detalle.concepto}</Table.Cell>
                            <Table.Cell>{detalle.cuenta}</Table.Cell>
                            <Table.Cell>{detalle.iva}</Table.Cell>
                            <Table.Cell>{detalle.cargo}</Table.Cell>
                            <Table.Cell>{detalle.abono}</Table.Cell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild let:builder>
                                        <Button
                                            builders={[builder]}
                                            variant="ghost"
                                            ><DotsHorizontal
                                                class="size-5"
                                            /></Button
                                        >
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content class="w-40">
                                        <DropdownMenu.Group>
                                            <DropdownMenu.Item
                                                on:click={() => {
                                                    eliminarDetallePoliza(
                                                        detalle.id_detalle_poliza,
                                                    );
                                                }}
                                                rel="external"
                                                >Eliminar</DropdownMenu.Item
                                            >
                                        </DropdownMenu.Group>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                        </Table.Row>
                    {/each}
                </Table.Body>
            </Table.Root>
        {/if}
    </Card.Content>
</Card.Root>
<Toaster />
