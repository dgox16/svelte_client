import jsPDF from "jspdf";
import { generarEncabezado } from "./reporteLayoutPdf";
import type { DetallePoliza } from "$lib/modelos/polizas/detallePoliza";
import type { Poliza } from "$lib/modelos/polizas/polizaBasica";
import autoTable from "jspdf-autotable";

export const generarPdf = (
	poliza: Poliza,
	detallesPoliza: Array<DetallePoliza>,
) => {
	const doc = new jsPDF();

	const generarCajasFirma = (doc: jsPDF, esEgreso: boolean) => {
		const posicionY = esEgreso ? 55 : 55;
		const anchoRectangulo = 55;
		const alturaRectangulo = 20;
		doc.setFont("Helvetica", "normal");
		doc.setFontSize(8);

		doc.rect(14, posicionY, anchoRectangulo, alturaRectangulo);
		doc.text("Recibe: Diego Armando Gomez Martinez", 15, posicionY + 19);

		doc.rect(77, posicionY, anchoRectangulo, alturaRectangulo);
		doc.text("Elaboro: Diego Armando Gomez Martinez", 78, posicionY + 19);

		doc.rect(141, posicionY, anchoRectangulo, alturaRectangulo);
		doc.text("Autorizo:", 142, posicionY + 19);
	};

	const generarTablaDetallesPoliza = (
		doc: jsPDF,
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
			startY: 80,
		});
	};

	generarEncabezado(doc);
	generarCajasFirma(doc, poliza.tipo === "Egreso");
	generarTablaDetallesPoliza(doc, detallesPoliza);

	doc.save("poliza.pdf");
};
