import { useState } from "react";

export default function Cards({ c }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const n = c.cards.length;
  const go = (d) => { setFlipped(false); setI((i + d + n) % n); };
  const [front, back] = c.cards[i];
  return (
    <div>
      <button className={"flash" + (flipped ? " f" : "")} onClick={() => setFlipped(!flipped)} aria-label="Flip card">
        <div className="fi"><div className="q">{front}</div><div className="ans">{back}</div></div>
      </button>
      <div className="row">
        <button className="btn" onClick={() => go(-1)}>Back</button>
        <span>{i + 1} / {n}. Tap to flip</span>
        <button className="btn" onClick={() => go(1)}>Next</button>
      </div>
    </div>
  );
}
