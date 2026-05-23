export default function EventCard() {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 14,
        margin: '20px 0',
        background: '#fafafa',
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        On campus this week
      </div>
      <h3 style={{ margin: '6px 0 4px', fontSize: 16 }}>
        African Students Association: Heritage Night
      </h3>
      <p style={{ margin: 0, color: '#555', fontSize: 14 }}>
        Friday, 7:00 PM · Collis Common Ground
      </p>
    </div>
  )
}
