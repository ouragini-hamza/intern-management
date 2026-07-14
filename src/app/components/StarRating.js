'use client'

export default function StarRating({ value, onChange, editable = false }) {
    const stars = [1, 2, 3, 4, 5]

    return (
        <div style={{ display: 'inline-flex', gap: '2px' }}>
            {stars.map((star) => (
                <i
                    key={star}
                    className={`bi ${star <= value ? 'bi-star-fill' : 'bi-star'}`}
                    style={{
                        color: star <= value ? '#f59e0b' : '#d1d5db',
                        cursor: editable ? 'pointer' : 'default',
                        fontSize: '1.1rem',
                    }}
                    onClick={editable ? () => onChange(star) : undefined}
                />
            ))}
        </div>
    )
}