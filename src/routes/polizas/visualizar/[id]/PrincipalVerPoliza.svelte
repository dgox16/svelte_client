<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { format } from "date-fns";
    import type { Poliza } from "$lib/modelos/polizas/polizaBasica";
    import Button from "$lib/components/ui/button/button.svelte";
    import { generarPdf } from "$lib/funciones/generarReportes/reportePolizaPdf";
    import { generarExcel } from "$lib/funciones/generarReportes/reportePolizaExcel";
    import type { DetallePoliza } from "$lib/modelos/polizas/detallePoliza";
    export let poliza: Poliza;
    export let polizaEgreso;
    export let detallesPoliza: Array<DetallePoliza>;
</script>

<div class="flex flex-row justify-between items-center">
    <MainTitle
        titulo="Visualización de poliza"
        subtitulo="Puedes revisar todos los detalle de la poliza"
    />
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
            <Button builders={[builder]} variant="default"
                >Descargar reportes</Button
            >
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-40">
            <DropdownMenu.Group>
                <DropdownMenu.Item
                    on:click={() => {
                        generarPdf(poliza, polizaEgreso, detallesPoliza);
                    }}>En PDF</DropdownMenu.Item
                >
                <DropdownMenu.Item
                    on:click={() => {
                        generarExcel(poliza, polizaEgreso, detallesPoliza);
                    }}>En Excel</DropdownMenu.Item
                >
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>
<div class="grid grid-cols-3 gap-4 mt-5">
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
                    </span>{polizaEgreso.beneficiario}</span
                >
                <span
                    ><span class="font-bold"
                        >Banco:
                    </span>{polizaEgreso.banco}</span
                >
                <span
                    ><span class="font-bold"
                        >Cheque:
                    </span>{polizaEgreso.cheque}</span
                >
            </div>
        </Card.Content>
    </Card.Root>
{/if}
