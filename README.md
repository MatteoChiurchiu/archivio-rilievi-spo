# Report SPO - Deploy Cloud

Questa app puo essere pubblicata online e usata da piu persone tramite un unico URL.

## 1) Prerequisiti

- Endpoint Google Apps Script gia funzionante (`/exec`)
- Account Render (gratuito)
- Repository GitHub con questo progetto
- Password condivisa per accesso app (`APP_PASSWORD`)

## 2) Preparazione GitHub

1. Crea un repository vuoto su GitHub, ad esempio `report-spo`.
2. Nel progetto locale esegui:

```bash
git init
git add .
git commit -m "feat: app report SPO con cloud sync"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/report-spo.git
git push -u origin main
```

1. Se GitHub chiede login, usa browser o token personale.
2. Verifica che i file risultino online su GitHub.

## 3) Pubblicazione su Render

1. Carica il progetto su GitHub.
2. In Render: New + > Blueprint.
3. Seleziona il repository.
4. Render leggera automaticamente `render.yaml`.
5. In Environment Variables imposta:
   - `DEFAULT_CLOUD_ENDPOINT` = URL web app Google Script (`.../exec`)
   - `APP_PASSWORD` = password condivisa per entrare in app
6. Deploy.

Al termine ricevi un URL pubblico, ad esempio:

- `https://report-spo.onrender.com`

## 4) Uso con altri utenti

1. Condividi l'URL pubblico Render.
2. Ogni utente inserisce email e password condivisa al primo accesso.
3. I dati vengono sincronizzati tramite Google Apps Script (stesso archivio cloud).
4. Ogni modifica viene tracciata con l'email utente nella commessa.

## 5) Note importanti

- Il file locale `database/report_spo_db.json` su hosting cloud puo essere temporaneo.
- La fonte condivisa consigliata resta Google Apps Script.
- Se cambi il codice Apps Script, ricordati di fare un nuovo deploy Web App.

## 6) Avvio locale

```bash
npm install
npm start
```

Apri `http://localhost:3000`.
