import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import {
  Landmark, Palette, GraduationCap, HeartHandshake, Compass, Scale,
  Users, Trophy, MapPin, ArrowRight, ArrowUpRight, Menu, X,
  Sparkles, Feather, Building2, Globe2, Check, ChevronDown,
} from "lucide-react";

/* ================================================================= */
/*  Media config — sostituisci i file in /public/media per le foto  */
/* ================================================================= */
const MEDIA = {
  hero: "/media/hero.jpg",
  comunita: "/media/comunita.jpg",
  presepe: "/media/presepe.jpg",
  carnevale: "/media/carnevale.jpg",
  anziani: "/media/anziani.jpg",
  castello: "/media/castello.jpg",
};

type Tone = "warm" | "sea" | "gold" | "night";

/* Brand mark — il gabbiano */
function Gull({ className = "", stroke = "currentColor", style }: { className?: string; stroke?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 70" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M6 46C30 44 46 34 58 12c1.2-2.2 3.4-2.2 4.6 0C74.6 34 90 44 114 46 90 47.4 74 55 62 74 50 55 34 47.4 6 46Z" fill={stroke} />
    </svg>
  );
}

/* Image with graceful branded placeholder */
function Img({ src, alt, tone = "night", className = "", label }: { src?: string; alt: string; tone?: Tone; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return <img src={src} alt={alt} className={`media-cover ${className}`} loading="lazy" onError={() => setFailed(true)} />;
  }
  return (
    <div className={`ph ph--${tone} media-cover ${className}`} role="img" aria-label={alt}>
      <Gull className="ph__gull gull-float" />
      <span className="ph__tag">{label ?? "Foto Collisioni"}</span>
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 select-none" aria-label="Collisioni ETS — home">
      <span className="grid place-items-center rounded-xl" style={{ width: 40, height: 40, background: dark ? "rgba(255,255,255,0.14)" : "#101a22", backdropFilter: dark ? "blur(4px)" : undefined }}>
        <Gull className="w-6" stroke={dark ? "#fff" : "#f6f2ea"} />
      </span>
      <span className="leading-none">
        <span className="font-display block" style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "0.01em", color: dark ? "#fff" : "var(--ink)" }}>Collisioni</span>
        <span className="block" style={{ fontSize: "0.62rem", letterSpacing: "0.34em", fontWeight: 600, color: dark ? "rgba(255,255,255,0.72)" : "var(--sea)" }}>ETS · CARINI</span>
      </span>
    </a>
  );
}

function Reveal({ children, className = "", delay = "" }: { children: ReactNode; className?: string; delay?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.unobserve(el); } }, { threshold: 0.14 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

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
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const overHero = !scrolled;
  const linkColor = overHero ? "rgba(255,255,255,0.9)" : "var(--ink-soft)";
  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all" style={{
      background: scrolled ? "rgba(246,242,234,0.82)" : "transparent",
      backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
      borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
    }}>
      <div className="container-x flex items-center justify-between" style={{ height: 76 }}>
        <Logo dark={overHero} />
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-underline text-sm font-medium transition-colors" style={{ color: linkColor }}>{n.label}</a>
          ))}
          <a href="#contatti" className={overHero ? "btn btn-on-dark" : "btn btn-primary"} style={{ padding: "0.6rem 1.3rem" }}>
            Sostieni <ArrowUpRight size={16} />
          </a>
        </nav>
        <button className="md:hidden grid place-items-center" style={{ width: 44, height: 44, color: overHero ? "#fff" : "var(--ink)" }} onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden container-x pb-5" style={{ background: "rgba(246,242,234,0.98)", backdropFilter: "blur(12px)" }}>
          <div className="flex flex-col gap-1 pt-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 border-b text-base font-medium" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>{n.label}</a>
            ))}
            <a href="#contatti" onClick={() => setOpen(false)} className="btn btn-primary mt-4 justify-center">Sostieni Collisioni</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---- Hero: full-height photographic ---- */
function Hero() {
  return (
    <section id="top" className="hero-full">
      <div className="hero-media zoom">
        <Img src={MEDIA.hero} alt="Il Castello di Carini e le attività di Collisioni ETS" tone="night" label="Foto hero" />
      </div>
      <div className="scrim-hero" />
      <Gull className="w-20 absolute opacity-20 gull-drift" style={{ top: "22%", right: "10%", color: "#fff", zIndex: 2 }} />

      <div className="container-x relative" style={{ zIndex: 3, paddingBottom: 92, paddingTop: 120 }}>
        <Reveal>
          <span className="chip on-photo" style={{ background: "rgba(255,255,255,0.14)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
            <Sparkles size={14} /> Ente del Terzo Settore · Carini (PA)
          </span>
        </Reveal>
        <Reveal delay="d1">
          <h1 className="font-display on-photo mt-6" style={{ color: "#fff", fontWeight: 700, lineHeight: 1.0, fontSize: "clamp(2.9rem, 8vw, 6.2rem)", letterSpacing: "-0.025em", maxWidth: "16ch" }}>
            Dove le persone, le idee e i luoghi <span className="collision-text">si incontrano.</span>
          </h1>
        </Reveal>
        <Reveal delay="d2">
          <p className="on-photo mt-6 text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.9)", maxWidth: "56ch" }}>
            <strong>Collisioni ETS</strong> anima Carini e il suo territorio: custodiamo il patrimonio storico,
            creiamo cultura condivisa e costruiamo comunità.
          </p>
        </Reveal>
        <Reveal delay="d3">
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#progetti" className="btn btn-primary">Scopri i progetti <ArrowRight size={17} /></a>
            <a href="#chi-siamo" className="btn btn-on-dark">Chi siamo</a>
          </div>
        </Reveal>
      </div>

      <a href="#intro" className="scroll-cue absolute" style={{ zIndex: 3, bottom: 26, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.8)" }} aria-label="Scorri">
        <ChevronDown size={30} />
      </a>
    </section>
  );
}

/* ---- Marquee of activities ---- */
const WORDS = ["Cultura", "Patrimonio", "Comunità", "Rievocazioni", "Inclusione", "Territorio", "Legalità", "Educazione"];
function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div id="intro" className="marquee py-6" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
      <div className="marquee__track">
        {items.map((w, i) => (
          <span key={i} className="marquee__item">
            <Gull className="w-7" stroke="var(--coral)" /> {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---- Chi siamo (con foto) ---- */
function ChiSiamo() {
  const pillars = [
    { icon: Landmark, t: "Custodire", d: "Ci prendiamo cura del patrimonio storico, artistico e paesaggistico di Carini." },
    { icon: Palette, t: "Creare", d: "Produciamo eventi, rievocazioni e percorsi culturali che rendono la storia viva." },
    { icon: Users, t: "Connettere", d: "Mettiamo in rete persone, generazioni e associazioni: cultura come comunità." },
  ];
  return (
    <section id="chi-siamo" className="section">
      <div className="container-x grid md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-6">
          <div className="tile zoom" style={{ aspectRatio: "4 / 5" }}>
            <Img src={MEDIA.comunita} alt="La comunità di Collisioni ETS" tone="sea" label="Foto comunità" />
            <div className="scrim-bottom" />
            <div className="ov-caption">
              <div className="flex items-center gap-2 text-sm on-photo"><Feather size={18} /> Il nostro simbolo è il gabbiano: libertà e orizzonti aperti.</div>
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-6">
          <Reveal>
            <span className="eyebrow text-sea">Chi siamo</span>
            <div className="rule collision-bar mt-3 mb-6" />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.06, letterSpacing: "-0.01em" }}>
              Nati per far incontrare mondi diversi.
            </h2>
            <p className="mt-6 text-lg" style={{ color: "var(--ink-soft)" }}>
              Costituita nel 2024 e iscritta al RUNTS, <strong>Collisioni ETS</strong> opera senza scopo di lucro
              per finalità civiche, solidaristiche e di utilità sociale. Il nostro nome è la nostra idea di cultura:
              l'energia che nasce quando storie, competenze e comunità <em>collidono</em>.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={`d${i + 1}`}>
                <div className="flex gap-4 items-start">
                  <span className="grid place-items-center rounded-xl shrink-0" style={{ width: 48, height: 48, background: "var(--paper-2)", color: "var(--sea)" }}><p.icon size={24} /></span>
                  <div>
                    <h3 className="font-display" style={{ fontWeight: 600, fontSize: "1.2rem" }}>{p.t}</h3>
                    <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{p.d}</p>
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

/* ---- Ambiti ---- */
const AMBITI = [
  { icon: Landmark, t: "Patrimonio culturale", d: "Tutela e valorizzazione del patrimonio storico, artistico e del paesaggio." },
  { icon: Palette, t: "Cultura & arte", d: "Attività culturali, artistiche e ricreative di interesse sociale." },
  { icon: GraduationCap, t: "Educazione", d: "Formazione extra-scolastica e contrasto alla povertà educativa." },
  { icon: HeartHandshake, t: "Interventi sociali", d: "Servizi e interventi a favore delle persone e delle comunità." },
  { icon: Compass, t: "Turismo di comunità", d: "Attività turistiche di interesse sociale, culturale e religioso." },
  { icon: Scale, t: "Legalità & beni comuni", d: "Riqualificazione di beni pubblici e confiscati; cultura della legalità." },
  { icon: Globe2, t: "Accoglienza", d: "Accoglienza umanitaria e integrazione sociale dei migranti." },
  { icon: Trophy, t: "Sport per tutti", d: "Attività sportive dilettantistiche come occasione di incontro." },
];
function Ambiti() {
  return (
    <section id="ambiti" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-coral">Cosa facciamo</span>
          <div className="rule collision-bar mt-3 mb-6" />
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.06 }}>Otto ambiti, una sola direzione: la comunità.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {AMBITI.map((a, i) => (
            <Reveal key={a.t} delay={`d${(i % 4) + 1}`}>
              <div className="card p-6 h-full">
                <span className="grid place-items-center rounded-xl" style={{ width: 46, height: 46, background: "var(--night)", color: "#fff" }}><a.icon size={22} /></span>
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

/* ---- Progetti: bento con foto ---- */
const PROGETTI = [
  { img: MEDIA.presepe, tone: "warm" as Tone, tag: "Evento · Natale", t: "Presepe Vivente Storico al Castello", d: "Un percorso emozionale tra le mura del Castello di Carini: personaggi in costume, antichi mestieri e scene di vita quotidiana. Oltre mille visitatori, con i gruppi Scout Carini 1 e Carini 2.", meta: ["26 dic · 1 gen · 6 gen", "Castello di Carini"], span: "b-3 b-tall" },
  { img: MEDIA.carnevale, tone: "gold" as Tone, tag: "Evento · Borgo", t: "Festa del Carnevale Rinascimentale", d: "Il borgo medievale torna al Cinquecento: corteo in costume, musica e spettacolo.", meta: ["Carnevale"], span: "b-3" },
  { img: MEDIA.anziani, tone: "sea" as Tone, tag: "Sociale · Rete", t: "Centro Anziani Attivi — Comunità in Rete", d: "Invecchiamento attivo: socialità, cultura e partecipazione in rete con il territorio.", meta: ["Invecchiamento attivo"], span: "b-3" },
];
function Progetti() {
  return (
    <section id="progetti" className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-sea">I progetti</span>
            <div className="rule collision-bar mt-3 mb-6" />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.06 }}>La cultura che si può vivere.</h2>
          </Reveal>
          <Reveal delay="d2"><a href="#contatti" className="btn btn-ghost">Proponi una collaborazione <ArrowRight size={16} /></a></Reveal>
        </div>

        <div className="bento mt-12">
          {PROGETTI.map((p, i) => (
            <Reveal key={p.t} delay={`d${i + 1}`} className={p.span}>
              <a href="#contatti" className="tile zoom block h-full group" style={{ display: "block", height: "100%" }}>
                <Img src={p.img} alt={p.t} tone={p.tone} label="Foto progetto" />
                <div className="scrim-bottom" />
                <div className="ov-caption">
                  <span className="chip mb-3" style={{ background: "rgba(255,255,255,0.92)" }}>{p.tag}</span>
                  <h3 className="font-display on-photo" style={{ color: "#fff", fontWeight: 600, fontSize: i === 0 ? "1.7rem" : "1.3rem", lineHeight: 1.15 }}>{p.t}</h3>
                  <p className="on-photo mt-2 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{p.d}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.meta.map((m) => <span key={m} className="chip" style={{ background: "rgba(255,255,255,0.14)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>{m}</span>)}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Full-bleed band + quote ---- */
function Band() {
  return (
    <section className="relative" style={{ minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div className="hero-media zoom"><Img src={MEDIA.castello} alt="Il Castello di Carini" tone="night" label="Foto castello" /></div>
      <div className="scrim-hero" />
      <div className="container-x relative" style={{ zIndex: 3, paddingTop: 80, paddingBottom: 80 }}>
        <Reveal>
          <Gull className="w-12 mb-6" stroke="rgba(255,255,255,0.85)" />
          <p className="font-display on-photo" style={{ color: "#fff", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(1.6rem,3.6vw,2.8rem)", lineHeight: 1.25, maxWidth: "22ch" }}>
            «Ogni incontro è una piccola, felice collisione.»
          </p>
          <p className="on-photo mt-4" style={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em" }}>— Collisioni ETS, Carini</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Stats ---- */
const STATS = [
  { n: "1.000+", l: "visitatori al Presepe Vivente" },
  { n: "2024", l: "anno di fondazione" },
  { n: "13", l: "ambiti statutari di attività" },
  { n: "Carini", l: "cuore delle nostre attività" },
];
function Stats() {
  return (
    <section className="bg-night grain" style={{ color: "#fff" }}>
      <div className="container-x" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={`d${i + 1}`} className="text-center md:text-left">
              <div className="font-display collision-text" style={{ fontWeight: 700, fontSize: "clamp(2rem,4vw,2.9rem)", lineHeight: 1 }}>{s.n}</div>
              <div className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.62)" }}>{s.l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Rete ---- */
function Rete() {
  const points = [
    "Patrocinio del Comune di Carini — Beni Culturali e Politiche Sociali",
    "In rete con Jonathan Livingston ODV e il Terzo Settore del territorio",
    "Collaborazione con i gruppi Scout Carini 1 e Carini 2",
    "Partecipazione a bandi e progettazione sociale e culturale",
  ];
  return (
    <section id="rete" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="container-x grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <span className="eyebrow text-coral">Fare rete</span>
          <div className="rule collision-bar mt-3 mb-6" />
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.06 }}>Da soli si va veloci, insieme si va lontano.</h2>
          <p className="mt-6 text-lg" style={{ color: "var(--ink-soft)" }}>
            Crediamo nella collaborazione tra enti, istituzioni e cittadini. Ogni progetto nasce da un intreccio
            di competenze e passioni: è così che una piccola associazione genera un grande impatto.
          </p>
          <a href="#contatti" className="btn btn-sea mt-8">Collabora con noi <ArrowUpRight size={16} /></a>
        </Reveal>
        <Reveal delay="d2">
          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 card p-4">
                <span className="grid place-items-center rounded-full shrink-0 mt-0.5" style={{ width: 24, height: 24, background: "var(--sea)" }}><Check size={15} color="#fff" /></span>
                <span style={{ color: "var(--ink-soft)" }}>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---- Contatti ---- */
function Contatti() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contatti" className="section">
      <div className="container-x grid md:grid-cols-2 gap-12">
        <Reveal>
          <span className="eyebrow text-coral">Contatti</span>
          <div className="rule collision-bar mt-3 mb-6" />
          <h2 className="font-display" style={{ fontWeight: 700, fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.06 }}>Parliamo del prossimo incontro.</h2>
          <p className="mt-5 text-lg" style={{ color: "var(--ink-soft)" }}>Vuoi collaborare, proporre un progetto, fare volontariato o saperne di più? Scrivici.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <span className="grid place-items-center rounded-xl" style={{ width: 48, height: 48, background: "#fff", border: "1px solid var(--line)", color: "var(--sea)" }}><MapPin size={22} /></span>
              <div><div className="font-semibold">Sede legale</div><div className="text-sm text-muted">Via Cangialosi 119 · 90044 Carini (PA)</div></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="grid place-items-center rounded-xl" style={{ width: 48, height: 48, background: "#fff", border: "1px solid var(--line)", color: "var(--coral)" }}><Building2 size={22} /></span>
              <div><div className="font-semibold">Ente del Terzo Settore</div><div className="text-sm text-muted">RUNTS Rep. n. 144409 · C.F. 97384650822</div></div>
            </div>
          </div>
        </Reveal>
        <Reveal delay="d2">
          <form className="card p-7" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent ? (
              <div className="text-center py-10">
                <span className="grid place-items-center rounded-full mx-auto" style={{ width: 60, height: 60, background: "var(--sea)" }}><Check size={30} color="#fff" /></span>
                <h3 className="font-display mt-5" style={{ fontWeight: 600, fontSize: "1.5rem" }}>Grazie!</h3>
                <p className="mt-2 text-muted">Abbiamo ricevuto il tuo messaggio. Ti ricontatteremo presto.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium">Nome</label><input className="field mt-1.5" placeholder="Il tuo nome" required /></div>
                  <div><label className="text-sm font-medium">Email</label><input type="email" className="field mt-1.5" placeholder="nome@email.it" required /></div>
                </div>
                <div className="mt-4"><label className="text-sm font-medium">Oggetto</label><input className="field mt-1.5" placeholder="Volontariato, collaborazione, informazioni…" /></div>
                <div className="mt-4"><label className="text-sm font-medium">Messaggio</label><textarea className="field mt-1.5" rows={4} placeholder="Raccontaci la tua idea" required /></div>
                <button type="submit" className="btn btn-primary w-full justify-center mt-6">Invia messaggio <ArrowRight size={17} /></button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-night" style={{ color: "#fff" }}>
      <div className="container-x" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Logo dark />
            <p className="mt-5 text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Cultura, patrimonio e comunità a Carini. Dove le persone si incontrano.</p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>Naviga</div>
            <ul className="mt-4 space-y-2">{NAV.map((n) => (<li key={n.href}><a href={n.href} className="text-sm link-underline" style={{ color: "rgba(255,255,255,0.8)" }}>{n.label}</a></li>))}</ul>
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

export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ChiSiamo />
        <Ambiti />
        <Progetti />
        <Band />
        <Stats />
        <Rete />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
