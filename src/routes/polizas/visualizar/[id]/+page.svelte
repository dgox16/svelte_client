<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import type { PageData } from "./$types.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";

    export let data: PageData;

    import { format } from "date-fns";
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { DotsHorizontal } from "svelte-radix";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    console.info(data);
</script>

<MainTitle
    titulo="Visualización de poliza"
    subtitulo="Puedes revisar todos los detalle de la poliza"
/>
<div class="grid grid-cols-3 gap-4">
    <span><span class="font-bold">ID: </span>{data.poliza.id_poliza}</span>
    <span class="col-span-2"
        ><span class="font-bold">Concepto: </span>{data.poliza.concepto}</span
    >
    <span><span class="font-bold">Tipo: </span>{data.poliza.tipo}</span>
    <span
        ><span class="font-bold">Fecha: </span>{format(
            new Date(data.poliza.fecha_poliza),
            "dd/MM/yyyy HH:mm:ss",
        )}</span
    >
    <span><span class="font-bold">Sucursal: </span>{data.poliza.sucursal}</span>
    <span><span class="font-bold">Fuente: </span>{data.poliza.fuente}</span>
    <span
        ><span class="font-bold">Aplicación: </span>{data.poliza
            .aplicacion}</span
    >
    <span
        ><span class="font-bold">ID del usuario: </span>{data.poliza
            .usuario_elabora}</span
    >
</div>

{#if data.poliza.tipo == "Egreso"}
    <Card.Root class="mt-7">
        <Card.Header>
            <Card.Title class="text-2xl">Datos de egreso</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-3 gap-4">
                <span
                    ><span class="font-bold">Beneficiario: </span>{data
                        .poliza_egreso.beneficiario}</span
                >
                <span
                    ><span class="font-bold">Banco: </span>{data.poliza_egreso
                        .banco}</span
                >
                <span
                    ><span class="font-bold">Cheque: </span>{data.poliza_egreso
                        .cheque}</span
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
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right">Name</Label>
                            <Input
                                id="name"
                                value="Pedro Duarte"
                                class="col-span-3"
                            />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="username" class="text-right"
                                >Username</Label
                            >
                            <Input
                                id="username"
                                value="@peduarte"
                                class="col-span-3"
                            />
                        </div>
                    </div>
                    <Dialog.Footer>
                        <Button type="submit">Save changes</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    </Card.Header>
    <Card.Content>
        {#if data.detalles_poliza == undefined}
            <h1>No hay detalles</h1>{:else}
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
                    {#each data.detalles_poliza as detalle, i (i)}
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
                                                href={`/polizas/editar/${detalle.id_detalle_poliza}`}
                                                >Editar</DropdownMenu.Item
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
