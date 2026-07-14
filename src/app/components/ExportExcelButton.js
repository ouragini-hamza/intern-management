'use client'

import * as XLSX from 'xlsx'

export default function ExportExcelButton({ data, columns, fileName }) {
    const handleExport = () => {
        // Transforme chaque ligne en objet avec des clés lisibles
        // (les en-têtes de colonnes), au lieu des clés techniques (name, dept...)
        const rows = data.map((row) => {
            const obj = {}
            columns.forEach((col) => {
                obj[col.header] = row[col.key]
            })
            return obj
        })

        const worksheet = XLSX.utils.json_to_sheet(rows)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Rapport')
        XLSX.writeFile(workbook, fileName)
    }

    return (
        <button onClick={handleExport} className="btn btn-sm btn-outline-success">
            <i className="bi bi-file-earmark-excel me-2"></i>
            Exporter en Excel
        </button>
    )
}