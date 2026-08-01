import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  Landmark, Palette, GraduationCap, HeartHandshake, Compass, Scale,
  Users, Trophy, MapPin, ArrowRight, ArrowUpRight, Menu, X,
  Sparkles, Feather, Building2, Globe2, Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Brand mark — il gabbiano di Collisioni                            */
/* ------------------------------------------------------------------ */
function Gull({ className = "", stroke = "currentColor", style }: { className?: string; stroke?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 70" className={className} style={style} fill="none" aria-hidden="true">
      <path
        d="M6 46C30 44 46 34 58 12c1.2-2.2 3.4-2.2 4.6 0C74.6 34 90 44 114 46 90 47.4 74 55 62 74 50 55 34 47.4 6 46Z"
        fill={stroke}
      />
    </svg>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 select-none" aria-label="Collisioni ETS — home">
      <span
        className="grid place-items-center rounded-xl"
        style={{ width: 40, height: 40, background: dark ? "rgba(255,255,255,0.08)" : "#101a22" }}
      >
        <Gull className="w-6" stroke={dark ? "#e6e9ec" : "#f6f2ea"} />
      </span>
      <span className="leading-none">
        <span
          className="font-display block"
          style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "0.01em", color: dark ? "#fff" : "var(--ink)" }}
        >
          Collisioni
        </span>
        <span
          className="block"
          style={{ fontSize: "0.62rem", letterSpacing: "0.34em", fontWeight: 600, color: dark ? "rgba(255,255,255,0.6)" : "var(--sea)" }}
        >
          ETS · CARINI
        </span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper                                           */
/* ------------------------------------------------------------------ */
function Reveal({ children, className = "", delay = "" }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
const NAV = [
  { href: "#chi-siamo", label: "Chi siamo" },
  { href: "#ambiti", label: "Ambiti" },
  { href: "#progetti", label: "Progetti" },
  { href: "#rete", label: "Rete" },
  { href: "#contatti", label: "Contatti" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all"
      style={{
        background: scrolled ? "rgba(246,242,234,0.85)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="container-x flex items-center justify-between" style={{ height: 74 }}>
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-underline text-sm font-medium" style={{ color: "var(--ink-soft)" }}>
              {n.label}
            </a>
          ))}
          <a href="#contatti" className="btn btn-primary" style={{ padding: "0.6rem 1.3rem" }}>
            Sostieni <ArrowUpRight size={16} />
          </a>
        </nav>
        <button className="md:hidden grid place-items-center" style={{ width: 44, height: 44 }} onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden container-x pb-5" style={{ background: "rgba(246,242,234,0.97)", backdropFilter: "blur(12px)" }}>
          <div className="flex flex-col gap-1 pt-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 border-b text-base font-medium" style={{ borderColor: "var(--line)" }}>
                {n.label}
              </a>
            ))}
            <a href="#contatti" onClick={() => setOpen(false)} className="btn btn-primary mt-4 justify-center">Sostieni Collisioni</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section id="top" className="hero-wash grain relative overflow-hidden">
      {/* floating gulls */}
      <Gull className="w-24 absolute opacity-[0.08] gull-drift" style={{ top: "18%", right: "8%", color: "var(--sea)" }} />
      <Gull className="w-16 absolute opacity-[0.1] gull-float" style={{ top: "34%", left: "6%", color: "var(--coral)" }} />
      <Gull className="w-12 absolute opacity-[0.08] gull-drift" style={{ bottom: "16%", right: "22%", color: "var(--ink)" }} />

      <div className="container-x relative" style={{ paddingTop: 150, paddingBottom: 110 }}>
        <div className="max-w-4xl">
          <Reveal>
            <span className="chip">
              <Sparkles size={14} className="text-coral" /> Ente del Terzo Settore · Carini (PA)
            </span>
          </Reveal>
          <Reveal delay="d1">
            <h1 className="font-display mt-6" style={{ fontWeight: 700, lineHeight: 1.02, fontSize: "clamp(2.7rem, 7vw, 5.4rem)", letterSpacing: "-0.02em" }}>
              Dove le persone,<br />le idee e i luoghi<br />
              <span className="collision-text">si incontrano.</span>
            </h1>
          </Reveal>
          <Reveal delay="d2">
            <p className="mt-7 text-lg md:text-xl max-w-2xl" style={{ color: "var(--ink-soft)" }}>
              <strong>Collisioni ETS</strong> è un'associazione culturale che anima Carini e il suo territorio:
              custodiamo il patrimonio storico, creiamo cultura condivisa e costruiamo comunità.
              Ogni incontro è una piccola, felice collisione.
            </p>
          </Reveal>
          <Reveal delay="d3">
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#progetti" className="btn btn-primary">Scopri i progetti <ArrowRight size={17} /></a>
              <a href="#chi-siamo" className="btn btn-ghost">Chi siamo</a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* collision bar */}
      <div className="collision-bar" style={{ height: 5 }} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const STATS = [
  { n: "1.000+", l: "visitatori al Presepe Vivente" },
  { n: "2024", l: "anno di fondazione" },
  { n: "13", l: "ambiti statutari di attività" },
  { n: "Carini", l: "cuore delle nostre attività" },
];
function Stats() {
  return (
    <section className="bg-night grain relative" style={{ color: "#fff" }}>
      <div className="container-x" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={`d${i + 1}` as string} className="text-center md:text-left">
              <div className="font-display collision-text" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,2.9rem)", lineHeight: 1 }}>{s.n}</div>
              <div className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.62)" }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Chi siamo                                                          */
/* ------------------------------------------------------------------ */
function ChiSiamo() {
  const pillars = [
    { icon: Landmark, t: "Custodire", d: "Ci prendiamo cura del patrimonio storico, artistico e paesaggistico di Carini — a partire dal suo Castello normanno." },
    { icon: Palette, t: "Creare", d: "Produciamo eventi, rievocazioni e percorsi culturali che rendono la storia viva, accessibile ed emozionante." },
    { icon: Users, t: "Connettere", d: "Mettiamo in rete persone, generazioni e associazioni: la cultura come strumento di comunità e inclusione." },
  ];
  return (
    <section id="chi-siamo" className="section relative">
      <div className="container-x">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow text-sea">Chi siamo</span>
              <div className="rule collision-bar mt-3 mb-6" />
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.08, letterSpacing: "-0.01em" }}>
                Un'associazione nata per far incontrare mondi diversi.
              </h2>
            </Reveal>
            <Reveal delay="d2">
              <p className="mt-6 text-lg" style={{ color: "var(--ink-soft)" }}>
                Costituita nel 2024 e iscritta al RUNTS, <strong>Collisioni ETS</strong> opera senza scopo di lucro
                per finalità civiche, solidaristiche e di utilità sociale. Il nostro nome racconta la nostra idea di
                cultura: l'energia che si sprigiona quando storie, competenze e comunità <em>collidono</em>.
              </p>
            </Reveal>
            <Reveal delay="d3">
              <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl" style={{ background: "var(--paper-2)", border: "1px solid var(--line)" }}>
                <Feather className="text-coral shrink-0" size={26} />
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  Il nostro simbolo è un <strong>gabbiano</strong>: libertà, orizzonti aperti, il coraggio di volare più in alto.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-1 gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={`d${i + 1}`}>
                <div className="card p-7 flex gap-5 items-start">
                  <span className="grid place-items-center rounded-xl shrink-0" style={{ width: 52, height: 52, background: "var(--paper-2)", color: "var(--sea)" }}>
                    <p.icon size={26} />
                  </span>
                  <div>
                    <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1.35rem" }}>{p.t}</h3>
                    <p className="mt-1.5" style={{ color: "var(--ink-soft)" }}>{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Ambiti (sectors)                                                   */
/* ------------------------------------------------------------------ */
const AMBITI = [
  { icon: Landmark, t: "Patrimonio culturale", d: "Tutela e valorizzazione del patrimonio storico, artistico e del paesaggio (D.Lgs. 42/2004)." },
  { icon: Palette, t: "Cultura & arte", d: "Organizzazione di attività culturali, artistiche e ricreative di interesse sociale." },
  { icon: GraduationCap, t: "Educazione", d: "Formazione extra-scolastica e contrasto alla dispersione e alla povertà educativa." },
  { icon: HeartHandshake, t: "Interventi sociali", d: "Servizi e interventi a favore delle persone e delle comunità (L. 328/2000)." },
  { icon: Compass, t: "Turismo di comunità", d: "Attività turistiche di interesse sociale, culturale e religioso sul territorio." },
  { icon: Scale, t: "Legalità & beni comuni", d: "Riqualificazione di beni pubblici e confiscati e promozione della cultura della legalità." },
  { icon: Globe2, t: "Accoglienza", d: "Accoglienza umanitaria e integrazione sociale delle persone migranti." },
  { icon: Trophy, t: "Sport per tutti", d: "Promozione di attività sportive dilettantistiche come occasione di incontro." },
];
function Ambiti() {
  return (
    <section id="ambiti" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-coral">Cosa facciamo</span>
          <div className="rule collision-bar mt-3 mb-6" />
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.08 }}>
            Otto ambiti, una sola direzione: la comunità.
          </h2>
          <p className="mt-5 text-lg" style={{ color: "var(--ink-soft)" }}>
            Il nostro Statuto ci abilita a operare su molti fronti. Li teniamo insieme con un metodo semplice:
            partire dai luoghi e dalle persone di Carini.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {AMBITI.map((a, i) => (
            <Reveal key={a.t} delay={`d${(i % 4) + 1}`}>
              <div className="card p-6 h-full">
                <span className="grid place-items-center rounded-xl" style={{ width: 46, height: 46, background: "var(--night)", color: "#fff" }}>
                  <a.icon size={22} />
                </span>
                <h3 className="font-display mt-4" style={{ fontWeight: 600, fontSize: "1.2rem" }}>{a.t}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Progetti                                                           */
/* ------------------------------------------------------------------ */
const PROGETTI = [
  {
    tag: "Evento · Natale",
    t: "Presepe Vivente Storico al Castello",
    d: "Un percorso emozionale tra le mura del Castello di Carini: personaggi in costume, antichi mestieri e scene di vita quotidiana della Natività. Oltre mille visitatori e la preziosa collaborazione dei gruppi Scout Carini 1 e Carini 2.",
    meta: ["26 dic · 1 gen · 6 gen", "Castello di Carini"],
    accent: "var(--coral)",
    icon: Sparkles,
  },
  {
    tag: "Evento · Borgo",
    t: "Festa del Carnevale Rinascimentale",
    d: "Il borgo medievale torna al Cinquecento: corteo in costume, musica, danze e spettacolo. Un modo per riscoprire la storia di Carini facendola vivere alla comunità di oggi.",
    meta: ["Carnevale", "Centro storico"],
    accent: "var(--gold)",
    icon: Palette,
  },
  {
    tag: "Sociale · Rete",
    t: "Centro Anziani Attivi — Comunità in Rete",
    d: "Un progetto di invecchiamento attivo che mette al centro le persone anziane: socialità, cultura e partecipazione, in rete con il territorio e con il sostegno di fondi regionali.",
    meta: ["Invecchiamento attivo", "Territorio"],
    accent: "var(--sea)",
    icon: HeartHandshake,
  },
];
function Progetti() {
  return (
    <section id="progetti" className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-sea">I progetti</span>
            <div className="rule collision-bar mt-3 mb-6" />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.08 }}>
              La cultura che si può vivere.
            </h2>
          </Reveal>
          <Reveal delay="d2">
            <a href="#contatti" className="btn btn-ghost">Proponi una collaborazione <ArrowRight size={16} /></a>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {PROGETTI.map((p, i) => (
            <Reveal key={p.t} delay={`d${i + 1}`}>
              <article className="card h-full overflow-hidden flex flex-col">
                <div className="relative grain" style={{ height: 150, background: `linear-gradient(135deg, ${p.accent}, var(--night))` }}>
                  <Gull className="w-16 absolute opacity-30 gull-float" style={{ top: "26%", left: "10%", color: "#fff" }} />
                  <span className="absolute" style={{ top: 16, left: 16 }}>
                    <span className="chip" style={{ background: "rgba(255,255,255,0.9)" }}>{p.tag}</span>
                  </span>
                  <p.icon className="absolute text-white/90" size={30} style={{ bottom: 16, right: 16 }} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1.35rem", lineHeight: 1.2 }}>{p.t}</h3>
                  <p className="mt-3 text-sm flex-1" style={{ color: "var(--ink-soft)" }}>{p.d}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.meta.map((m) => <span key={m} className="chip">{m}</span>)}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Rete / partner                                                     */
/* ------------------------------------------------------------------ */
function Rete() {
  const points = [
    "Patrocinio del Comune di Carini — Beni Culturali e Politiche Sociali",
    "In rete con Jonathan Livingston ODV e il Terzo Settore del territorio",
    "Collaborazione con i gruppi Scout Carini 1 e Carini 2",
    "Partecipazione a bandi e progettazione sociale e culturale",
  ];
  return (
    <section id="rete" className="bg-night grain relative section" style={{ color: "#fff" }}>
      <Gull className="w-32 absolute opacity-[0.06] gull-drift" style={{ top: "12%", right: "6%", color: "#fff" }} />
      <div className="container-x relative">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>Fare rete</span>
            <div className="rule collision-bar mt-3 mb-6" />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.08 }}>
              Da soli si va veloci, insieme si va lontano.
            </h2>
            <p className="mt-6 text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
              Crediamo nella collaborazione tra enti, istituzioni e cittadini. Ogni progetto nasce da un intreccio
              di competenze e passioni: è così che una piccola associazione può generare un grande impatto.
            </p>
            <a href="#contatti" className="btn btn-on-dark mt-8">Collabora con noi <ArrowUpRight size={16} /></a>
          </Reveal>
          <Reveal delay="d2">
            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "var(--night-2)", border: "1px solid var(--night-line)" }}>
                  <span className="grid place-items-center rounded-full shrink-0 mt-0.5" style={{ width: 24, height: 24, background: "var(--sea)" }}>
                    <Check size={15} color="#fff" />
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.85)" }}>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contatti + form                                                    */
/* ------------------------------------------------------------------ */
function Contatti() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contatti" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="container-x">
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <span className="eyebrow text-coral">Contatti</span>
            <div className="rule collision-bar mt-3 mb-6" />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.08 }}>
              Parliamo del prossimo incontro.
            </h2>
            <p className="mt-5 text-lg" style={{ color: "var(--ink-soft)" }}>
              Vuoi collaborare, proporre un progetto, fare volontariato o semplicemente saperne di più?
              Scrivici: rispondiamo a tutti.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="grid place-items-center rounded-xl" style={{ width: 48, height: 48, background: "#fff", border: "1px solid var(--line)", color: "var(--sea)" }}><MapPin size={22} /></span>
                <div>
                  <div className="font-semibold">Sede legale</div>
                  <div className="text-sm text-muted">Via Cangialosi 119 · 90044 Carini (PA)</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="grid place-items-center rounded-xl" style={{ width: 48, height: 48, background: "#fff", border: "1px solid var(--line)", color: "var(--coral)" }}><Building2 size={22} /></span>
                <div>
                  <div className="font-semibold">Ente del Terzo Settore</div>
                  <div className="text-sm text-muted">RUNTS Rep. n. 144409 · C.F. 97384650822</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay="d2">
            <form
              className="card p-7"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              {sent ? (
                <div className="text-center py-10">
                  <span className="grid place-items-center rounded-full mx-auto" style={{ width: 60, height: 60, background: "var(--sea)" }}>
                    <Check size={30} color="#fff" />
                  </span>
                  <h3 className="font-display mt-5" style={{ fontWeight: 600, fontSize: "1.5rem" }}>Grazie!</h3>
                  <p className="mt-2 text-muted">Abbiamo ricevuto il tuo messaggio. Ti ricontatteremo presto.</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <input className="field mt-1.5" placeholder="Il tuo nome" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input type="email" className="field mt-1.5" placeholder="nome@email.it" required />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Oggetto</label>
                    <input className="field mt-1.5" placeholder="Volontariato, collaborazione, informazioni…" />
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Messaggio</label>
                    <textarea className="field mt-1.5" rows={4} placeholder="Raccontaci la tua idea" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-full justify-center mt-6">
                    Invia messaggio <ArrowRight size={17} />
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-night" style={{ color: "#fff" }}>
      <div className="container-x" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Logo dark />
            <p className="mt-5 text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cultura, patrimonio e comunità a Carini. Dove le persone si incontrano.
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>Naviga</div>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="text-sm link-underline" style={{ color: "rgba(255,255,255,0.8)" }}>{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>Dati dell'ente</div>
            <ul className="mt-4 space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li>Associazione Collisioni ETS</li>
              <li>C.F. 97384650822</li>
              <li>RUNTS Rep. n. 144409 — sez. g)</li>
              <li>Via Cangialosi 119, 90044 Carini (PA)</li>
            </ul>
          </div>
        </div>
        <div className="collision-bar mt-12" style={{ height: 3, borderRadius: 3 }} />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span>© {new Date().getFullYear()} Collisioni ETS · Tutti i diritti riservati</span>
          <span>Ente del Terzo Settore · Iscritto al RUNTS</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ChiSiamo />
        <Ambiti />
        <Progetti />
        <Rete />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
