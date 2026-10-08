export default function Cases({ c }) {
  return (
    <div>
      {c.cases.map((k, i) => (
        <details key={i} className="box case" open={i === 0}>
          <summary>{k[0]}</summary>
          <p><span className="tag">{k[1]}</span></p>
          <p><b>What happened:</b> {k[2]}</p>
          <p><b>Why it matters:</b> {k[3]}</p>
        </details>
      ))}
    </div>
  );
}
