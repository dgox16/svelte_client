<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { toast } from "svelte-sonner";
    import { Button } from "$lib/components/ui/button/index.js";
    import { DotsHorizontal } from "svelte-radix";
    import type { DetallePoliza } from "$lib/modelos/polizas/detallePoliza";

    export let detalles_poliza: Array<DetallePoliza>;

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
                                <Button builders={[builder]} variant="ghost"
                                    ><DotsHorizontal class="size-5" /></Button
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
