import { useState, useEffect, useRef } from "react";

// What the voice reads for one case
const say = (k) => `${k[0]}. ${k[1]}. What happened. ${k[2]} Why it matters. ${k[3]}`;

export default function Cases({ c }) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const [cur, setCur] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState("");
  const run = useRef(0);
  const rateRef = useRef(1);
  const voiceRef = useRef("");
  rateRef.current = rate;
  voiceRef.current = voice;

  useEffect(() => {
    if (!synth) return;
    const load = () => setVoices(synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en")));
    load();
    synth.addEventListener && synth.addEventListener("voiceschanged", load);
    return () => {
      synth.removeEventListener && synth.removeEventListener("voiceschanged", load);
      run.current++;
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    if (cur >= 0) {
      const el = document.getElementById("case-" + cur);
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [cur]);

  // Reads one case at a time (long texts get cut off in some browsers)
  const play = (start, single = false) => {
    if (!synth) return;
    synth.cancel();
    const id = ++run.current;
    setPaused(false);
    const next = (k) => {
      if (id !== run.current) return;
      if (k >= c.cases.length) { setCur(-1); return; }
      setCur(k);
      const u = new SpeechSynthesisUtterance(say(c.cases[k]));
      u.rate = rateRef.current;
      const v = synth.getVoices().find((x) => x.name === voiceRef.current);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
      u.onend = () => { if (id === run.current) { if (single) setCur(-1); else next(k + 1); } };
      u.onerror = () => { if (id === run.current) setCur(-1); };
      synth.speak(u);
    };
    next(start);
  };
  const stop = () => { run.current++; synth.cancel(); setCur(-1); setPaused(false); };
  const pause = () => { synth.pause(); setPaused(true); };
  const resume = () => { synth.resume(); setPaused(false); };

  return (
    <div>
      {synth ? (
        <div className="box b">
          <h3>🎧 Listen to the cases</h3>
          <p style={{ margin: "4px 0 10px" }}>
            {cur >= 0 ? `Reading case ${cur + 1} of ${c.cases.length}: ${c.cases[cur][0]}` : `${c.cases.length} cases in this chapter. Press play and she can just listen.`}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {cur < 0 && <button className="btn" onClick={() => play(0)}>▶ Play all</button>}
            {cur >= 0 && !paused && <button className="btn" onClick={pause}>⏸ Pause</button>}
            {cur >= 0 && paused && <button className="btn" onClick={resume}>▶ Resume</button>}
            {cur >= 0 && <button className="btn" onClick={() => play(Math.max(0, cur - 1))}>⏮ Back</button>}
            {cur >= 0 && <button className="btn" onClick={() => play(cur + 1)}>⏭ Next</button>}
            {cur >= 0 && <button className="btn" onClick={stop}>⏹ Stop</button>}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10, fontSize: ".9rem" }}>
            <label>Speed{" "}
              <select value={rate} onChange={(e) => setRate(+e.target.value)}>
                {[0.8, 1, 1.2, 1.5].map((r) => <option key={r} value={r}>{r}x</option>)}
              </select>
            </label>
            {voices.length > 0 && (
              <label>Voice{" "}
                <select value={voice} onChange={(e) => setVoice(e.target.value)}>
                  <option value="">Default</option>
                  {voices.map((v) => <option key={v.name} value={v.name}>{v.name}</option>)}
                </select>
              </label>
            )}
          </div>
        </div>
      ) : (
        <div className="box"><p>Audio isn't supported in this browser. Try Chrome, Edge or Safari.</p></div>
      )}
      {c.cases.map((k, i) => (
        <details key={i} id={"case-" + i} className={"box case" + (cur === i ? " reading" : "")} open={i === 0 || cur === i}>
          <summary>{k[0]}</summary>
          <p><span className="tag">{k[1]}</span></p>
          <p><b>What happened:</b> {k[2]}</p>
          <p><b>Why it matters:</b> {k[3]}</p>
          {synth && <button className="btn" onClick={() => play(i, true)}>🔊 Listen to this case</button>}
        </details>
      ))}
    </div>
  );
}
