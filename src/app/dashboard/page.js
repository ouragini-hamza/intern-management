import StatCard from '../components/StatCard'

// Données statiques pour l'instant — seront remplacées par un appel API
// quand le backend Fastify + MongoDB sera prêt.
const stats = [
    { label: 'Total Stagiaires', value: 42, icon: 'bi-people', color: '#1a3c6e' },
    { label: 'Actifs', value: 28, icon: 'bi-play-circle', color: '#16a34a' },
    { label: 'En attente', value: 9, icon: 'bi-hourglass-split', color: '#d97706' },
    { label: 'Terminés', value: 5, icon: 'bi-check-circle', color: '#6b7280' },
]

export default function DashboardPage() {
    return (
        <div>
            <h1 style={{ color: '#1a3c6e', marginBottom: '1.5rem' }}>Dashboard</h1>
            <div className="row">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>
        </div>
    )
}