import type { DetallePoliza } from "$lib/modelos/polizas/detallePoliza";
import type { Poliza } from "$lib/modelos/polizas/polizaBasica";
import { format } from "date-fns";
import fileSaver from "file-saver";
import * as XLSX from "xlsx";

export const generarExcel = (
	poliza: Poliza,
	polizaEgreso,
	detallesPoliza: Array<DetallePoliza>,
) => {
	// Datos del encabezado
	const encabezadoDatos = {
		titulo: "Reporte Poliza",
		general: poliza.id_poliza,
		sucursal: poliza.sucursal,
		numero: poliza.numero,
		tipo: poliza.tipo,
		fecha: format(new Date(poliza.fecha_poliza), "dd/MM/yyyy HH:mm:ss"),
		concepto: poliza.concepto,
	};

	// Crea una nueva hoja de trabajo
	const ws = XLSX.utils.json_to_sheet([]);

	// Añadir el encabezado a la hoja de trabajo
	const headerRows = [
		[encabezadoDatos.titulo, "", "", "", ""],
		["", "", "", "", ""],
		[
			"Concepto:",
			encabezadoDatos.concepto,
			"",
			"General:",
			encabezadoDatos.general,
		],
		["Tipo:", encabezadoDatos.tipo, "", "Numero:", encabezadoDatos.numero],
		[
			"Fecha:",
			encabezadoDatos.fecha,
			"",
			"Sucursal:",
			encabezadoDatos.sucursal,
		],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["Cuenta", "Concepto", "Sucursal", "Cargo", "Abono"],
	];

	XLSX.utils.sheet_add_aoa(ws, headerRows, { origin: "A1" });
	const datos = detallesPoliza.map((fila) => ({
		cuenta: fila.cuenta,
		concepto: fila.concepto,
		sucursal: fila.sucursal,
		cargo: fila.cargo,
		abono: fila.abono,
	}));

	// Añadir los datos de la tabla a la hoja de trabajo
	XLSX.utils.sheet_add_json(ws, datos, {
		origin: "A10",
		skipHeader: true,
	});
	const anchoColumna = [
		{ wch: 20 }, // Columna A (ID)
		{ wch: 30 }, // Columna D (Precio)
		{ wch: 10 }, // Columna B (Nombre)
		{ wch: 20 }, // Columna C (Cantidad)
		{ wch: 20 }, // Columna D (Precio)
	];

	ws["!cols"] = anchoColumna;

	// Crear un nuevo libro de trabajo y añadir la hoja de trabajo
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, "Reporte");

	// Exportar el archivo Excel
	const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	fileSaver.saveAs(
		new Blob([wbout], { type: "application/octet-stream" }),
		"reporte.xlsx",
	);
};
