import { useState, useEffect, useRef } from "react";
import { MapPin, Clock, Calendar, Mail, Phone, ChevronDown, Wine, Leaf, Building2, Star, Users, Award, Menu, X } from "lucide-react";

// --- DATA ---
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Mission", href: "#mission" },
  { label: "Espositori", href: "#espositori" },
  { label: "Programma", href: "#programma" },
  { label: "Ticket", href: "https://carinicittaparlante.com/eventi/" },
  { label: "Contatti", href: "#contatti" },
];

const STATS = [
  { value: "30+", label: "Cantine Espositrici" },
  { value: "200+", label: "Etichette in Degustazione" },
  { value: "6", label: "Giorni di Evento" },
  { value: "1000+", label: "Visitatori Attesi" },
];

const MISSIONS = [
  {
    icon: Wine,
    title: "Cultura del Vino Artigianale",
    desc: "Promuoviamo la filosofia del vino come espressione autentica del territorio. Ogni bottiglia racconta una storia di cura, rispetto per la natura e sapienza tramandata. Crediamo che il vino artigianale rappresenti la massima espressione dell'identità enologica siciliana, un patrimonio da custodire e celebrare con orgoglio.",
  },
  {
    icon: Building2,
    title: "Patrimonio Storico-Culturale",
    desc: "Il Castello di Carini — dimora nobiliare risalente all'XI secolo e teatro della leggenda della Baronessa — diventa la cornice perfetta per celebrare la tradizione vitivinicola siciliana. Le sue mura millenarie, impregnate di storia e mistero, esaltano la profondità di ogni sorso, creando un'esperienza sensoriale unica e irripetibile.",
  },
  {
    icon: Leaf,
    title: "Vitivinicoltura Sostenibile",
    desc: "Sosteniamo produttori che adottano pratiche agricole rispettose dell'ambiente: dalla viticoltura biologica e biodinamica alla riduzione dell'impronta carbonica in cantina. Crediamo che il futuro dell'enologia siciliana passi attraverso un rapporto armonioso con la terra, preservando la biodiversità dei vitigni autoctoni per le generazioni future.",
  },
];

const ESPOSITORI = [
  {
    name: "Cantina Valle Antica",
    zona: "Marsala, Trapani",
    vini: "Nero d'Avola · Grillo · Catarratto",
    img: "/vineyard.jpg",
    tag: "Biologico",
  },
  {
    name: "Terre di Sicania",
    zona: "Agrigento",
    vini: "Insolia · Syrah · Frappato",
    img: "/sicily-wine.jpg",
    tag: "Biodinamico",
  },
  {
    name: "Masseria del Sole",
    zona: "Ragusa",
    vini: "Cerasuolo · Albanello · Nerello",
    img: "/degustazione.jpg",
    tag: "Artigianale",
  },
  {
    name: "Vigna dei Normanni",
    zona: "Palermo",
    vini: "Perricone · Zibibbo · Grecanico",
    img: "/vineyard.jpg",
    tag: "Storica",
  },
  {
    name: "Collina Etna",
    zona: "Catania",
    vini: "Nerello Mascalese · Carricante",
    img: "/sicily-wine.jpg",
    tag: "Vulcanico",
  },
  {
    name: "Feudo Barocco",
    zona: "Noto, Siracusa",
    vini: "Moscato · Nero d'Avola · Inzolia",
    img: "/degustazione.jpg",
    tag: "Premium",
  },
];

const PROGRAMMA = [
  {
    edizione: "Prima Edizione",
    date: "9 · 10 Giugno 2024",
    orario: "Ore 15:00 – 18:00",
    giorni: [
      {
        giorno: "Domenica 9 Giugno",
        eventi: [
          { ora: "15:00", titolo: "Apertura Porte & Accoglienza", desc: "Benvenuto con calice omaggio e visita guidata alle sale del Castello." },
          { ora: "15:30", titolo: "Masterclass: I Vitigni Autoctoni Siciliani", desc: "Un viaggio attraverso i vitigni identitari dell'isola: Nero d'Avola, Nerello Mascalese, Catarratto e Grillo. Guidato da sommelier AIS certificati." },
          { ora: "16:30", titolo: "Degustazione Libera — Padiglione A", desc: "Libera esplorazione tra le cantine espositrici con possibilità di acquistare direttamente dai produttori." },
          { ora: "17:30", titolo: "Talk: Vino e Sostenibilità in Sicilia", desc: "Conversazione aperta su pratiche agricole innovative e rispetto della biodiversità vitivinicola." },
        ],
      },
      {
        giorno: "Lunedì 10 Giugno",
        eventi: [
          { ora: "15:00", titolo: "Apertura & Visita al Castello", desc: "Accesso alle sale storiche con audioguida inclusa nel biglietto d'ingresso." },
          { ora: "15:30", titolo: "Masterclass: Abbinamenti Cibo & Vino", desc: "Scopri come esaltare i sapori della cucina siciliana attraverso abbinamenti sapienti con i vini locali." },
          { ora: "16:30", titolo: "Degustazione Libera — Padiglione B", desc: "Nuove cantine, nuove etichette. Degustazione guidata con schede tecniche." },
          { ora: "17:30", titolo: "Premiazione: Miglior Etichetta Emergente", desc: "Riconoscimento alla cantina che ha saputo distinguersi per qualità, innovazione e rispetto del territorio." },
        ],
      },
    ],
  },
  {
    edizione: "Seconda Edizione",
    date: "9 · 10 · 11 Maggio 2025",
    orario: "Ore 15:00 – 18:00",
    giorni: [
      {
        giorno: "Venerdì 9 Maggio",
        eventi: [
          { ora: "15:00", titolo: "Apertura & Welcome Wine", desc: "Accoglienza con selezione di bianchi freschi e frizzanti siciliani." },
          { ora: "15:30", titolo: "Masterclass: Vitigni Vulcanici dell'Etna", desc: "Esplorazione dei vini prodotti sulle pendici dell'Etna: terroir unico, mineralità intensa, eleganza senza pari." },
          { ora: "16:30", titolo: "Degustazione Libera — Padiglione C", desc: "Nuovi espositori, nuove scoperte. Focus sui vini bianchi e rosati siciliani." },
          { ora: "17:30", titolo: "Talk: Il Futuro del Vino Naturale", desc: "Confronto tra produttori, enologi e appassionati sul trend del vino naturale in Italia e nel mondo." },
        ],
      },
      {
        giorno: "Sabato 10 Maggio",
        eventi: [
          { ora: "15:00", titolo: "Apertura & Visita Guidata al Castello", desc: "Tour storico esclusivo con guida esperta alla scoperta della leggenda della Baronessa di Carini." },
          { ora: "15:30", titolo: "Masterclass: I Grandi Rossi Siciliani", desc: "Degustazione guidata dei rossi strutturati della Sicilia: profondità, complessità e longevità." },
          { ora: "16:30", titolo: "Degustazione Libera + Cibo & Vino", desc: "Abbinamenti con prodotti tipici locali: formaggi, salumi, pane cunzato e dolci tradizionali siciliani." },
          { ora: "17:30", titolo: "Serata Speciale: Vino sotto le Stelle", desc: "Degustazione serale nei cortili del Castello con musica dal vivo e atmosfera magica." },
        ],
      },
      {
        giorno: "Domenica 11 Maggio",
        eventi: [
          { ora: "15:00", titolo: "Gran Finale: Apertura & Calice d'Onore", desc: "Accoglienza speciale con calice d'onore riservato ai possessori di biglietto VIP." },
          { ora: "15:30", titolo: "Masterclass Conclusiva: Passito e Dolci Siciliani", desc: "Un percorso sensoriale tra i vini dolci dell'isola: Moscato, Passito di Pantelleria, Malvasia delle Lipari." },
          { ora: "16:30", titolo: "Degustazione Libera — Gran Finale", desc: "Ultima occasione per scoprire, degustare e acquistare direttamente dai produttori presenti." },
          { ora: "17:30", titolo: "Cerimonia di Chiusura", desc: "Ringraziamenti, premiazioni finali e arrivederci alla prossima edizione del Castello di Vino." },
        ],
      },
    ],
  },
  {
    edizione: "Terza Edizione",
    date: "20 · 21 Giugno 2026",
    orario: "Ore 15:00 – 19:00",
    giorni: [
      {
        giorno: "Sabato 20 Giugno",
        eventi: [
          { ora: "15:00", titolo: "Apertura Porte & Accoglienza", desc: "Benvenuto con calice omaggio e visita guidata alle sale del Castello." },
          { ora: "15:30", titolo: "Masterclass: I Vitigni Autoctoni Siciliani", desc: "Un viaggio attraverso i vitigni identitari dell'isola: Nero d'Avola, Nerello Mascalese, Catarratto e Grillo." },
          { ora: "16:30", titolo: "Degustazione Libera", desc: "Libera esplorazione tra le cantine espositrici con possibilità di acquistare direttamente dai produttori." },
          { ora: "18:00", titolo: "Talk: Vino e Territorio", desc: "Conversazione aperta su pratiche agricole innovative e rispetto della biodiversità vitivinicola siciliana." },
          { ora: "19:00", titolo: "Chiusura Giornata", desc: "Fine della prima giornata. Arrivederci a domani!" },
        ],
      },
      {
        giorno: "Domenica 21 Giugno",
        eventi: [
          { ora: "15:00", titolo: "Apertura & Visita al Castello", desc: "Accesso alle sale storiche con audioguida inclusa nel biglietto d'ingresso." },
          { ora: "15:30", titolo: "Masterclass: Abbinamenti Cibo & Vino", desc: "Scopri come esaltare i sapori della cucina siciliana attraverso abbinamenti sapienti con i vini locali." },
          { ora: "16:30", titolo: "Degustazione Libera — Gran Finale", desc: "Ultima occasione per scoprire, degustare e acquistare direttamente dai produttori presenti." },
          { ora: "18:00", titolo: "Premiazione: Miglior Etichetta 2026", desc: "Riconoscimento alla cantina che ha saputo distinguersi per qualità, innovazione e rispetto del territorio." },
          { ora: "19:00", titolo: "Cerimonia di Chiusura", desc: "Ringraziamenti e arrivederci alla prossima edizione del Castello di Vino." },
        ],
      },
    ],
  },
];

const TICKETS = [
  {
    nome: "Degustatore",
    prezzo: "€ 15",
    desc: "L'ingresso ideale per chi vuole avvicinarsi al mondo del vino siciliano con curiosità e piacere.",
    inclusi: [
      "Ingresso all'evento",
      "Calice da degustazione incluso",
      "5 degustazioni a scelta",
      "Accesso a tutte le aree espositive",
      "Programma dell'evento",
    ],
    highlight: false,
  },
  {
    nome: "Amante del Vino",
    prezzo: "€ 25",
    desc: "L'esperienza completa per chi vuole esplorare a fondo la ricchezza enologica della Sicilia.",
    inclusi: [
      "Tutto del piano Degustatore",
      "Degustazioni illimitate",
      "Accesso a una Masterclass",
      "Visita guidata al Castello",
      "Sacchetta degustazione omaggio",
    ],
    highlight: true,
  },
  {
    nome: "VIP Collector",
    prezzo: "€ 45",
    desc: "Riservato ai veri appassionati: un'esperienza sensoriale e culturale senza compromessi.",
    inclusi: [
      "Tutto del piano Amante del Vino",
      "Accesso a tutte le Masterclass",
      "Degustazione verticale esclusiva",
      "Meet & Greet con i produttori",
      "Bottiglia selezionata in omaggio",
      "Accesso prioritario senza fila",
    ],
    highlight: false,
  },
];

// --- COMPONENTS ---

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(12,12,12,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="Castello di Vino"
            style={{ height: 44, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(201,168,76,0.15))" }}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: "var(--muted)",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {l.label}
            </a>
          ))}
          <a href="https://carinicittaparlante.com/eventi/" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ textDecoration: "none", fontSize: "0.75rem", padding: "10px 24px" }}>
            <span>Acquista</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(12,12,12,0.98)",
            borderTop: "1px solid var(--border)",
            padding: "20px 24px",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "var(--text)",
                fontSize: "0.9rem",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a href="https://carinicittaparlante.com/eventi/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-gold" style={{ display: "block", textAlign: "center", marginTop: 16, textDecoration: "none" }}>
            <span>Acquista Ticket</span>
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Hero gradient — fade to dark at bottom, castello visibile attraverso velatura globale */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(8,6,3,0.15) 0%, rgba(8,6,3,0.05) 40%, rgba(8,6,3,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 900,
          padding: "0 24px",
        }}
      >
        {/* Badge */}
        <div
          className="animate-fade-up delay-100"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid var(--border)",
            padding: "6px 18px",
            marginBottom: 28,
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          <MapPin size={12} />
          Castello di Carini · Palermo · Sicilia
        </div>

        {/* Title */}
        <h1
          className="font-display animate-fade-up delay-200"
          style={{
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 20,
            color: "var(--text)",
          }}
        >
          Castello
          <br />
          <em className="gold-gradient" style={{ fontStyle: "italic" }}>di Vino</em>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up delay-300"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(240,234,214,0.75)",
            maxWidth: 560,
            margin: "0 auto 36px",
            lineHeight: 1.8,
          }}
        >
          Festival del vino artigianale e della biodiversità vitivinicola.
          Due edizioni straordinarie in un castello millenario.
        </p>

        {/* Date pills */}
        <div
          className="animate-fade-up delay-400"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          {[
            { label: "I Edizione", date: "9 – 10 Giugno 2024", orario: "15:00 – 18:00" },
            { label: "II Edizione", date: "9 – 11 Maggio 2025", orario: "15:00 – 18:00" },
            { label: "III Edizione", date: "20 – 21 Giugno 2026", orario: "15:00 – 19:00" },
          ].map((d) => (
            <div
              key={d.date}
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid var(--border)",
                padding: "12px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>
                {d.label}
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)" }}>
                <Calendar size={12} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                {d.date}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 2 }}>
                <Clock size={10} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                Ore {d.orario}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-500" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://carinicittaparlante.com/eventi/" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ textDecoration: "none" }}>
            <span>Acquista il Tuo Ticket</span>
          </a>
          <a href="#programma" className="btn-outline" style={{ textDecoration: "none" }}>
            Scopri il Programma
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in delay-600"
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--muted)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
      >
        Scorri
        <ChevronDown size={16} style={{ animation: "bounce 2s infinite" }} />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="stats" style={{ background: "rgba(12,10,6,0.6)", backdropFilter: "blur(12px)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "20px 24px",
                borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div className="font-display gold-gradient" style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" style={{ padding: "100px 0", background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            La Nostra Missione
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 20 }}>
            Tre Pilastri,{" "}
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>Un'Unica Visione</em>
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 24px" }} />
          <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Castello di Vino nasce dalla convergenza di tre passioni profonde: il vino come arte, la storia come scenografia, la sostenibilità come responsabilità.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {MISSIONS.map((m, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "rgba(12,10,6,0.65)",
                border: "1px solid var(--border)",
                padding: "40px 32px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold), transparent)" }} />

              <div
                style={{
                  width: 52,
                  height: 52,
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                  background: "var(--gold-dim)",
                }}
              >
                <m.icon size={22} color="var(--gold)" />
              </div>
              <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 16, color: "var(--text)" }}>
                {m.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.85 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "rgba(12,10,6,0.65)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lateral fade — lascia trasparire il castello */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "45%",
          background: "linear-gradient(to right, rgba(8,6,3,0.55) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            L'Evento
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2 }}>
            Un Festival Unico nel
            <br />
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>Cuore della Sicilia</em>
          </h2>
          <div className="gold-divider" style={{ marginLeft: 0, marginBottom: 32 }} />

          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 20 }}>
            <strong style={{ color: "var(--text)" }}>Castello di Vino</strong> è molto più di una semplice fiera enologica: è una celebrazione multisensoriale del vino siciliano, della cultura dell'isola e della bellezza senza tempo del Castello di Carini. Situato nel cuore del palermitano, questo maniero normanno dell'XI secolo — reso immortale dalla leggenda della Baronessa di Carini — diventa la scenografia perfetta per raccontare storie di vigne, cantinieri e territori.
          </p>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 20 }}>
            In due edizioni — la prima a giugno 2024 e la seconda a maggio 2025 — l'evento ospita oltre 30 cantine artigianali siciliane, con più di 200 etichette in degustazione, masterclass condotte da sommelier certificati AIS, talk su sostenibilità e innovazione enologica, e visite guidate al castello stesso. Ogni pomeriggio, dalle 15:00 alle 18:00, i visitatori possono immergersi in un'esperienza autentica, lontana dalla logica della grande distribuzione.
          </p>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 36 }}>
            L'evento è creato da <strong style={{ color: "var(--gold)" }}>Collisioni ETS</strong> e <strong style={{ color: "var(--gold)" }}>Jonathan Livingston ODV</strong>, realtà radicate nel territorio carinese con una missione precisa: valorizzare le eccellenze locali, sostenere l'economia del turismo enogastronomico e dare voce ai piccoli produttori che ogni giorno, con passione e dedizione, trasformano l'uva in arte.
          </p>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { icon: Star, label: "Esperienza Premium" },
              { icon: Users, label: "Comunità di Appassionati" },
              { icon: Award, label: "Produttori Selezionati" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <item.icon size={16} color="var(--gold)" />
                <span style={{ fontSize: "0.8rem", color: "var(--muted)", letterSpacing: "0.05em" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ESPOSITORI_2025 = [
  { name: "Azienda Agricola COS", logo: "/cantina-cos.jpg", dark: true },
  { name: "Barone di Bernaj / Madaudo", logo: "/cantina-baronebernaj.jpg", dark: true },
  { name: "Cantine Birgi", logo: "/cantina-birgi.jpg", dark: true },
  { name: "Cantine Fina", logo: "/cantina-fina.png", dark: false },
  { name: "Firriato", logo: "/cantina-firriato.png", dark: true },
  { name: "Guccione Azienda Agricola", logo: "/cantina-guccione2025.png", dark: false },
];

const ESPOSITORI_2024 = [
  { name: "Oscar Bissinger", logo: "/cantina-oscar-bissinger.png", dark: true },
  { name: "Raisin Natural Wine", logo: "/cantina-raisin.png", dark: false },
  { name: "Viteadovest", logo: "/cantina-viteadovest.jpg", dark: true },
  { name: "La Chiusa", logo: "/cantina-lachiusa.jpg", dark: true },
  { name: "IRVO – Istituto Regionale del Vino e dell'Olio", logo: "/cantina-irvo.jpg", dark: true },
  { name: "Gaudioso", logo: "/cantina-gaudioso.jpg", dark: true },
  { name: "Calogero Caruana", logo: "/cantina-caruana.jpg", dark: true },
  { name: "Assuli Baglio", logo: "/cantina-assuli.jpg", dark: true },
  { name: "Guccione Azienda Agricola", logo: "/cantina-guccione.png", dark: false },
  { name: "Terre di Gratia", logo: "/cantina-terredigratia.png", dark: true },
  { name: "Le Sette Aje", logo: "/cantina-setteaje.jpg", dark: true },
];

function Espositori() {
  return (
    <section id="espositori" style={{ padding: "100px 0", background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Header — Edizione 2025 */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Edizione Corrente
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 20 }}>
            Espositori{" "}
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>2025</em>
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 24px" }} />
          <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Le cantine e i produttori che partecipano all'edizione 2025 del Castello di Vino. Un viaggio tra i migliori vini artigianali siciliani.
          </p>
        </div>

        {/* Logo grid 2025 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 80,
        }}>
          {ESPOSITORI_2025.map((c, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border)",
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                minHeight: 140,
              }}
            >
              <div style={{ width: "100%", height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 72,
                    objectFit: "contain",
                    filter: c.dark ? "invert(1) brightness(2)" : "brightness(1.1)",
                    opacity: 0.85,
                    transition: "opacity 0.3s, filter 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = c.dark ? "invert(1) brightness(2.5)" : "brightness(1.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.filter = c.dark ? "invert(1) brightness(2)" : "brightness(1.1)"; }}
                />
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted)", textAlign: "center", letterSpacing: "0.05em", lineHeight: 1.4 }}>
                {c.name}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border)", margin: "0 0 72px" }} />

        {/* Edizione 2024 */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>
            Edizione Precedente
          </div>
          <h3 className="font-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, marginBottom: 16 }}>
            Espositori{" "}
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>2024</em>
          </h3>
          <div className="gold-divider" style={{ margin: "0 auto 20px" }} />
          <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.8 }}>
            Le cantine e i produttori che hanno partecipato alla prima edizione del Castello di Vino, rendendo l'evento un'esperienza indimenticabile.
          </p>
        </div>

        {/* Logo grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}>
          {ESPOSITORI_2024.map((c, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border)",
                padding: "28px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                minHeight: 140,
              }}
            >
              <div style={{
                width: "100%",
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={c.logo}
                  alt={c.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 72,
                    objectFit: "contain",
                    filter: c.dark ? "invert(1) brightness(2)" : "brightness(1.1)",
                    opacity: 0.85,
                    transition: "opacity 0.3s, filter 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.filter = c.dark ? "invert(1) brightness(2.5)" : "brightness(1.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.filter = c.dark ? "invert(1) brightness(2)" : "brightness(1.1)"; }}
                />
              </div>
              <div style={{
                fontSize: "0.7rem",
                color: "var(--muted)",
                textAlign: "center",
                letterSpacing: "0.05em",
                lineHeight: 1.4,
              }}>
                {c.name}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Programma() {
  const [activeEd, setActiveEd] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="programma" style={{ padding: "100px 0", background: "rgba(12,10,6,0.55)", backdropFilter: "blur(8px)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Calendario
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 20 }}>
            Il{" "}
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>Programma</em>
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 24px" }} />
        </div>

        {/* Edition tabs */}
        <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          {PROGRAMMA.map((ed, i) => (
            <button
              key={i}
              onClick={() => { setActiveEd(i); setActiveDay(0); }}
              style={{
                background: activeEd === i ? "var(--gold)" : "transparent",
                color: activeEd === i ? "#0c0c0c" : "var(--muted)",
                border: "1px solid",
                borderColor: activeEd === i ? "var(--gold)" : "var(--border)",
                padding: "10px 28px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.2s",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {ed.edizione} — {ed.date}
            </button>
          ))}
        </div>

        {/* Day tabs */}
        <div style={{ display: "flex", gap: 2, marginBottom: 32, borderBottom: "1px solid var(--border)", flexWrap: "wrap" }}>
          {PROGRAMMA[activeEd].giorni.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: activeDay === i ? "2px solid var(--gold)" : "2px solid transparent",
                color: activeDay === i ? "var(--gold)" : "var(--muted)",
                padding: "12px 20px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                fontFamily: "Poppins, sans-serif",
                marginBottom: -1,
              }}
            >
              {g.giorno}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {PROGRAMMA[activeEd].giorni[activeDay].eventi.map((ev, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: 24,
                marginBottom: 32,
                position: "relative",
              }}
            >
              {/* Time */}
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.05em" }}>
                  {ev.ora}
                </div>
                {i < PROGRAMMA[activeEd].giorni[activeDay].eventi.length - 1 && (
                  <div style={{ width: 1, height: "calc(100% + 32px)", background: "var(--border)", margin: "8px auto 0", opacity: 0.5 }} />
                )}
              </div>

              {/* Event */}
              <div
                style={{
                  background: "rgba(8,6,3,0.6)",
                  border: "1px solid var(--border)",
                  padding: "20px 24px",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <h4 className="font-display" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8, color: "var(--text)" }}>
                  {ev.titolo}
                </h4>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.75 }}>{ev.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticket() {
  return (
    <section id="ticket" style={{ padding: "100px 0", background: "transparent" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Biglietteria
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 20 }}>
            Scegli la Tua{" "}
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>Esperienza</em>
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 24px" }} />
          <p style={{ color: "var(--muted)", maxWidth: 500, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Tre livelli di accesso per soddisfare ogni tipo di appassionato: dal curioso al collezionista.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>
          {TICKETS.map((t, i) => (
            <div
              key={i}
              style={{
                background: t.highlight ? "linear-gradient(145deg, var(--surface2), var(--surface))" : "var(--surface)",
                border: t.highlight ? "1px solid rgba(201,168,76,0.5)" : "1px solid var(--border)",
                padding: "40px 32px",
                position: "relative",
                transform: t.highlight ? "scale(1.03)" : "scale(1)",
                boxShadow: t.highlight ? "0 30px 80px rgba(201,168,76,0.12)" : "none",
              }}
            >
              {t.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--gold)",
                    color: "#0c0c0c",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "4px 16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Più Popolare
                </div>
              )}
              {t.highlight && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
              )}

              <div style={{ marginBottom: 8, fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {t.nome}
              </div>
              <div className="font-display" style={{ fontSize: "3rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                {t.prezzo}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 20 }}>per persona · per giornata</div>

              <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.75, marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border)" }}>
                {t.desc}
              </p>

              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {t.inclusi.map((item, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, fontSize: "0.85rem", color: "rgba(240,234,214,0.75)" }}>
                    <span style={{ color: "var(--gold)", fontSize: "1rem", lineHeight: 1 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://carinicittaparlante.com/eventi/"
                target="_blank"
                rel="noopener noreferrer"
                className={t.highlight ? "btn-gold" : "btn-outline"}
                style={{ display: "block", textAlign: "center", textDecoration: "none", width: "100%" }}
              >
                <span>Acquista ora</span>
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 40, color: "var(--muted)", fontSize: "0.8rem" }}>
          I biglietti sono validi per una singola giornata. Sconti disponibili per gruppi. Contattaci per info.
        </p>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ nome: "", email: "", messaggio: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contatti" style={{ padding: "100px 0", background: "rgba(12,10,6,0.55)", backdropFilter: "blur(8px)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>
            Contatti
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 20 }}>
            Scrivici,{" "}
            <em className="gold-gradient" style={{ fontStyle: "italic" }}>Siamo qui</em>
          </h2>
          <div className="gold-divider" style={{ margin: "0 auto 24px" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60 }}>
          {/* Info */}
          <div>
            <h3 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 28 }}>
              Collisioni ETS & Jonathan Livingston ODV
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.85, marginBottom: 36 }}>
              Associazione culturale con sede a Carini, in provincia di Palermo. Promuoviamo il territorio e le sue eccellenze attraverso eventi, festival e iniziative culturali a impatto locale.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: MapPin, label: "Dove siamo", value: "Castello di Carini\nCorso Umberto I, Carini 90044" },
                { icon: Phone, label: "Telefono", value: "+39 331 535 0706" },
                { icon: Mail, label: "Email", value: "collisioniets@gmail.com" },
                { icon: Clock, label: "Orario Evento", value: "Ore 15:00 – 19:00\n(III Edizione 2026)" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={16} color="var(--gold)" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text)", whiteSpace: "pre-line" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div
                style={{
                  background: "rgba(8,6,3,0.6)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  padding: "48px 32px",
                  textAlign: "center",
                }}
              >
                <div className="gold-gradient font-display" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>
                  Grazie!
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  Il tuo messaggio è stato inviato. Ti risponderemo al più presto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Il tuo nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="tua@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Messaggio
                  </label>
                  <textarea
                    className="form-input"
                    placeholder="Come possiamo aiutarti?"
                    rows={5}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-gold" style={{ marginTop: 8 }}>
                  <span>Invia Messaggio</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "rgba(8,6,3,0.7)", backdropFilter: "blur(16px)", borderTop: "1px solid var(--border)", padding: "48px 0 32px" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="/logo.png" alt="Castello di Vino" style={{ height: 36, width: "auto", objectFit: "contain", opacity: 0.85 }} />
            </div>
            <p style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.8 }}>
              Festival del vino artigianale al Castello di Carini. Celebriamo la cultura enologica siciliana in un contesto storico senza pari.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Navigazione
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} style={{ color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Date
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { ed: "I Edizione", date: "9 – 10 Giugno 2024" },
                { ed: "II Edizione", date: "9 – 11 Maggio 2025" },
                { ed: "III Edizione", date: "20 – 21 Giugno 2026" },
              ].map((d, i) => (
                <div key={i}>
                  <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: 2 }}>{d.ed}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text)" }}>{d.date}</div>
                </div>
              ))}
              <div style={{ marginTop: 4, fontSize: "0.8rem", color: "var(--muted)" }}>
                <Clock size={10} style={{ display: "inline", marginRight: 4 }} />
                Ore 15:00 – 19:00
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
              Contatti
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Collisioni ETS & Jonathan Livingston ODV</div>
              <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Corso Umberto I, Carini 90044</div>
              <a href="tel:+393315350706" style={{ fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none" }}>
                +39 331 535 0706
              </a>
              <a href="mailto:collisioniets@gmail.com" style={{ fontSize: "0.85rem", color: "var(--gold)", textDecoration: "none" }}>
                collisioniets@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            © 2025 Collisioni ETS & Jonathan Livingston ODV · Tutti i diritti riservati
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            Castello La Grua-Talamanca · Carini, Palermo · Sicilia
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- MAIN PAGE ---
export default function IndexPage() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Mission />
      <About />
      <Espositori />
      <Programma />
      <Ticket />
      <Contact />
      <Footer />
    </div>
  );
}
