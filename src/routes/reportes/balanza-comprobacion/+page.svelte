<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { cn } from "$lib/utils.js";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import {
        DateFormatter,
        type DateValue,
        getLocalTimeZone,
    } from "@internationalized/date";
    import { CalendarIcon } from "lucide-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    let cuentas = data.cuentas;
    let total = data.total;

    const df = new DateFormatter("es-ES", {
        dateStyle: "long",
    });

    let fechaMostrar: DateValue | undefined = undefined;
    let fechaApi = data.fechaActual;
</script>

<div class="flex flex-row justify-between items-center">
    <MainTitle
        titulo="Balanza de comprobación"
        subtitulo="Analisis de cada una de las cuentas"
    />
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
            <Button builders={[builder]} variant="default"
                >Descargar reporte</Button
            >
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-40">
            <DropdownMenu.Group>
                <DropdownMenu.Item>En PDF</DropdownMenu.Item>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>

<Card.Root class="mt-7">
    <Card.Header>
        <Popover.Root>
            <Popover.Trigger asChild let:builder>
                <Button
                    variant="outline"
                    class={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !fechaMostrar && "text-muted-foreground",
                    )}
                    builders={[builder]}
                >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {fechaMostrar
                        ? df.format(fechaMostrar.toDate(getLocalTimeZone()))
                        : "Selecciona una fecha"}
                </Button>
            </Popover.Trigger>
            <Popover.Content class="w-auto p-0">
                <Calendar
                    locale="es"
                    bind:fechaMostrar
                    initialFocus
                    onValueChange={async (v) => {
                        if (v) {
                            fechaMostrar = v;
                            fechaApi = v
                                .toDate(getLocalTimeZone())
                                .toLocaleDateString("sv-SE");

                            const respuesta = await fetch(
                                `http://localhost:8000/api/poliza/balanza_comprobacion?fecha=${fechaApi}`,
                            );
                            const resultado = await respuesta.json();
                            cuentas = resultado.datos.balanza;
                            total = resultado.datos.total;
                        } else {
                            fechaMostrar = undefined;
                        }
                    }}
                />
            </Popover.Content>
        </Popover.Root>
    </Card.Header>
    <Card.Content>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">ID</Table.Head>
                    <Table.Head>Deudora Anterior</Table.Head>
                    <Table.Head>Abono</Table.Head>
                    <Table.Head>Cargo</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each cuentas as cuenta, i (i)}
                    <Table.Row>
                        <Table.Cell class="font-bold"
                            >{cuenta.cuenta}</Table.Cell
                        >
                        <Table.Cell>{cuenta.total}</Table.Cell>
                        <Table.Cell>{cuenta.total_abono}</Table.Cell>
                        <Table.Cell>{cuenta.total_cargo}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Card.Content>
    <Card.Footer>
        <div class="font-bold">Total: ${total}</div>
    </Card.Footer>
</Card.Root>
