# Turntable layers

These images stack on top of each other. Every file is 1536×1024 and lines up with the others.

| File | What it is | Moves? |
|---|---|---|
| `01-base.png` | Wood, plinth, dials, tonearm pivot, empty black mat | No |
| `02-vinyl.png` | White record, see-through centre | Spins |
| `03-label.png` | Cream label with the face logo | Spins |
| `04-tonearm-spindle.png` | Tonearm, its shadow, and the centre pin | No |
| `05-grain-tile.png` | Repeating film-grain tile, drawn on top of everything | No, it flickers |

Spin the record and the label around pixel (753, 478), which is `transform-origin: 49.03% 46.72%`. One full turn every 1.8 seconds matches 33⅓ rpm.

Open `demo.html` in a browser (it has to sit in this same folder) to see it spin with grain.

Grain strength is the `opacity` on `.grain` in `demo.html`. Higher is heavier. `background-size` controls how coarse the grain is.
