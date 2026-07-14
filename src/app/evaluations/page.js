'use client'

import { useState } from 'react'
import Link from 'next/link'
import StatCard from '../components/StatCard'
import Avatar from '../components/Avatar'
import StarRating from '../components/StarRating'
import EvaluationModal from '../components/EvaluationModal'
import ConfirmModal from '../components/ConfirmModal'

const initialEvaluations = [
    { id: 1, internName: 'Amine Kacem', evaluatorName: 'Mohamed Ali Ayari', periodStart: '2026-06-01', periodEnd: '2026-06-30', status: 'Terminée', score: 5, comment: 'Excellent travail.', evaluationDate: '2026-07-02' },
    { id: 2, internName: 'Sara Messaoudi', evaluatorName: 'Imen Trabelsi', periodStart: '2026-06-01', periodEnd: '2026-08-31', status: 'En cours', score: 4, comment: 'Bonne progression.', evaluationDate: '' },
    { id: 3, internName: 'Yassine Gharbi', evaluatorName: 'Karim Ben Saad', periodStart: '2026-05-15', periodEnd: '2026-08-15', status: 'En attente', score: 0, comment: '', evaluationDate: '' },
    { id: 4, internName: 'Nour Ben Hamed', evaluatorName: 'Mohamed Ali Ayari', periodStart: '2026-06-01', periodEnd: '2026-08-31', status: 'En cours', score: 4, comment: 'À surveiller sur les délais.', evaluationDate: '' },
]

function getStatusBadge(status) {
    const map = { 'En attente': 'warning', 'En cours': 'primary', 'Terminée': 'success' }
    return map[status] || 'secondary'
}

export default function EvaluationsPage() {
    const [evaluations, setEvaluations] = useState(initialEvaluations)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingEvaluation, setEditingEvaluation] = useState(null)
    const [formKey, setFormKey] = useState(0)

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [evaluationToDelete, setEvaluationToDelete] = useState(null)

    const filteredEvaluations = evaluations.filter((ev) => {
        const matchesSearch = ev.internName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || ev.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = [
        { label: 'Total Évaluations', value: evaluations.length, icon: 'bi-clipboard-check', color: '#1a3c6e' },
        { label: 'En attente', value: evaluations.filter((e) => e.status === 'En attente').length, icon: 'bi-hourglass-split', color: '#d97706' },
        { label: 'En cours', value: evaluations.filter((e) => e.status === 'En cours').length, icon: 'bi-arrow-repeat', color: '#3b82f6' },
        { label: 'Terminées', value: evaluations.filter((e) => e.status === 'Terminée').length, icon: 'bi-check-circle', color: '#16a34a' },
    ]

    const handleSaveEvaluation = (evaluation) => {
        setEvaluations((prev) => {
            const exists = prev.some((e) => e.id === evaluation.id)
            return exists
                ? prev.map((e) => (e.id === evaluation.id ? evaluation : e))
                : [...prev, evaluation]
        })
    }

    const openAddModal = () => {
        setEditingEvaluation(null)
        setFormKey((k) => k + 1)
        setIsFormOpen(true)
    }

    const openEditModal = (evaluation) => {
        setEditingEvaluation(evaluation)
        setFormKey((k) => k + 1)
        setIsFormOpen(true)
    }

    const openDeleteModal = (evaluation) => {
        setEvaluationToDelete(evaluation)
        setIsDeleteOpen(true)
    }

    const handleConfirmDelete = () => {
        setEvaluations((prev) => prev.filter((e) => e.id !== evaluationToDelete.id))
        setIsDeleteOpen(false)
    }

    return (
        <div>
            <nav style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
                {' > '}
                <span>Évaluations</span>
            </nav>
            <h1 style={{ color: '#1a3c6e', marginBottom: '1.5rem' }}>Évaluations</h1>

            <div className="row">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <h5 style={{ color: '#1a3c6e', margin: 0 }}>Liste des évaluations</h5>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher un stagiaire..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ minWidth: '200px' }}
                        />
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ minWidth: '160px' }}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="En attente">En attente</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminée">Terminée</option>
                        </select>
                        <button
                            className="btn"
                            style={{ backgroundColor: '#1a3c6e', color: 'white', whiteSpace: 'nowrap' }}
                            onClick={openAddModal}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Nouvelle évaluation
                        </button>
                    </div>
                </div>

                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Stagiaire</th>
                            <th>Évaluateur</th>
                            <th>Période</th>
                            <th>Statut</th>
                            <th>Score</th>
                            <th>Date d évaluation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvaluations.map((ev) => (
                            <tr key={ev.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <Avatar name={ev.internName} id={ev.id} />
                                        {ev.internName}
                                    </div>
                                </td>
                                <td>{ev.evaluatorName}</td>
                                <td>{ev.periodStart} → {ev.periodEnd}</td>
                                <td>
                                    <span className={`badge bg-${getStatusBadge(ev.status)}`}>
                                        {ev.status}
                                    </span>
                                </td>
                                <td>
                                    {ev.score > 0 ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <StarRating value={ev.score} editable={false} />
                                            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{ev.score}/5</span>
                                        </div>
                                    ) : (
                                        <span style={{ color: '#9ca3af' }}>—</span>
                                    )}
                                </td>
                                <td>{ev.evaluationDate || '—'}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => openEditModal(ev)} style={{ marginRight: '0.5rem' }}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(ev)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredEvaluations.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#6b7280', margin: '1rem 0 0' }}>
                        Aucune évaluation ne correspond à ta recherche.
                    </p>
                )}
            </div>

            <EvaluationModal
                key={formKey}
                isOpen={isFormOpen}
                evaluation={editingEvaluation}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveEvaluation}
            />

            <ConfirmModal
                isOpen={isDeleteOpen}
                message={evaluationToDelete ? `Supprimer l'évaluation de "${evaluationToDelete.internName}" ?` : ''}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}