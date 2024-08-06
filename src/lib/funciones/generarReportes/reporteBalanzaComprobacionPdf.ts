import type { Cuenta } from "$lib/modelos/entidades/cuentas";
import jsPDF from "jspdf";
import { generarEncabezado } from "./reporteLayoutPdf";
import autoTable from "jspdf-autotable";

export const generarBalanzaComprobacionPdf = (cuentas, total: number) => {
	const doc = new jsPDF();

	const generarTablaDetallesPoliza = (doc: jsPDF, cuentas) => {
		const columnas = [
			{ encabezado: "ID", key: "id" },
			{ encabezado: "Deudora Anterior", key: "total" },
			{ encabezado: "Abono", key: "total_abono" },
			{ encabezado: "Cargo", key: "total_cargo" },
		];

		const datos = cuentas.map((fila) => ({
			id: fila.cuenta,
			total: fila.total,
			total_abono: fila.total_abono,
			total_cargo: fila.total_cargo,
		}));
		autoTable(doc, {
			head: [columnas.map((columna) => columna.encabezado)],
			body: datos.map((fila) =>
				columnas.map((columna) => fila[columna.key as keyof Cuenta]),
			),
			theme: "grid",
			styles: { halign: "center", fontSize: 9 },
			columnStyles: {
				0: { cellWidth: 20 },
				3: { cellWidth: 20 },
				4: { cellWidth: 20 },
			},
			headStyles: { fillColor: [0, 0, 0] },
			startY: 40,
		});
	};

	generarEncabezado(doc);
	doc.setFont("Times-Roman", "bold");
	doc.setFontSize(10);
	doc.text(`Total: $${total}`, 14, 34);
	if (cuentas) {
		generarTablaDetallesPoliza(doc, cuentas);
	}

	doc.save("balanzaComprobacion.pdf");
};
