'use client'

export default function ConfirmModal({ isOpen, message, onClose, onConfirm }) {
    if (!isOpen) return null

    return (
        <>
            <div
                onClick={onClose}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
            />
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1050, width: '100%', maxWidth: '400px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
                    <div style={{ padding: '1.5rem' }}>
                        <h5 style={{ color: '#1a3c6e', marginBottom: '1rem' }}>Confirmer la suppression</h5>
                        <p style={{ color: '#374151', margin: 0 }}>{message}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
                    </div>
                </div>
            </div>
        </>
    )
}