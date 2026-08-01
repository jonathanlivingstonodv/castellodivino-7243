# Design — Collisioni ETS

## Concept
"Collisioni" = l'incontro. Dove persone, idee e luoghi si incontrano nasce cultura.
Identità editoriale, calda e mediterranea, costruita attorno al simbolo dell'ente: **il gabbiano**.
La cifra visiva è la *collisione* tra un colore caldo (corallo/terracotta, il sole di Sicilia) e uno freddo
(teal, il mar Tirreno) che si fondono in un gradiente.

## Colors
- Paper (bg): `#f6f2ea` · `#efe9dd`
- Ink (testo): `#17202a` · soft `#3d4753` · muted `#6b7480`
- Corallo (caldo): `#e2593f`
- Sea/teal (freddo): `#1f7a8c`
- Gold (accento): `#e0a43b`
- Night (sezioni scure): `#101a22` · `#14232d`
- Collision gradient: `corallo → gold → sea`

## Typography
- Display/Headings: **Fraunces** (serif contemporaneo, opsz)
- Body/UI: **Inter**

## Layout
- Sfondo carta chiaro, sezioni alternate paper / paper-2 / night
- Container max 1180px, ritmo di sezione generoso (6–7.5rem)
- Card bianche con bordo sottile e hover sollevato
- Gabbiani fluttuanti come motivo grafico ricorrente (SVG)

## Motion
- Reveal on scroll (IntersectionObserver) con fade-up staggerato
- Gabbiani in float/drift
- Navbar che si vela in blur allo scroll

## Sections (versione moderna, foto-centrica)
1. **Navbar** — glass su scroll, testo chiaro sopra l'hero fotografico
2. **Hero** — a tutto schermo (100svh) con foto di sfondo + scrim, claim grande
3. **Marquee** — parole chiave scorrevoli (Cultura, Patrimonio, Comunità…)
4. **Chi siamo** — foto verticale + mission + 3 pilastri
5. **Ambiti** — 8 settori statutari con icone
6. **Progetti** — **bento grid** con foto e didascalie in overlay
7. **Band** — banda fotografica a tutta larghezza con citazione
8. **Stats** — numeri chiave (fascia scura)
9. **Rete** — collaborazioni e partner
10. **Contatti** — info + form
11. **Footer** — anagrafica ente (CF, RUNTS, sede)

## Foto
Le foto (di proprietà di Collisioni ETS) vanno in `packages/web/public/media/`
con i nomi indicati nel README di quella cartella (hero.jpg, comunita.jpg,
presepe.jpg, carnevale.jpg, anziani.jpg, castello.jpg). Finché un file manca,
il componente `Img` mostra un placeholder brandizzato col gabbiano.

## Dati istituzionali (reali)
- Collisioni ETS — C.F. 97384650822 — RUNTS Rep. n. 144409 sez. g)
- Via Cangialosi 119, 90044 Carini (PA) — costituita 09/10/2024
