# Collisioni ETS — sito (app separata)

Sito **ex novo** per l'associazione culturale **Collisioni ETS** di Carini (PA).
È un pacchetto autonomo del monorepo, distinto dal sito "Castello di Vino"
(`packages/web`). Non lo sostituisce.

## Avvio
```sh
bun run dev:collisioni      # dalla root — parte su http://localhost:5174
# oppure
cd packages/collisioni && bunx vite
```

## Concept
"Collisioni" = l'incontro: dove persone, idee e luoghi si incontrano nasce cultura.
Interfaccia moderna e foto-centrica, costruita attorno al simbolo dell'ente (il gabbiano).
Cifra visiva: la *collisione* tra un colore caldo (corallo) e uno freddo (teal).

## Colori
- Paper: `#f6f2ea` / `#efe9dd` · Ink: `#17202a`
- Corallo `#e2593f` · Teal `#1f7a8c` · Gold `#e0a43b` · Night `#101a22`

## Tipografia
- Display: **Fraunces** · UI: **Inter**

## Sezioni
Hero fotografico full-screen → Marquee → Chi siamo (foto) → Ambiti →
Progetti (bento con foto) → Banda fotografica → Stats → Rete → Contatti → Footer.

## Foto
Le foto (di proprietà di Collisioni ETS) vanno in `public/media/` con i nomi in
`public/media/README.md`. Finché un file manca, il componente `Img` mostra un
placeholder brandizzato col gabbiano.

## Dati istituzionali
Collisioni ETS — C.F. 97384650822 — RUNTS Rep. n. 144409 sez. g) —
Via Cangialosi 119, 90044 Carini (PA).
