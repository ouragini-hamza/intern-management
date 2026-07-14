function getInitials(name) {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
}

const colors = ['#1a3c6e', '#16a34a', '#d97706', '#7c3aed', '#dc2626', '#0891b2']

function getColorFromId(id) {
    return colors[id % colors.length]
}

export default function Avatar({ name, id }) {
    return (
        <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: getColorFromId(id),
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            flexShrink: 0,
        }}>
            {getInitials(name)}
        </div>
    )
}