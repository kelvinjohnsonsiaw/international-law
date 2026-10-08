export default function Practice({ c }) {
  const p = c.practice;
  if (!p) return <div className="box"><p>Exam practice for this chapter comes when it is rebuilt from the textbook.</p></div>;
  return (
    <div>
      <div className="box b"><h3>Test yourself</h3><ul>{p.self.map((q, i) => <li key={i}>{q}</li>)}</ul></div>
      <div className="box a"><h3>Essay and discussion prompts</h3><ul>{p.discuss.map((q, i) => <li key={i}>{q}</li>)}</ul></div>
      <details className="box case">
        <summary>{p.scenario.title}</summary>
        <p>{p.scenario.text}</p>
        <p><b>A way to structure your answer:</b></p>
        <ul>{p.scenario.outline.map((o, i) => <li key={i}>{o}</li>)}</ul>
      </details>
    </div>
  );
}
