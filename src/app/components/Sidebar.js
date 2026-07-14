'use client'

import { useState } from 'react'
import Link from 'next/link'

const menuItems = [
    { icon: 'bi-speedometer2', label: 'Dashboard',    href: '/dashboard' },
    { icon: 'bi-people',       label: 'Stagiaires',   href: '/interns' },
    { icon: 'bi-check2-square',label: 'Tâches',       href: '/tasks' },
    { icon: 'bi-star',         label: 'Évaluations',  href: '/evaluations' },
    { icon: 'bi-file-earmark', label: 'Documents',    href: '/documents' },
    { icon: 'bi-bar-chart',    label: 'Rapports',     href: '/reports' },
    { icon: 'bi-gear',         label: 'Paramètres',   href: '/settings' },
]

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div style={{
            width: collapsed ? '70px' : '240px',
            minHeight: '100vh',
            backgroundColor: '#1a3c6e',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            flexShrink: 0,
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'space-between',
                padding: '1.2rem 1rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
                {!collapsed && (
                    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.5px' }}>
                        IMS
                    </span>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.8)',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: '4px',
                    }}
                >
                    <i className={`bi ${collapsed ? 'bi-layout-sidebar' : 'bi-layout-sidebar-reverse'}`}></i>
                </button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '0.85rem 1.2rem',
                                color: 'rgba(255,255,255,0.8)',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                justifyContent: collapsed ? 'center' : 'flex-start',
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <i className={`bi ${item.icon}`} style={{ fontSize: '1.1rem', minWidth: '20px', textAlign: 'center' }}></i>
                            {!collapsed && <span style={{ fontSize: '0.9rem' }}>{item.label}</span>}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* User info en bas */}
            {!collapsed && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '240px',
                    padding: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
                    <div>
                        <div style={{ color: 'white', fontWeight: '500' }}>Admin</div>
                        <div>admin@ims.tn</div>
                    </div>
                </div>
            )}
        </div>
    )
}