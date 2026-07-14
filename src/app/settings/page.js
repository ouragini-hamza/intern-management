'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = [
    { id: 'profile', label: 'Profil', icon: 'bi-person' },
    { id: 'notifications', label: 'Notifications', icon: 'bi-bell' },
    { id: 'departments', label: 'Départements', icon: 'bi-building' },
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <div>
            <nav style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
                {' > '}
                <span>Paramètres</span>
            </nav>
            <h1 style={{ color: '#1a3c6e', marginBottom: '1.5rem' }}>Paramètres</h1>

            <div className="row">
                {/* Colonne gauche : menu des onglets */}
                <div className="col-md-3 mb-4">
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        overflow: 'hidden',
                    }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.9rem 1.2rem',
                                    border: 'none',
                                    backgroundColor: activeTab === tab.id ? '#1a3c6e' : 'white',
                                    color: activeTab === tab.id ? 'white' : '#374151',
                                    fontWeight: activeTab === tab.id ? '600' : '400',
                                    cursor: 'pointer',
                                }}
                            >
                                <i className={`bi ${tab.icon}`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Colonne droite : contenu de l'onglet actif */}
                <div className="col-md-9 mb-4">
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        padding: '1.75rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                        {activeTab === 'profile' && <ProfileSection />}
                        {activeTab === 'notifications' && <NotificationsSection />}
                        {activeTab === 'departments' && <DepartmentsSection />}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------- Section 1 : Profil ----------

function ProfileSection() {
    const [form, setForm] = useState({
        fullName: 'Ahmed Ben Ali',
        email: 'ahmed.benali@ims.tn',
        role: 'HR Manager',
    })
    const [saved, setSaved] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setSaved(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaved(true)
    }

    return (
        <div>
            <h5 style={{ color: '#1a3c6e', marginBottom: '1.25rem' }}>Informations du profil</h5>

            {saved && (
                <div className="alert alert-success py-2" role="alert">
                    Profil mis à jour.
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ maxWidth: '420px' }}>
                <div className="mb-3">
                    <label className="form-label">Nom complet</label>
                    <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rôle</label>
                    <select name="role" className="form-select" value={form.role} onChange={handleChange}>
                        <option>Administrator</option>
                        <option>HR Manager</option>
                        <option>Supervisor</option>
                    </select>
                </div>
                <button type="submit" className="btn" style={{ backgroundColor: '#1a3c6e', color: 'white' }}>
                    Enregistrer
                </button>
            </form>
        </div>
    )
}

// ---------- Section 2 : Notifications ----------

const initialPreferences = [
    { id: 'newTask', label: 'Nouvelle tâche assignée', enabled: true },
    { id: 'evalReminder', label: "Rappel d'évaluation à venir", enabled: true },
    { id: 'internshipEnding', label: 'Fin de stage imminente', enabled: false },
    { id: 'newDocument', label: 'Nouveau document ajouté', enabled: false },
]

function NotificationsSection() {
    const [preferences, setPreferences] = useState(initialPreferences)

    const togglePreference = (id) => {
        setPreferences((prev) =>
            prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
        )
    }

    return (
        <div>
            <h5 style={{ color: '#1a3c6e', marginBottom: '1.25rem' }}>Préférences de notifications</h5>

            {preferences.map((pref) => (
                <div
                    key={pref.id}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.85rem 0',
                        borderBottom: '1px solid #e5e7eb',
                    }}
                >
                    <span style={{ color: '#374151' }}>{pref.label}</span>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={pref.enabled}
                            onChange={() => togglePreference(pref.id)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

// ---------- Section 3 : Départements ----------

function DepartmentsSection() {
    const [departments, setDepartments] = useState(['IT', 'Marketing', 'RH', 'Finance'])
    const [newDept, setNewDept] = useState('')

    const handleAdd = (e) => {
        e.preventDefault()
        const trimmed = newDept.trim()
        if (!trimmed) return
        if (departments.includes(trimmed)) return // évite les doublons
        setDepartments((prev) => [...prev, trimmed])
        setNewDept('')
    }

    const handleRemove = (dept) => {
        setDepartments((prev) => prev.filter((d) => d !== dept))
    }

    return (
        <div>
            <h5 style={{ color: '#1a3c6e', marginBottom: '1.25rem' }}>Gestion des départements</h5>

            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', maxWidth: '420px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nom du département..."
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                />
                <button type="submit" className="btn" style={{ backgroundColor: '#1a3c6e', color: 'white', whiteSpace: 'nowrap' }}>
                    <i className="bi bi-plus-lg"></i>
                </button>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {departments.map((dept) => (
                    <span
                        key={dept}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: '#f0f4f8',
                            color: '#1a3c6e',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                        }}
                    >
                        {dept}
                        <i
                            className="bi bi-x-circle"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRemove(dept)}
                        ></i>
                    </span>
                ))}
            </div>

            {departments.length === 0 && (
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Aucun département pour l'instant.</p>
            )}
        </div>
    )
}