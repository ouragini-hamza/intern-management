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
                <Sidebar />
                {children}
            </body>
        </html>
    )
}