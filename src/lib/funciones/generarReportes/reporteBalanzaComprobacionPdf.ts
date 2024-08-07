import type { Cuenta } from "$lib/modelos/entidades/cuentas";
import jsPDF from "jspdf";
import { generarEncabezado } from "./reporteLayoutPdf";
import autoTable from "jspdf-autotable";

export const generarBalanzaComprobacionPdf = (
	cuentas,
	total: number,
	fechaInicial: String,
	fechaFinal: String,
) => {
	const doc = new jsPDF();

	const generarTablaDetallesPoliza = (doc: jsPDF, cuentas) => {
		const columnas = [
			{ encabezado: "ID", key: "id" },
			{ encabezado: "Nombre", key: "nombre" },
			{ encabezado: "Deudora Anterior", key: "deudora_anterior" },
			{ encabezado: "Acreedora Anterior", key: "acreedora_anterior" },
			{ encabezado: "Abono", key: "abono" },
			{ encabezado: "Cargo", key: "cargo" },
			{ encabezado: "Saldo Deudor", key: "saldo_deudor" },
			{ encabezado: "Saldo Acreedor", key: "saldo_acreedor" },
		];

		const datos = cuentas.map((fila) => ({
			id: fila.cuenta,
			nombre: fila.nombre,
			deudora_anterior: fila.deudora_anterior,
			acreedora_anterior: fila.acreedora_anterior,
			abono: fila.abono,
			cargo: fila.cargo,
			saldo_deudor: fila.saldo_deudor,
			saldo_acreedor: fila.saldo_acreedor,
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
	doc.text(`${fechaInicial} - ${fechaFinal}`, 160, 34);
	if (cuentas) {
		generarTablaDetallesPoliza(doc, cuentas);
	}

	doc.save("balanzaComprobacion.pdf");
};
