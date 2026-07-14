'use client'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ExportPdfButton({ data, columns, title, fileName }) {
    const handleExport = () => {
        const doc = new jsPDF()

        // Titre en haut du PDF
        doc.setFontSize(14)
        doc.text(title, 14, 15)

        // Génère le tableau automatiquement à partir des colonnes/lignes
        autoTable(doc, {
            startY: 22,
            head: [columns.map((col) => col.header)],
            body: data.map((row) => columns.map((col) => row[col.key])),
        })

        doc.save(fileName)
    }

    return (
        <button
            onClick={handleExport}
            className="btn btn-sm"
            style={{ backgroundColor: '#1a3c6e', color: 'white' }}
        >
            <i className="bi bi-file-earmark-pdf me-2"></i>
            Exporter en PDF
        </button>
    )
}