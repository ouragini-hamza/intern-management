'use client'

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mêmes données que les StatCard (hors "Total", qui n'a pas de sens dans une répartition)
const data = [
    { name: 'Actifs', value: 28, color: '#16a34a' },
    { name: 'En attente', value: 9, color: '#d97706' },
    { name: 'Terminés', value: 5, color: '#6b7280' },
]

export default function StatusDonutChart() {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    )
}