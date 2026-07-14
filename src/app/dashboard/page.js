import StatCard from '../components/StatCard'
import StatusDonutChart from '../components/StatusDonutChart'
import ExportPdfButton from '../components/ExportPdfButton'

const stats = [
    { label: 'Total Stagiaires', value: 42, icon: 'bi-people', color: '#1a3c6e' },
    { label: 'Actifs', value: 28, icon: 'bi-play-circle', color: '#16a34a' },
    { label: 'En attente', value: 9, icon: 'bi-hourglass-split', color: '#d97706' },
    { label: 'Terminés', value: 5, icon: 'bi-check-circle', color: '#6b7280' },
]

// Données statiques du tableau — remplacées plus tard par un fetch vers le backend
const recentInterns = [
    { id: 1, name: 'Amine Belhadj', department: 'IT', supervisor: 'M. Trabelsi', status: 'Active', startDate: '2026-06-01' },
    { id: 2, name: 'Salma Gharbi', department: 'Marketing', supervisor: 'Mme Fekih', status: 'Pending', startDate: '2026-07-15' },
    { id: 3, name: 'Youssef Cherif', department: 'IT', supervisor: 'M. Trabelsi', status: 'Completed', startDate: '2026-03-01' },
    { id: 4, name: 'Nour Jaziri', department: 'RH', supervisor: 'Mme Ammar', status: 'Active', startDate: '2026-05-20' },
    { id: 5, name: 'Karim Sassi', department: 'Finance', supervisor: 'M. Ouali', status: 'Terminated', startDate: '2026-02-10' },
]
const internColumns = [
    { key: 'name', header: 'Nom' },
    { key: 'department', header: 'Département' },
    { key: 'supervisor', header: 'Superviseur' },
    { key: 'status', header: 'Statut' },
    { key: 'startDate', header: 'Date de début' },
]

// Renvoie la couleur Bootstrap du badge selon le statut
function getStatusBadge(status) {
    const map = {
        Active: 'success',
        Pending: 'warning',
        Completed: 'secondary',
        Terminated: 'danger',
    }
    return map[status] || 'secondary'
}

export default function DashboardPage() {
    return (
        <div>
            <h1 style={{ color: '#1a3c6e', marginBottom: '1.5rem' }}>Dashboard</h1>

            <div className="row">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div style={{
                backgroundColor: 'white',
                display: 'flex',
                gap: '1rem',
                borderRadius: '10px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginTop: '1rem',
                alignItems: 'stretch',
            }}>
                <div style={{ flex: 2, paddingRight: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}>
                        <h5 style={{ color: '#1a3c6e', margin: 0 }}>Derniers stagiaires ajoutés</h5>
                        <ExportPdfButton
                            data={recentInterns}
                            columns={internColumns}
                            title="Liste des stagiaires"
                            fileName="stagiaires.pdf"
                        />
                    </div>
                    <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Département</th>
                            <th>Superviseur</th>
                            <th>Statut</th>
                            <th>Date de début</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentInterns.map((intern) => (
                            <tr key={intern.id}>
                                <td>{intern.name}</td>
                                <td>{intern.department}</td>
                                <td>{intern.supervisor}</td>
                                <td>
                                    <span className={`badge bg-${getStatusBadge(intern.status)}`}>
                                        {intern.status}
                                    </span>
                                </td>
                                <td>{intern.startDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
                    <div style={{
                        width: '100%',
                        borderRadius: '10px',
                        padding: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <h5 style={{ color: '#1a3c6e', marginBottom: '1rem' }}>Répartition des statuts</h5>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <StatusDonutChart />
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}