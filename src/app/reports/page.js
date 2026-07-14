'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatCard from '../components/StatCard'
import ExportPdfButton from '../components/ExportPdfButton'
import ExportExcelButton from '../components/ExportExcelButton'

const internsData = [
    { id: 1, name: 'Amine Belhadj', department: 'IT', supervisor: 'M. Trabelsi', status: 'Active', startDate: '2026-06-01' },
    { id: 2, name: 'Salma Gharbi', department: 'Marketing', supervisor: 'Mme Fekih', status: 'Pending', startDate: '2026-07-15' },
    { id: 3, name: 'Youssef Cherif', department: 'IT', supervisor: 'M. Trabelsi', status: 'Completed', startDate: '2026-03-01' },
    { id: 4, name: 'Nour Jaziri', department: 'RH', supervisor: 'Mme Ammar', status: 'Active', startDate: '2026-05-20' },
    { id: 5, name: 'Karim Sassi', department: 'Finance', supervisor: 'M. Ouali', status: 'Terminated', startDate: '2026-02-10' },
    { id: 6, name: 'Ines Mabrouk', department: 'IT', supervisor: 'Mme Ammar', status: 'Active', startDate: '2026-06-10' },
    { id: 7, name: 'Bilel Hamdi', department: 'Marketing', supervisor: 'M. Ouali', status: 'Pending', startDate: '2026-08-01' },
    { id: 8, name: 'Rania Toumi', department: 'Finance', supervisor: 'M. Trabelsi', status: 'Completed', startDate: '2026-01-05' },
]

const tasksData = [
    { id: 1, title: 'Conception de la base de données', internName: 'Amine Kacem', status: 'Terminé', dueDate: '2026-07-20' },
    { id: 2, title: "Développement du module d'authentification", internName: 'Sara Messaoudi', status: 'En cours', dueDate: '2026-07-25' },
    { id: 3, title: "Intégration de l'API de paiement", internName: 'Yassine Gharbi', status: 'À faire', dueDate: '2026-07-30' },
    { id: 4, title: 'Tests et correction des bugs', internName: 'Nour Ben Hamed', status: 'En cours', dueDate: '2026-07-28' },
    { id: 5, title: 'Rédaction de la documentation', internName: 'Mohamed Ali Ayari', status: 'À faire', dueDate: '2026-08-01' },
    { id: 6, title: "Déploiement de l'application", internName: 'Khaoula Jebali', status: 'Terminé', dueDate: '2026-07-15' },
]

const internColumns = [
    { key: 'name', header: 'Nom' },
    { key: 'department', header: 'Département' },
    { key: 'supervisor', header: 'Superviseur' },
    { key: 'status', header: 'Statut' },
    { key: 'startDate', header: 'Date de début' },
]

const taskColumns = [
    { key: 'title', header: 'Titre' },
    { key: 'internName', header: 'Stagiaire' },
    { key: 'status', header: 'Statut' },
    { key: 'dueDate', header: 'Date limite' },
]

function getBadgeColor(status) {
    const map = {
        Active: 'success', Pending: 'warning', Completed: 'secondary', Terminated: 'danger',
        'À faire': 'warning', 'En cours': 'primary', 'Terminé': 'success',
    }
    return map[status] || 'secondary'
}

export default function ReportsPage() {
    const [reportType, setReportType] = useState('interns')
    const [departmentFilter, setDepartmentFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')

    const sourceData = reportType === 'interns' ? internsData : tasksData
    const columns = reportType === 'interns' ? internColumns : taskColumns

    // Liste des départements disponibles, calculée à partir des données
    // (pas de département pour les tâches, donc ce filtre n'a de sens
    // que pour le rapport "Stagiaires")
    const departments = [...new Set(internsData.map((i) => i.department))]

    const filteredData = sourceData.filter((item) => {
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        const matchesDept =
            reportType === 'tasks' ||
            departmentFilter === 'all' ||
            item.department === departmentFilter
        return matchesStatus && matchesDept
    })

    const statusOptions = reportType === 'interns'
        ? ['Active', 'Pending', 'Completed', 'Terminated']
        : ['À faire', 'En cours', 'Terminé']

    const stats = statusOptions.map((status) => ({
        label: status,
        value: filteredData.filter((item) => item.status === status).length,
        icon: 'bi-circle-fill',
        color: `#${getBadgeColor(status) === 'success' ? '16a34a' : getBadgeColor(status) === 'warning' ? 'd97706' : getBadgeColor(status) === 'primary' ? '3b82f6' : getBadgeColor(status) === 'danger' ? 'dc2626' : '6b7280'}`,
    }))

    return (
        <div>
            <nav style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
                {' > '}
                <span>Rapports</span>
            </nav>
            <h1 style={{ color: '#1a3c6e', marginBottom: '1.5rem' }}>Rapports</h1>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: '1.5rem',
            }}>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <label className="form-label">Type de rapport</label>
                        <select
                            className="form-select"
                            value={reportType}
                            onChange={(e) => {
                                setReportType(e.target.value)
                                setStatusFilter('all')
                            }}
                        >
                            <option value="interns">Stagiaires</option>
                            <option value="tasks">Tâches</option>
                        </select>
                    </div>

                    {reportType === 'interns' && (
                        <div className="col-md-4 mb-2">
                            <label className="form-label">Département</label>
                            <select
                                className="form-select"
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                            >
                                <option value="all">Tous les départements</option>
                                {departments.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="col-md-4 mb-2">
                        <label className="form-label">Statut</label>
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginTop: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                }}>
                    <h5 style={{ color: '#1a3c6e', margin: 0 }}>
                        Détail — {reportType === 'interns' ? 'Stagiaires' : 'Tâches'}
                    </h5>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <ExportPdfButton
                            data={filteredData}
                            columns={columns}
                            title={`Rapport ${reportType === 'interns' ? 'Stagiaires' : 'Tâches'}`}
                            fileName={`rapport_${reportType}.pdf`}
                        />
                        <ExportExcelButton
                            data={filteredData}
                            columns={columns}
                            fileName={`rapport_${reportType}.xlsx`}
                        />
                    </div>
                </div>

                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.key === 'status' ? (
                                            <span className={`badge bg-${getBadgeColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        ) : (
                                            item[col.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredData.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#6b7280', margin: '1rem 0 0' }}>
                        Aucune donnée ne correspond à ces filtres.
                    </p>
                )}
            </div>
        </div>
    )
}