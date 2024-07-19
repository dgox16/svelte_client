<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { format } from "date-fns";
    import type { Poliza } from "$lib/modelos/polizas/polizaBasica";
    import Button from "$lib/components/ui/button/button.svelte";
    import jsPDF from "jspdf";
    export let poliza: Poliza;
    export let poliza_egreso;
    function generatePDF() {
        const doc = new jsPDF();

        // Agregar encabezado
        function generar_encabezado(doc) {
            doc.setFont("Times-Roman", "normal");
            doc.setFontSize(8);
            doc.addImage("/logo.png", "PNG", 10, 10, 40, 10); // Ajusta la posición y tamaño según sea necesario
            doc.text("INDEPENDENCIA 50, COLONIA CENTRO", 55, 12);
            doc.text(
                "RFC: CPF960517AP7, TEL: 442 2519700 www.florenciorosas.com",
                55,
                16,
            );
            doc.text(
                "CAJA POPULAR FLORENCIO ROSAS DE QUERETARO S.C. DE A.P. DE R.L. DE C.",
                55,
                20,
            );
        }

        // Agregar recuadros de firma
        function addSignatureBoxes(doc, isEgreso) {
            const y = isEgreso ? 250 : 260; // Ajusta la posición vertical según sea necesario
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8);

            // Recuadro 1
            doc.rect(10, y, 60, 20); // Ajusta la posición y tamaño según sea necesario
            doc.text("Recibe:", 12, y + 8);
            doc.text("Diego Armando Gomez Martinez", 12, y + 14);

            // Recuadro 2
            doc.rect(80, y, 60, 20); // Ajusta la posición y tamaño según sea necesario
            doc.text("Elaboro:", 82, y + 8);
            doc.text("Diego Armando Gomez Martinez", 82, y + 14);

            // Recuadro 3
            doc.rect(150, y, 60, 20); // Ajusta la posición y tamaño según sea necesario
            doc.text("Autorizo:", 152, y + 8);
        }

        // Agregar tabla de detalles
        function addTable(doc, data) {
            doc.setFontSize(9);
            doc.text("Sucursal", 10, 50);
            doc.text("Cuenta", 40, 50);
            doc.text("Nombre", 70, 50);
            doc.text("Concepto", 120, 50);
            doc.text("Cargo", 150, 50);
            doc.text("Abono", 180, 50);
            doc.line(10, 52, 200, 52); // Línea divisoria

            data.forEach((row, index) => {
                const y = 60 + index * 10;
                doc.text(row.sucursal, 10, y);
                doc.text(row.cuenta, 40, y);
                doc.text(row.nombre, 70, y);
                doc.text(row.concepto, 120, y);
                doc.text(row.cargo, 150, y);
                doc.text(row.abono, 180, y);
            });
        }

        // Datos de ejemplo
        const detallesPoliza = [
            {
                sucursal: "Sucursal 1",
                cuenta: "Cuenta 1",
                nombre: "Nombre 1",
                concepto: "Concepto 1",
                cargo: "100",
                abono: "50",
            },
            {
                sucursal: "Sucursal 2",
                cuenta: "Cuenta 2",
                nombre: "Nombre 2",
                concepto: "Concepto 2",
                cargo: "200",
                abono: "150",
            },
            // Agrega más datos según sea necesario
        ];

        generar_encabezado(doc);
        addSignatureBoxes(doc, false); // Cambia a true si es egreso
        addTable(doc, detallesPoliza);

        doc.save("poliza.pdf");
    }
</script>

<div class="flex flex-row justify-between items-center">
    <MainTitle
        titulo="Visualización de poliza"
        subtitulo="Puedes revisar todos los detalle de la poliza"
    />
    <Button variant="default" on:click={generatePDF}>Descargar en PDF</Button>
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
