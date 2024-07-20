import type jsPDF from "jspdf";

export const generarEncabezado = (doc: jsPDF) => {
	doc.setFont("Times-Roman", "normal");
	doc.setFontSize(8);
	doc.addImage("/logo.png", "PNG", 10, 10, 40, 10);
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
};
