# Kitchen Cater — nettside

Statisk nettside for Kitchen Cater AS (indisk/pakistansk/kontinental catering & take away, Lørenskog).

Bygget med ren HTML/CSS/JS — ingen build-steg, ingen avhengigheter.

## Innhold

- `index.html` — forsiden
- `kontakt.html` — kontaktskjema + adresse/kart
- `css/style.css` — design
- `js/script.js` — interaktivitet (meny, mobilnav, PDF-menyvisning, kontaktskjema, scroll-animasjoner)
- `assets/meny.pdf` — nedlastbar/forhåndsvisbar meny
- `assets/logos/` — logoer for bedriftskunder

## Kildekode

Ligger på GitHub: https://github.com/nilidesign/kitchen-cater-no

```bash
git clone https://github.com/nilidesign/kitchen-cater-no.git
```

## Hosting: Cloudflare (Workers static assets)

Siden er live på:
- **https://kitchen-cater.no** (og www.kitchen-cater.no)
- https://kitchen-cater-no.nilan-perumal.workers.dev (workers.dev-adresse, fungerer alltid)

### Automatisk deploy (GitHub Actions)

Hver `git push` til `main` deployer automatisk til Cloudflare via
`.github/workflows/deploy.yml`. Dette krever at repo-secreten
`CLOUDFLARE_API_TOKEN` er satt (Settings → Secrets and variables → Actions
på GitHub-repoet), opprettet med malen **"Edit Cloudflare Workers"** på
[dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).

Vanlig arbeidsflyt for en innholdsendring:
```bash
git add .
git commit -m "Beskrivelse av endringen"
git push
```
Det er alt — ingen manuell deploy-kommando nødvendig.

### Manuell deploy (om nødvendig)

```bash
npx wrangler login      # kun første gang på en ny maskin
npx wrangler deploy
```

`wrangler.jsonc` styrer deployet. `.assetsignore` sørger for at utviklingsfiler
(`.git`, `.wrangler`, `.claude`, osv.) **ikke** blir lastet opp og servert offentlig
— ikke fjern denne filen.

### Eget domene (kitchen-cater.no)

Allerede koblet til via `routes` i `wrangler.jsonc` (custom domain på både
apex og www). DNS driftes hos Cloudflare — nameserverne ble byttet hos
Domeneshop, og gamle "parkert side"-poster (A/AAAA) er fjernet fra DNS.

## Redigere innhold

- Tekst og lenker: `index.html` / `kontakt.html`
- Farger og design: `:root`-variablene øverst i `css/style.css`
- E-postadresse for kontaktskjemaet: `CONTACT_EMAIL` øverst i `js/script.js`
- Bilder: de fleste hentes fra Wikimedia Commons (fri lisens). Bytt gjerne ut med egne bilder for et enda mer personlig preg.

## Bestilling

De fleste "Bestill"-knappene peker til Foodora. Catering-/selskapslokale-knapper peker til `kontakt.html`. Oppdater lenkene direkte i HTML-filene dersom noe endres.
