'use client'

import { useState } from 'react'

const docTypes = ['CV', 'Convention de stage', 'Autre']

const emptyForm = {
    name: '',
    type: 'CV',
    internName: '',
    fileSize: '',
    fileUrl: null,
}

function formatFileSize(bytes) {
    const kb = bytes / 1024
    if (kb < 1024) return `${Math.round(kb)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
}

export default function DocumentModal({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState(emptyForm)

    if (!isOpen) return null

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setForm({
            ...form,
            name: file.name,
            fileSize: formatFileSize(file.size),
            fileUrl: URL.createObjectURL(file),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.fileUrl) {
            alert('Merci de choisir un fichier avant de valider.')
            return
        }
        onSave({ ...form, id: Date.now(), uploadDate: new Date().toISOString().slice(0, 10) })
        setForm(emptyForm)
        onClose()
    }

    return (
        <>
            <div
                onClick={onClose}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
            />
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050, width: '100%', maxWidth: '480px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                        <h5 style={{ margin: 0, color: '#1a3c6e' }}>Ajouter un document</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ padding: '1.5rem' }}>
                            <div className="mb-3">
                                <label className="form-label">Fichier</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                    required
                                />
                                {form.name && (
                                    <div style={{ fontSize: '0.85rem', color: '#16a34a', marginTop: '0.4rem' }}>
                                        <i className="bi bi-check-circle me-1"></i>
                                        {form.name} ({form.fileSize})
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Type de document</label>
                                <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                                    {docTypes.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Stagiaire concerné</label>
                                <input
                                    type="text"
                                    name="internName"
                                    className="form-control"
                                    value={form.internName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                            <button type="submit" className="btn" style={{ backgroundColor: '#1a3c6e', color: 'white' }}>
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}