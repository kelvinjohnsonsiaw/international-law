import { useState, useMemo } from "react";

const shuffle = (a) => {
  const b = [...a];
  for (let k = b.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [b[k], b[j]] = [b[j], b[k]];
  }
  return b;
};

export default function Revision({ all }) {
  const pool = useMemo(
    () => all.flatMap((c) => c.quiz.map((q) => ({ q: q[0], a: q[1], o: q[2], why: q[3], ch: c.n, ct: c.t }))),
    [all]
  );
  const [stage, setStage] = useState("setup");
  const [n, setN] = useState(20);
  const [qs, setQs] = useState([]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);

  const start = (list, count) => {
    setQs(shuffle(list).slice(0, count).map((q) => ({ ...q, opts: shuffle(q.o) })));
    setI(0); setPick(null); setScore(0); setMissed([]); setStage("quiz");
  };

  if (stage === "setup") {
    return (
      <div className="box">
        <h2>🔀 Mixed revision</h2>
        <p>Random questions from all {all.length} chapters, in a new order every time. Good for exam practice.</p>
        <p><b>How many questions?</b> ({pool.length} available)</p>
        <div className="tabs">
          {[10, 20, 30, 50].map((x) => (
            <button key={x} className={n === x ? "on" : ""} onClick={() => setN(x)}>{x}</button>
          ))}
        </div>
        <button className="btn" onClick={() => start(pool, n)}>Start revision</button>
      </div>
    );
  }

  const q = qs[i];
  if (!q) {
    const pct = Math.round((score / qs.length) * 100);
    return (
      <div className="box">
        <h2>{pct >= 75 ? "🎉 Great work!" : pct >= 50 ? "👍 Good progress" : "Keep going!"}</h2>
        <p>You scored {score} of {qs.length} ({pct}%).</p>
        {missed.length > 0 && (
          <div>
            <h3>Questions to revisit</h3>
            {missed.map((m, k) => (
              <div className="why" key={k} style={{ marginBottom: 10 }}>
                <b>{m.q}</b><br />
                Answer: {m.a}<br />
                <span style={{ color: "var(--mute)" }}>Chapter {m.ch}: {m.ct}. {m.why}</span>
              </div>
            ))}
          </div>
        )}
        <p style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {missed.length > 0 && <button className="btn" onClick={() => start(missed, missed.length)}>Retry missed ({missed.length})</button>}
          <button className="btn" onClick={() => setStage("setup")}>New quiz</button>
        </p>
      </div>
    );
  }

  const choose = (o) => {
    if (pick !== null) return;
    setPick(o);
    if (o === q.a) setScore(score + 1);
    else setMissed([...missed, q]);
  };

  return (
    <div className="box">
      <div className="row"><b>Question {i + 1} of {qs.length}</b><span className="tag">Ch {q.ch}: {q.ct}</span></div>
      <h3 style={{ margin: "8px 0" }}>{q.q}</h3>
      {q.opts.map((o) => (
        <button key={o} onClick={() => choose(o)}
          className={"opt" + (pick !== null && o === q.a ? " ok" : pick === o ? " no" : "")}>{o}</button>
      ))}
      {pick !== null && (
        <div>
          <div className="why"><b>{pick === q.a ? "Correct!" : "Not quite."}</b> {q.why}</div>
          <p><button className="btn" onClick={() => { setI(i + 1); setPick(null); }}>{i + 1 < qs.length ? "Next question" : "See my score"}</button></p>
        </div>
      )}
    </div>
  );
}
