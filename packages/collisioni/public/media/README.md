# Foto del sito Collisioni ETS

Inserisci qui le foto/locandine (di proprietà di Collisioni ETS) con questi nomi
esatti. Il sito le mostra automaticamente; se un file manca, appare un
placeholder brandizzato con la sfera del logo.

| File                 | Dove appare                                   | Formato consigliato       |
|----------------------|-----------------------------------------------|---------------------------|
| hero.jpg             | Sfondo grande della sezione iniziale          | orizzontale, ~2000×1200   |
| comunita.jpg         | Sezione "Chi siamo"                           | verticale/quadrata, ~1000 |
| presepe.jpg          | Progetto: Presepe Vivente Storico             | orizzontale, ~1200×900    |
| calici.jpg           | Progetto: Calici sotto le Stelle              | orizzontale, ~1200×900    |
| carnevale.jpg        | Progetto: Gran Ballo Carnevale Rinascimentale | orizzontale, ~1200×900    |
| castellodivino.jpg   | Progetto: Castello di…Vino                    | orizzontale, ~1200×900    |
| anziani.jpg          | Progetto: Centro Anziani Attivi               | orizzontale, ~1200×900    |
| castello.jpg         | Banda fotografica a tutta larghezza           | orizzontale, ~2400×1000   |

## Logo ufficiale (IMPORTANTE)
Il sito usa AUTOMATICAMENTE il logo originale se lo metti in
`packages/collisioni/public/` (NON in questa cartella `media/`):

| File              | Uso                                              |
|-------------------|--------------------------------------------------|
| `logo.png`        | logo COLLISIONI con testo scuro (per sfondi chiari) |
| `logo-white.png`  | logo COLLISIONI con testo bianco (per sfondi scuri: hero e footer) |

PNG con sfondo trasparente (o SVG rinominato .png non va bene: usa PNG o cambia
il percorso nel codice). Finché questi file non ci sono, il sito mostra una
ricostruzione CSS del logo come ripiego.

## Come inserirle
Le immagini caricate in chat non arrivano automaticamente nel repository.
Per aggiungerle:
- **da GitHub**: apri la cartella `packages/collisioni/public/media/` nel branch
  `claude/new-site-graphic-interface-8hxuui`, usa "Add file → Upload files" e
  carica i file con i nomi qui sopra; oppure
- committale nel repo in locale.

Le locandine quadrate (es. Carnevale, Castello di…Vino) funzionano bene anche
nelle card; per l'hero è preferibile una foto orizzontale.

Consigli: JPG per le foto, sotto ~500 KB ciascuna quando possibile.
