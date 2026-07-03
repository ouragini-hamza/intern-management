export default function StatCard({ label, value, icon, color }) {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color,
                    fontSize: '1.4rem',
                    flexShrink: 0,
                }}>
                    <i className={`bi ${icon}`}></i>
                </div>
                <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1a3c6e' }}>
                        {value}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        {label}
                    </div>
                </div>
            </div>
        </div>
    )
}