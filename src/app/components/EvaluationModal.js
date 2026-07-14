'use client'

import { useState } from 'react'
import StarRating from './StarRating'

const statuses = ['En attente', 'En cours', 'Terminée']

const emptyForm = {
    internName: '',
    evaluatorName: '',
    periodStart: '',
    periodEnd: '',
    status: 'En attente',
    score: 0,
    comment: '',
    evaluationDate: '',
}

export default function EvaluationModal({ isOpen, evaluation, onClose, onSave }) {
    const [form, setForm] = useState(evaluation ? { ...emptyForm, ...evaluation } : emptyForm)

    if (!isOpen) return null

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({ ...form, id: evaluation ? evaluation.id : Date.now() })
        onClose()
    }

    return (
        <>
            <div
                onClick={onClose}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
            />
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050, width: '100%', maxWidth: '520px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                        <h5 style={{ margin: 0, color: '#1a3c6e' }}>
                            {evaluation ? "Modifier l'évaluation" : 'Nouvelle évaluation'}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ padding: '1.5rem' }}>
                            <div className="mb-3">
                                <label className="form-label">Stagiaire</label>
                                <input type="text" name="internName" className="form-control" value={form.internName} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Évaluateur</label>
                                <input type="text" name="evaluatorName" className="form-control" value={form.evaluatorName} onChange={handleChange} required />
                            </div>

                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label">Début période</label>
                                    <input type="date" name="periodStart" className="form-control" value={form.periodStart} onChange={handleChange} required />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Fin période</label>
                                    <input type="date" name="periodEnd" className="form-control" value={form.periodEnd} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Statut</label>
                                <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Score global</label>
                                <div>
                                    <StarRating
                                        value={form.score}
                                        editable
                                        onChange={(newScore) => setForm({ ...form, score: newScore })}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Commentaire du superviseur</label>
                                <textarea
                                    name="comment"
                                    className="form-control"
                                    rows={3}
                                    value={form.comment}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Date d évaluation</label>
                                <input type="date" name="evaluationDate" className="form-control" value={form.evaluationDate} onChange={handleChange} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                            <button type="submit" className="btn" style={{ backgroundColor: '#1a3c6e', color: 'white' }}>
                                {evaluation ? 'Enregistrer' : 'Ajouter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}