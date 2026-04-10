const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_CLOUD_ENDPOINT = String(process.env.DEFAULT_CLOUD_ENDPOINT || "").trim();
const APP_PASSWORD = String(process.env.APP_PASSWORD || "").trim();
const DB_DIR = path.join(__dirname, "database");
const DB_FILE = path.join(DB_DIR, "report_spo_db.json");

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify({ commesse: [], activeCommessaId: null }, null, 2),
      "utf8"
    );
  }
}

function readDb() {
  ensureDb();
  const raw = fs.readFileSync(DB_FILE, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data.commesse)) {
    return { commesse: [], activeCommessaId: null };
  }
  return {
    commesse: data.commesse,
    activeCommessaId: data.activeCommessaId || null,
  };
}

function writeDb(payload) {
  const actor = String(payload?.__actorEmail || "sconosciuto").trim() || "sconosciuto";
  const safePayload = {
    commesse: Array.isArray(payload.commesse) ? payload.commesse : [],
    activeCommessaId: payload.activeCommessaId || null,
    lastWriteAt: new Date().toISOString(),
    lastWriteBy: actor,
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(safePayload, null, 2), "utf8");
}

function requireAuth(req, res, next) {
  if (!APP_PASSWORD) {
    next();
    return;
  }

  const provided = String(req.headers["x-app-password"] || "");
  if (provided !== APP_PASSWORD) {
    res.status(401).json({ error: "Non autorizzato" });
    return;
  }

  next();
}

app.use(express.json({ limit: "5mb" }));
app.use(express.static(__dirname));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, dbFile: DB_FILE });
});

app.get("/api/config", (req, res) => {
  res.json({
    defaultCloudEndpoint: DEFAULT_CLOUD_ENDPOINT,
    authRequired: Boolean(APP_PASSWORD),
  });
});

app.post("/api/login", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Email non valida" });
    return;
  }

  if (APP_PASSWORD && password !== APP_PASSWORD) {
    res.status(401).json({ error: "Credenziali non valide" });
    return;
  }

  res.json({ ok: true, email });
});

app.get("/api/state", requireAuth, (req, res) => {
  try {
    res.json(readDb());
  } catch (error) {
    res.status(500).json({ error: "Impossibile leggere il database" });
  }
});

app.put("/api/state", requireAuth, (req, res) => {
  try {
    writeDb({
      ...(req.body || {}),
      __actorEmail: String(req.headers["x-user-email"] || "sconosciuto"),
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Impossibile salvare il database" });
  }
});

app.post("/api/cloud", requireAuth, async (req, res) => {
  try {
    const endpoint = String(req.body?.endpoint || "").trim();
    const action = req.body?.action;

    if (!endpoint) {
      res.status(400).json({ error: "Endpoint cloud mancante" });
      return;
    }

    if (!endpoint.startsWith("https://script.google.com/macros/s/") || !endpoint.endsWith("/exec")) {
      res.status(400).json({ error: "Endpoint cloud non valido" });
      return;
    }

    if (action !== "save" && action !== "load") {
      res.status(400).json({ error: "Azione non valida" });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        payload: req.body?.payload,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      res.status(502).json({ error: `Cloud HTTP ${response.status}` });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(502).json({ error: "Cloud non raggiungibile" });
  }
});

app.listen(PORT, () => {
  ensureDb();
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Database file: ${DB_FILE}`);
});
