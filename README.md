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

Siden er live på: **https://kitchen-cater-no.nilan-perumal.workers.dev**

Deploy skjer med [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```bash
npx wrangler login      # kun første gang
npx wrangler deploy
```

`wrangler.jsonc` styrer deployet. `.assetsignore` sørger for at utviklingsfiler
(`.git`, `.wrangler`, `.claude`, osv.) **ikke** blir lastet opp og servert offentlig
— ikke fjern denne filen.

### Koble på eget domene (kitchen-cater.no)

Domenet er foreløpig ikke koblet til Cloudflare. For å aktivere `kitchen-cater.no`:

1. Logg inn på [dash.cloudflare.com](https://dash.cloudflare.com) → **Add a site** → skriv inn `kitchen-cater.no` → velg gratis-planen.
2. Cloudflare gir deg 2 nameservere (f.eks. `xxx.ns.cloudflare.com`).
3. Gå til domeneregistraren der `kitchen-cater.no` er kjøpt, og bytt nameserverne til de Cloudflare oppga. (Dette kan ta noen timer til opptil et døgn å slå gjennom.)
4. Når domenet viser som **Active** i Cloudflare-dashbordet, legg til dette i `wrangler.jsonc` (fjern kommentarlinjen og legg til):
   ```jsonc
   "routes": [
     { "pattern": "kitchen-cater.no", "custom_domain": true },
     { "pattern": "www.kitchen-cater.no", "custom_domain": true }
   ]
   ```
5. Kjør `npx wrangler deploy` på nytt.

## Redigere innhold

- Tekst og lenker: `index.html` / `kontakt.html`
- Farger og design: `:root`-variablene øverst i `css/style.css`
- E-postadresse for kontaktskjemaet: `CONTACT_EMAIL` øverst i `js/script.js`
- Bilder: de fleste hentes fra Wikimedia Commons (fri lisens). Bytt gjerne ut med egne bilder for et enda mer personlig preg.

## Bestilling

De fleste "Bestill"-knappene peker til Foodora. Catering-/selskapslokale-knapper peker til `kontakt.html`. Oppdater lenkene direkte i HTML-filene dersom noe endres.
