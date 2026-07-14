export default function SettingsLayout({ children }) {
    return (
        <main style={{
            flex: 1,
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f0f4f8',
            padding: '2rem',
            overflowY: 'auto',
        }}>
            {children}
        </main>
    )
}
