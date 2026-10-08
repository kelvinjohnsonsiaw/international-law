export default function Learn({ c }) {
  return (
    <div>
      <div className="hero"><h2>{c.e} {c.t}</h2><p>{c.big}</p></div>
      <p style={{ color: "var(--mute)", fontSize: ".9rem" }}>{c.fromBook ? "✔ Rebuilt from the textbook" : "Draft: not yet checked against the textbook"}</p>
      <div className="box a"><h3>💡 Think of it like this</h3>{c.an}</div>
      <div className="box b">
        <h3>Key points</h3>
        <ul>{c.pts.map((p, i) => <li key={i} dangerouslySetInnerHTML={{ __html: p }} />)}</ul>
      </div>
    </div>
  );
}
