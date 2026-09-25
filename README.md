# Kitchen Cater — nettside

Enkel, statisk nettside for Kitchen Cater AS (indisk/pakistansk catering & take away, Lørenskog).

Bygget med ren HTML/CSS/JS — ingen build-steg, ingen avhengigheter. Klar for gratis hosting på GitHub Pages.

## Innhold

- `index.html` — hele siden
- `css/style.css` — design
- `js/script.js` — interaktivitet (meny, mobilnav, galleri-lightbox, scroll-animasjoner)

## Publisere på GitHub Pages (gratis)

1. Opprett et nytt repo på GitHub, f.eks. `kitchencater.no`.
2. Push denne mappen til repoet:
   ```bash
   git init
   git add .
   git commit -m "Første versjon av Kitchen Cater-nettsiden"
   git branch -M main
   git remote add origin https://github.com/<ditt-brukernavn>/kitchencater.no.git
   git push -u origin main
   ```
3. Gå til repoet på GitHub → **Settings → Pages**.
4. Under **Build and deployment**, velg **Deploy from a branch**.
5. Velg branch `main` og mappe `/ (root)`, trykk **Save**.
6. Etter ett par minutter er siden live på `https://<ditt-brukernavn>.github.io/kitchencater.no/`.

### Eget domene (valgfritt)

Har dere et domene (f.eks. kitchencater.no), legg til en `CNAME`-fil i rotmappen med domenet som innhold, og pek domenets DNS til GitHub Pages (se GitHub sin dokumentasjon for "Managing a custom domain").

## Redigere innhold

- Tekst og lenker: `index.html`
- Farger og design: `:root`-variablene øverst i `css/style.css`
- Bilder: hentes fra Wikimedia Commons (fri lisens). Bytt gjerne ut med egne bilder av rettene deres for et enda mer personlig preg — legg dem i `assets/` og oppdater `src`-attributtene i `index.html`.

## Bestilling

Bestill-knappene peker til Foodora-siden til Kitchen Cater. Oppdater lenken i `index.html` (søk og erstatt) dersom URL-en endres.
