import jsPDF from "jspdf";
import { generarEncabezado } from "./reporteLayoutPdf";
import type { DetallePoliza } from "$lib/modelos/polizas/detallePoliza";
import type { Poliza } from "$lib/modelos/polizas/polizaBasica";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

export const generarPdf = (
	poliza: Poliza,
	polizaEgreso,
	detallesPoliza: Array<DetallePoliza>,
) => {
	const doc = new jsPDF();

	const generarCajasFirma = (doc: jsPDF, esEgreso: boolean) => {
		const posicionY = esEgreso ? 51 : 45;
		const anchoRectangulo = 55;
		const alturaRectangulo = 20;
		doc.setFont("Times-Roman", "normal");
		doc.setFontSize(7);

		doc.rect(14, posicionY, anchoRectangulo, alturaRectangulo);
		doc.text("Recibe: Diego Armando Gomez Martinez", 15, posicionY + 19);

		doc.rect(77, posicionY, anchoRectangulo, alturaRectangulo);
		doc.text("Elaboro: Diego Armando Gomez Martinez", 78, posicionY + 19);

		doc.rect(141, posicionY, anchoRectangulo, alturaRectangulo);
		doc.text("Autorizo:", 142, posicionY + 19);
	};

	const generarTablaDetallesPoliza = (
		doc: jsPDF,
		esEgreso: boolean,
		detallesPoliza: Array<DetallePoliza>,
	) => {
		const columnas = [
			{ encabezado: "Sucursal", key: "sucursal" },
			{ encabezado: "Cuenta", key: "cuenta" },
			{ encabezado: "Concepto", key: "concepto" },
			{ encabezado: "Cargo", key: "cargo" },
			{ encabezado: "Abono", key: "abono" },
		];

		const datos = detallesPoliza.map((fila) => ({
			sucursal: fila.sucursal,
			cuenta: fila.cuenta,
			concepto: fila.concepto,
			cargo: fila.cargo,
			abono: fila.abono,
		}));
		autoTable(doc, {
			head: [columnas.map((columna) => columna.encabezado)],
			body: datos.map((fila) =>
				columnas.map((columna) => fila[columna.key as keyof DetallePoliza]),
			),
			theme: "grid",
			styles: { halign: "center", fontSize: 9 },
			columnStyles: {
				0: { cellWidth: 20 },
				3: { cellWidth: 20 },
				4: { cellWidth: 20 },
			},
			headStyles: { fillColor: [0, 0, 0] },
			startY: esEgreso ? 76 : 70,
		});
	};

	const generarParteBasica = (doc: jsPDF, poliza: Poliza) => {
		doc.setFontSize(10);
		doc.text(`General: ${poliza.id_poliza}`, 14, 34);
		doc.text(`Sucursal: ${poliza.sucursal}`, 34, 34);
		doc.text(`Numero: ${poliza.numero}`, 60, 34);
		doc.text(`Tipo: ${poliza.tipo}`, 80, 34);
		doc.text(
			`Fecha: ${format(new Date(poliza.fecha_poliza), "dd/MM/yyyy HH:mm:ss")}`,
			105,
			34,
		);
		if (poliza.tipo === "Egreso") {
			doc.text(`Cheque: ${polizaEgreso.cheque}`, 14, 40);
			doc.text(`Beneficiario: ${polizaEgreso.beneficiario}`, 54, 40);
		}
		doc.text(
			`Concepto: ${poliza.concepto}`,
			14,
			poliza.tipo === "Egreso" ? 46 : 40,
		);
	};

	generarEncabezado(doc);
	generarParteBasica(doc, poliza);
	generarCajasFirma(doc, poliza.tipo === "Egreso");
	if (detallesPoliza) {
		generarTablaDetallesPoliza(doc, poliza.tipo === "Egreso", detallesPoliza);
	}

	doc.save("poliza.pdf");
};
