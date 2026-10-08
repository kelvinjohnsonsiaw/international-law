import { useState, useEffect } from "react";

export default function Quiz({ c, onDone }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState(null);
  const q = c.quiz[qi];
  const pct = Math.round((score / c.quiz.length) * 100);

  useEffect(() => { if (!q && pct >= 75) onDone(); }, [qi]);

  if (!q) {
    return (
      <div className="box">
        <h2>{pct >= 75 ? "🎉 Well done!" : "Nearly there!"}</h2>
        <p>
          You scored {score} of {c.quiz.length} ({pct}%).{" "}
          {pct >= 75 ? "Chapter marked complete." : "Re-read the key points and try again. You need 75% to finish this chapter."}
        </p>
        <button className="btn" onClick={() => { setQi(0); setScore(0); setPick(null); }}>Try again</button>
      </div>
    );
  }

  const [question, correct, options, why] = q;
  const choose = (o) => {
    if (pick !== null) return;
    setPick(o);
    if (o === correct) setScore(score + 1);
  };

  return (
    <div className="box">
      <div className="row"><b>Question {qi + 1} of {c.quiz.length}</b></div>
      <h3 style={{ margin: "8px 0" }}>{question}</h3>
      {options.map((o) => (
        <button key={o} onClick={() => choose(o)}
          className={"opt" + (pick !== null && o === correct ? " ok" : pick === o ? " no" : "")}>
          {o}
        </button>
      ))}
      {pick !== null && (
        <div>
          <div className="why"><b>{pick === correct ? "Correct!" : "Not quite."}</b> {why}</div>
          <p>
            <button className="btn" onClick={() => { setQi(qi + 1); setPick(null); }}>
              {qi + 1 < c.quiz.length ? "Next question" : "See my score"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
