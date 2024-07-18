<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { format } from "date-fns";
    import type { Poliza } from "$lib/modelos/polizas/polizaBasica";
    export let poliza: Poliza;
    export let poliza_egreso;
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
