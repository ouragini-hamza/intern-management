import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import Sidebar from './components/Sidebar'

export const metadata = {
    title: 'Intern Management System',
    description: 'Gestion des stagiaires',
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body>
                <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
                    <Sidebar />
                    <div style={{ flex: 1 }}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}
