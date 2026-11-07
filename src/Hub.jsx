import { useEffect, useMemo, useState } from "react";
import { FEATURED, SECTIONS, hostOf } from "./sites.js";
import "./hub.css";

const FILTERS = [
  { id: "all", label: "Everything", icon: "✨", mood: "pastel" },
  ...SECTIONS.map(({ id, label, icon, mood }) => ({ id, label, icon, mood })),
];

const FLOATIES = ["💖", "🐰", "🪱", "✨", "🩵", "💛", "🐱", "🦦", "🌀", "🦀"];

const NIMBUS = [
  { mood: "happy", emoji: "😊", line: "purrrrrr" },
  { mood: "majestic", emoji: "👑", line: "I am above this." },
  { mood: "sassy", emoji: "💅", line: "talk to the paw." },
  { mood: "cuddles", emoji: "🧡", line: "come here, warm thing." },
  { mood: "mischief", emoji: "😼", line: "I regret nothing." },
  { mood: "purrlease", emoji: "🐾", line: "you're still talking?" },
  { mood: "really", emoji: "😑", line: "really. REALLY." },
  { mood: "awww", emoji: "🥹", line: "okay fine, I love you." },
  { mood: "mood", emoji: "🌧️", line: "don't look at me." },
];

// external worlds open in their own tab, so the portal stays open behind them
const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" };

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function readHash() {
  const h = window.location.hash.replace("#", "");
  return FILTERS.some((f) => f.id === h) ? h : "all";
}

function Card({ item }) {
  const status = item.locked ? "🔒 private" : item.soon ? "🌱 coming soon" : null;
  return (
    <article
      className={`card${item.soon ? " card-soon" : ""}`}
      style={{ "--c": item.color }}
    >
      <div className="card-blob" aria-hidden="true">{item.icon}</div>
      <div className="card-body">
        <h3 className="card-title">
          {item.soon ? (
            item.label
          ) : (
            <a className="card-link" href={item.url} {...NEW_TAB}>{item.label}</a>
          )}
        </h3>
        <p className="card-blurb">{item.blurb}</p>
        <div className="card-foot">
          <span className="card-host">{hostOf(item.url)}</span>
          {status && <span className="card-badge">{status}</span>}
        </div>
        {(item.race || item.extras) && (
          <div className="card-extras">
            {item.race && (
              <a className="chip-link" href={item.race} {...NEW_TAB}>race a friend 🏁</a>
            )}
            {item.extras?.map((x) => (
              <a key={x.url} className="chip-link" href={x.url} {...NEW_TAB}>{x.label}</a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Featured() {
  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="featured-art" aria-hidden="true">
        <span className="f-cheese">🧀</span>
        <span className="f-a">🐰</span>
        <span className="f-b">🐱</span>
        <span className="f-c">✨</span>
        <span className="f-d">💛</span>
      </div>
      <div className="featured-text">
        <div className="featured-kicker">✦ featured burrow ✦</div>
        <h2 id="featured-title" className="featured-title">{FEATURED.label}</h2>
        <p className="featured-blurb">{FEATURED.blurb} 💛</p>
        <div className="featured-actions">
          <a className="btn-main" href={FEATURED.url} {...NEW_TAB}>visit the burrow →</a>
          {FEATURED.extras.map((x) => (
            <a key={x.url} className="btn-soft" href={x.url} {...NEW_TAB}>{x.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Nimbus() {
  const [m, setM] = useState(() => pick(NIMBUS));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <button
      className="nimbus"
      onClick={() => { setM(pick(NIMBUS.filter((n) => n !== m))); setOpen(true); }}
      aria-label={`Nimbus is ${m.mood}. Tap to change his mood.`}
    >
      {open && (
        <span className="nimbus-bubble" key={m.mood}>
          <span className="nimbus-mood">nimbus is {m.mood}</span>
          <span className="nimbus-line">“{m.line}”</span>
        </span>
      )}
      <span className="nimbus-cat" aria-hidden="true">
        <span className="ear ear-l" /><span className="ear ear-r" />
        <span className="nimbus-face">{m.emoji}</span>
      </span>
    </button>
  );
}

function MiniSpiral() {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const t = i / 120, a = t * 6 * Math.PI, r = t * 44;
    d += `${i ? " L" : "M"} ${50 + r * Math.cos(a)} ${50 + r * Math.sin(a)}`;
  }
  return (
    <svg viewBox="0 0 100 100" className="mini-spiral" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Hub() {
  const [filter, setFilter] = useState(readHash);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onHash = () => setFilter(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const choose = (id) => {
    setFilter(id);
    history.replaceState(null, "", id === "all" ? window.location.pathname : `#${id}`);
  };

  const theme = FILTERS.find((f) => f.id === filter)?.mood ?? "pastel";

  useEffect(() => {
    const bg = theme === "neon" ? "#070a1a" : "#fff5fa";
    document.body.style.background = bg;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg);
  }, [theme]);

  const q = query.trim().toLowerCase();
  const sections = useMemo(() => {
    return SECTIONS
      .filter((s) => q || filter === "all" || s.id === filter)
      .map((s) => ({
        ...s,
        items: q
          ? s.items.filter((i) => `${i.label} ${i.blurb} ${i.url}`.toLowerCase().includes(q))
          : s.items,
      }))
      .filter((s) => s.items.length);
  }, [filter, q]);

  const total = SECTIONS.reduce((n, s) => n + s.items.length, 0) - 1; // TGC appears twice

  return (
    <div className="hub" data-theme={theme}>
      <div className="bg bg-pastel" aria-hidden="true" />
      <div className="bg bg-neon" aria-hidden="true" />
      <div className="floaties" aria-hidden="true">
        {FLOATIES.map((e, i) => (
          <span key={i} style={{ "--i": i, top: `${8 + ((i * 37) % 80)}%` }}>{e}</span>
        ))}
      </div>

      <div className="wrap">
        <header className="top">
          <h1 className="logo">
            shimmer<span>girl</span>sparkle<span>butt</span>
          </h1>
          <p className="tagline">
            everything we've made, all in one little burrow · {total} worlds and counting
          </p>
        </header>

        {filter === "all" && !q && <Featured />}

        <nav className="filters" aria-label="Filter the worlds">
          <div className="chips" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={`chip${filter === f.id ? " is-on" : ""}`}
                onClick={() => choose(f.id)}
              >
                <span aria-hidden="true">{f.icon}</span> {f.label}
              </button>
            ))}
          </div>
          <label className="search">
            <span aria-hidden="true">🔍</span>
            <input
              type="search"
              placeholder="find a world…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search all worlds"
            />
          </label>
        </nav>

        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={`section mood-${s.mood}${s.mood !== theme ? " band" : ""}`}
          >
            <div className="section-head">
              <h2>
                <span aria-hidden="true">{s.icon}</span> {s.label}
              </h2>
              <p>{s.blurb}</p>
            </div>
            <div className="grid">
              {s.items
                .filter((i) => !(filter === "all" && !q && i.id === "tgc"))
                .map((i) => <Card key={i.id} item={i} />)}
            </div>
          </section>
        ))}

        {!sections.length && (
          <p className="empty">nothing called “{query}” yet… but something is growing 🌱</p>
        )}

        <footer className="foot">
          <a className="og-link" href="/og">
            <MiniSpiral />
            <span>
              <strong>visit the OG spirals</strong>
              <small>the original portal, kept safe in the archive</small>
            </span>
          </a>
          <p className="kettle">the door is always open · the kettle is always on</p>
        </footer>
      </div>

      <Nimbus />
    </div>
  );
}
