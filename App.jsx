import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import chapters from "./data/chapters.js";
import { loadProgress, saveProgress } from "./storage.js";
import Learn from "./components/Learn.jsx";
import Cases from "./components/Cases.jsx";
import Cards from "./components/Cards.jsx";
import Quiz from "./components/Quiz.jsx";
import Practice from "./components/Practice.jsx";
import Revision from "./components/Revision.jsx";

const TABS = [["learn", "Learn", Learn], ["cases", "Case stories", Cases], ["cards", "Flashcards", Cards], ["quiz", "Quiz", Quiz], ["practice", "Exam practice", Practice], ["revision", "🔀 Mixed revision", Revision]];

export default function App() {
  const [ci, setCi] = useState(0);
  const [tab, setTab] = useState("learn");
  const [done, setDone] = useState(loadProgress().done || {});
  const c = chapters[ci];
  const count = Object.keys(done).length;
  const View = TABS.find((t) => t[0] === tab)[2];

  useEffect(() => { document.documentElement.style.setProperty("--c", c.c); }, [ci]);

  const markDone = () => { const d = { ...done, [ci]: 1 }; setDone(d); saveProgress({ done: d }); };
  const reset = () => { setDone({}); saveProgress({ done: {} }); };

  return (
    <>
      <Analytics />
      <div className="wrap">
        <header>
          <h1>International Law, made easy 🌍</h1>
          <p>Plain-English study notes, case stories, flashcards and quizzes. Take it one chapter at a time.</p>
          <div className="prog"><i style={{ width: (count / chapters.length) * 100 + "%" }} /></div>
          <div style={{ fontSize: ".85rem", color: "var(--mute)", marginTop: 4 }}>
            {count} of {chapters.length} chapters complete (quiz 75%+).
          </div>
        </header>

        <nav className="chaps" aria-label="Chapters">
          {chapters.map((x, i) => (
            <button key={i} className={i === ci ? "on" : ""} onClick={() => { setCi(i); setTab("learn"); }}>
              {done[i] ? "✅" : x.e} {x.n}. {x.t}
            </button>
          ))}
        </nav>

        <div className="tabs">
          {TABS.map(([id, label]) => (
            <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        <main><View key={tab === "revision" ? "revision" : ci + tab} c={c} all={chapters} onDone={markDone} /></main>
        <div>
          <a
            href="https://commerciallaw-reg.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
          >
            Commercial Law
          </a>
        </>
        <button className="reset" onClick={reset}>Reset my progress</button>
      </div>
    </>
  );
}
