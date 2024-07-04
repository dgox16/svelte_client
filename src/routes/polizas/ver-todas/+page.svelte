<script lang="ts">
    import * as Table from "$lib/components/ui/table/index.js";
    import type { PageData } from "./$types.js";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";

    export let data: PageData;
    let polizas = data.polizas;
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
            <Table.Head class="text-right">Fecha</Table.Head>
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
                <Table.Cell class="text-right">{poliza.fecha_poliza}</Table.Cell
                >
            </Table.Row>
        {/each}
    </Table.Body>
</Table.Root>
