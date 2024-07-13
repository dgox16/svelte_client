<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import type { PageData } from "./$types.js";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { DotsHorizontal } from "svelte-radix";
    import { toast } from "svelte-sonner";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { format } from "date-fns";
    import { type Poliza } from "$lib/modelos/polizas/polizaBasica";

    export let data: PageData;
    let polizas: Poliza[] = data.polizas;

    const eliminarPoliza = async (poliza: Poliza) => {
        const respuesta = await fetch(
            `http://localhost:8000/api/poliza/eliminar/${poliza.id_poliza}`,
            {
                method: "DELETE",
            },
        );
        const resultado = await respuesta.json();
        if (!resultado.estado) {
            toast.error("Error al eliminar la poliza.");
        } else {
            toast.info("Poliza eliminada correctamente.");
            polizas = polizas.filter((p) => p.id_poliza !== poliza.id_poliza);
        }
    };
</script>

<MainTitle
    titulo="Visualización de todas las polizas"
    subtitulo="Puedes filtrar segun el concepto."
/>
<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head class="w-[100px]">ID</Table.Head>
            <Table.Head class="w-[100px]">Numero</Table.Head>
            <Table.Head>Tipo</Table.Head>
            <Table.Head>Concepto</Table.Head>
            <Table.Head>Aplicacion</Table.Head>
            <Table.Head>Fuente</Table.Head>
            <Table.Head>Fecha</Table.Head>
            <Table.Head class="w-[10px]"></Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each polizas as poliza, i (i)}
            <Table.Row>
                <Table.Cell class="font-medium">{poliza.id_poliza}</Table.Cell>
                <Table.Cell>{poliza.numero}</Table.Cell>
                <Table.Cell>{poliza.tipo}</Table.Cell>
                <Table.Cell>{poliza.concepto}</Table.Cell>
                <Table.Cell>{poliza.aplicacion}</Table.Cell>
                <Table.Cell>{poliza.fuente}</Table.Cell>
                <Table.Cell
                    >{format(
                        new Date(poliza.fecha_poliza),
                        "dd/MM/yyyy HH:mm:ss",
                    )}</Table.Cell
                >
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
                                    href={`/polizas/editar/${poliza.id_poliza}`}
                                    >Editar</DropdownMenu.Item
                                >
                                <DropdownMenu.Item
                                    on:click={() => {
                                        eliminarPoliza(poliza);
                                    }}
                                    rel="external">Eliminar</DropdownMenu.Item
                                >
                            </DropdownMenu.Group>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Table.Cell>
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
<Toaster />
