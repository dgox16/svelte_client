<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { cn } from "$lib/utils.js";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { generarBalanzaComprobacionPdf } from "$lib/funciones/generarReportes/reporteBalanzaComprobacionPdf";
    import {
        DateFormatter,
        type DateValue,
        getLocalTimeZone,
    } from "@internationalized/date";
    import { CalendarIcon } from "lucide-svelte";
    import type { PageData } from "./$types";
    import Label from "$lib/components/ui/label/label.svelte";

    export let data: PageData;
    let cuentas = data.cuentas;
    let total = data.total;

    const df = new DateFormatter("es-ES", {
        dateStyle: "long",
    });

    let fechaMostrarInicial: DateValue | undefined;
    let fechaMostrarFinal: DateValue | undefined;
    let fechaApiInicial = data.fechaInicial;
    let fechaApiFinal = data.fechaFinal;
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
                <DropdownMenu.Item
                    on:click={() => {
                        generarBalanzaComprobacionPdf(cuentas, total);
                    }}>En PDF</DropdownMenu.Item
                >
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>

<Card.Root class="mt-7">
    <Card.Header>
        <div class="flex flex-row">
            <div class="flex flex-row items-center">
                <Label class="mr-5 font-medium">Fecha inicial:</Label>
                <Popover.Root>
                    <Popover.Trigger asChild let:builder>
                        <Button
                            variant="outline"
                            class={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !fechaMostrarInicial && "text-muted-foreground",
                            )}
                            builders={[builder]}
                        >
                            <CalendarIcon class="mr-2 h-4 w-4" />
                            {fechaMostrarInicial
                                ? df.format(
                                      fechaMostrarInicial.toDate(
                                          getLocalTimeZone(),
                                      ),
                                  )
                                : "Selecciona la fecha inicial"}
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content class="w-auto p-0">
                        <Calendar
                            locale="es"
                            value={fechaMostrarInicial}
                            maxValue={fechaMostrarFinal}
                            initialFocus
                            onValueChange={async (v) => {
                                if (v) {
                                    fechaMostrarInicial = v;
                                    fechaApiInicial = v
                                        .toDate(getLocalTimeZone())
                                        .toLocaleDateString("sv-SE");

                                    const respuesta = await fetch(
                                        `http://localhost:8000/api/balanza_comprobacion?fecha_inicial=${fechaApiInicial}&fecha_final=${fechaApiFinal}`,
                                    );
                                    const resultado = await respuesta.json();
                                    cuentas = resultado.datos.balanza;
                                    total = resultado.datos.total;
                                } else {
                                    fechaMostrarInicial = undefined;
                                }
                            }}
                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
            <div class="flex flex-row items-center">
                <Label class="ml-7 mr-5 font-medium">Fecha final:</Label>
                <Popover.Root>
                    <Popover.Trigger asChild let:builder>
                        <Button
                            variant="outline"
                            class={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !fechaMostrarFinal && "text-muted-foreground",
                            )}
                            builders={[builder]}
                        >
                            <CalendarIcon class="mr-2 h-4 w-4" />
                            {fechaMostrarFinal
                                ? df.format(
                                      fechaMostrarFinal.toDate(
                                          getLocalTimeZone(),
                                      ),
                                  )
                                : "Selecciona la fecha final"}
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content class="w-auto p-0">
                        <Calendar
                            locale="es"
                            value={fechaMostrarFinal}
                            minValue={fechaMostrarInicial}
                            initialFocus
                            onValueChange={async (v) => {
                                if (v) {
                                    fechaMostrarFinal = v;
                                    fechaApiFinal = v
                                        .toDate(getLocalTimeZone())
                                        .toLocaleDateString("sv-SE");

                                    const respuesta = await fetch(
                                        `http://localhost:8000/api/balanza_comprobacion?fecha_inicial=${fechaApiInicial}&fecha_final=${fechaApiFinal}`,
                                    );
                                    const resultado = await respuesta.json();
                                    cuentas = resultado.datos.balanza;
                                    total = resultado.datos.total;
                                } else {
                                    fechaMostrarInicial = undefined;
                                }
                            }}
                        />
                    </Popover.Content>
                </Popover.Root>
            </div>
        </div>
    </Card.Header>
    <Card.Content>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">ID</Table.Head>
                    <Table.Head class="w-[100px]">Nombre</Table.Head>
                    <Table.Head>Deudora Anterior</Table.Head>
                    <Table.Head>Acreedora Anterior</Table.Head>
                    <Table.Head>Cargo</Table.Head>
                    <Table.Head>Abono</Table.Head>
                    <Table.Head>Saldo Deudor</Table.Head>
                    <Table.Head>Saldo Acreedor</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each cuentas as cuenta, i (i)}
                    <Table.Row>
                        <Table.Cell class="font-bold"
                            >{cuenta.cuenta}</Table.Cell
                        >
                        <Table.Cell>{cuenta.nombre}</Table.Cell>
                        <Table.Cell>{cuenta.deudora_anterior}</Table.Cell>
                        <Table.Cell>{cuenta.acreedora_anterior}</Table.Cell>
                        <Table.Cell>{cuenta.cargo}</Table.Cell>
                        <Table.Cell>{cuenta.abono}</Table.Cell>
                        <Table.Cell>{cuenta.saldo_deudor}</Table.Cell>
                        <Table.Cell>{cuenta.saldo_acreedor}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </Card.Content>
    <Card.Footer>
        <div class="font-bold">Total: ${total}</div>
    </Card.Footer>
</Card.Root>
