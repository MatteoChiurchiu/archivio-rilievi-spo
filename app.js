const STORAGE_KEY = "spo_commesse_archive_v2";
const CLOUD_ENDPOINT_KEY = "spo_cloud_endpoint";
const AUTH_SESSION_KEY = "spo_auth_session_v1";

const HARDWARE_ITEMS = [
  { key: "camere", label: "Macchine fotografiche" },
  { key: "displayCaviGps", label: "Display cavi e antenna GPS" },
  { key: "moduloControllo", label: "Modulo di controllo" },
  { key: "cinghie", label: "Cinghie ancoraggio" },
  { key: "prolunghe", label: "Prolunghe elettriche" },
  { key: "ssdControlBox", label: "Dischi SSD control box" },
  { key: "adattatoriSsd", label: "Adattatori SSD" },
  { key: "dischiBackup", label: "Dischi backup e docker station" },
  { key: "computer", label: "Computer" },
];

const MONTAGGIO_ITEMS = [
  { key: "montaggioFotocamere", label: "Montaggio Fotocamere" },
  { key: "montaggioModulo", label: "Montaggio modulo controllo" },
  { key: "montaggioDisplay", label: "Montaggio display" },
  { key: "montaggioAntenna", label: "Montaggio antenna GPS" },
  { key: "montaggioBatterie", label: "Montaggio batterie" },
  { key: "caviRiserva", label: "Cavi di riserva" },
  { key: "topoflight", label: "Avvio topoflight e caricamento missione" },
  { key: "ixCapture", label: "Avvio IX capture" },
  { key: "cartelleLavoro", label: "Creazione cartelle di lavoro" },
  { key: "scattiProva", label: "Scatti di prova" },
  { key: "verificaGpsExif", label: "Verifica dati GPS/EXIF" },
];

const state = {
  commesse: [],
  activeCommessaId: null,
  editCommessaId: null,
  cloudEndpoint: "",
  backendAvailable: false,
  authRequired: false,
  currentUser: {
    email: "",
    password: "",
  },
};

const dom = {
  commessaForm: document.getElementById("commessa-form"),
  commessaCodice: document.getElementById("commessa-codice"),
  commessaNome: document.getElementById("commessa-nome"),
  commessaCliente: document.getElementById("commessa-cliente"),
  commessaSaveBtn: document.getElementById("commessa-save-btn"),
  commessaCancelEdit: document.getElementById("commessa-cancel-edit"),
  commesseList: document.getElementById("commesse-list"),
  commesseCount: document.getElementById("commesse-count"),
  activeCommessaChip: document.getElementById("active-commessa-chip"),

  workForm: document.getElementById("work-form"),
  localita: document.getElementById("commessa-localita"),
  data: document.getElementById("commessa-data"),
  posizione: document.getElementById("commessa-posizione"),
  geoBtn: document.getElementById("geo-btn"),
  geoStatus: document.getElementById("geo-status"),

  checkHardware: document.getElementById("check-hardware"),
  checkMontaggio: document.getElementById("check-montaggio"),

  gMeteo: document.getElementById("g-meteo"),
  gFoschia: document.getElementById("g-foschia"),
  giornaleSessions: document.getElementById("giornale-sessions"),
  gNote: document.getElementById("g-note"),
  historyList: document.getElementById("history-list"),

  exportDataBtn: document.getElementById("export-data"),
  importDataInput: document.getElementById("import-data"),
  printPdfBtn: document.getElementById("print-pdf"),
  cloudEndpoint: document.getElementById("cloud-endpoint"),
  saveCloudBtn: document.getElementById("save-cloud"),
  loadCloudBtn: document.getElementById("load-cloud"),
  cloudStatus: document.getElementById("cloud-status"),
  userBadge: document.getElementById("user-badge"),
  changeUserBtn: document.getElementById("change-user"),
  authModal: document.getElementById("auth-modal"),
  authForm: document.getElementById("auth-form"),
  authEmail: document.getElementById("auth-email"),
  authPassword: document.getElementById("auth-password"),
  authStatus: document.getElementById("auth-status"),
};

function apiUrl(path) {
  return `${window.location.origin}${path}`;
}

function authHeaders() {
  const headers = {};
  if (state.currentUser.email) {
    headers["x-user-email"] = state.currentUser.email;
  }
  if (state.currentUser.password) {
    headers["x-app-password"] = state.currentUser.password;
  }
  return headers;
}

function renderUserBadge() {
  if (!state.currentUser.email) {
    dom.userBadge.textContent = "Utente non autenticato";
    dom.userBadge.classList.add("muted");
    return;
  }

  dom.userBadge.textContent = `Utente: ${state.currentUser.email}`;
  dom.userBadge.classList.remove("muted");
}

function setAuthStatus(message) {
  dom.authStatus.textContent = message;
}

function showAuthModal() {
  dom.authModal.classList.remove("hidden");
  dom.authEmail.value = state.currentUser.email || "";
  dom.authPassword.value = state.currentUser.password || "";
  setAuthStatus("");
}

function hideAuthModal() {
  dom.authModal.classList.add("hidden");
}

function snapshotState() {
  return {
    commesse: state.commesse,
    activeCommessaId: state.activeCommessaId,
  };
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function emptyChecks(items) {
  const out = {};
  for (const item of items) {
    out[item.key] = false;
  }
  return out;
}

function defaultStrisciata(index) {
  return {
    id: index + 1,
    direzione: "",
    parziale: false,
    completa: false,
    note: "",
  };
}

function defaultSessioneLavoro() {
  return {
    accensioneMotore: "",
    decollo: "",
    inizioAcquisizioneFoto: "",
    numeroStrisciate: 0,
    strisciate: [],
    fineLavori: "",
    globalMapper: false,
    atterraggio: "",
    spegnimentoMotori: "",
  };
}

function normalizeSessioneLavoro(sessione, index) {
  const merged = {
    ...defaultSessioneLavoro(),
    ...(sessione || {}),
  };

  const safeCount = Math.max(0, Number(merged.numeroStrisciate) || 0);
  const old = Array.isArray(merged.strisciate) ? merged.strisciate : [];
  const next = [];

  for (let i = 0; i < safeCount; i += 1) {
    const row = old[i] || defaultStrisciata(i);
    next.push({
      ...defaultStrisciata(i),
      ...row,
      id: Number(row.id) || i + 1,
      direzione: row.direzione ?? "",
      parziale: Boolean(row.parziale),
      completa: Boolean(row.completa),
      note: String(row.note ?? ""),
    });
  }

  return {
    ...merged,
    sessioneNumero: index + 1,
    numeroStrisciate: safeCount,
    strisciate: next,
  };
}

function defaultGiornale() {
  return {
    meteo: "",
    foschia: false,
    sessioni: [normalizeSessioneLavoro(defaultSessioneLavoro(), 0)],
    note: "",
  };
}

function createCommessa(payload) {
  const now = new Date().toISOString();
  const by = state.currentUser.email || "sconosciuto";
  return {
    id: uid("commessa"),
    codice: payload.codice,
    nome: payload.nome,
    cliente: payload.cliente,
    localita: "",
    data: new Date().toISOString().slice(0, 10),
    posizione: null,
    checks: {
      hardware: emptyChecks(HARDWARE_ITEMS),
      montaggio: emptyChecks(MONTAGGIO_ITEMS),
    },
    giornale: defaultGiornale(),
    createdAt: now,
    updatedAt: now,
    updatedBy: by,
    history: [
      {
        at: now,
        by,
        action: "Creazione commessa",
      },
    ],
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshotState()));
  localStorage.setItem(CLOUD_ENDPOINT_KEY, state.cloudEndpoint || "");
  sessionStorage.setItem(
    AUTH_SESSION_KEY,
    JSON.stringify({
      email: state.currentUser.email,
      password: state.currentUser.password,
    })
  );
  void saveStateToBackend();
}

function normalizeLoadedData(raw) {
  const envelope = normalizeStateEnvelope(raw);
  const commesse = envelope.commesse;

  return commesse.map((c) => ({
    id: c.id || uid("commessa"),
    codice: c.codice || "",
    nome: c.nome || "",
    cliente: c.cliente || "",
    localita: c.localita || "",
    data: c.data || new Date().toISOString().slice(0, 10),
    posizione: c.posizione || null,
    checks: {
      hardware: {
        ...emptyChecks(HARDWARE_ITEMS),
        ...(c.checks?.hardware || {}),
      },
      montaggio: {
        ...emptyChecks(MONTAGGIO_ITEMS),
        ...(c.checks?.montaggio || {}),
      },
    },
    giornale: normalizeGiornaleData(c.giornale),
    createdAt: c.createdAt || new Date().toISOString(),
    updatedAt: c.updatedAt || new Date().toISOString(),
    updatedBy: c.updatedBy || "",
    history: Array.isArray(c.history) ? c.history : [],
  }));
}

function parseMaybeJson(value) {
  if (typeof value !== "string") {
    return value;
  }

  const text = value.trim();
  if (!text) {
    return value;
  }

  if (!(text.startsWith("{") || text.startsWith("["))) {
    return value;
  }

  try {
    return JSON.parse(text);
  } catch {
    return value;
  }
}

function normalizeStateEnvelope(raw) {
  const parsed = parseMaybeJson(raw);
  const roots = [parsed, parsed?.payload, parsed?.data, parsed?.state, parsed?.result, parsed?.value];

  for (const root of roots) {
    const candidate = parseMaybeJson(root);

    if (Array.isArray(candidate)) {
      return {
        commesse: candidate,
        activeCommessaId: candidate[0]?.id || null,
        recognized: true,
      };
    }

    if (candidate && typeof candidate === "object" && Array.isArray(candidate.commesse)) {
      return {
        commesse: candidate.commesse,
        activeCommessaId: candidate.activeCommessaId || null,
        recognized: true,
      };
    }
  }

  return {
    commesse: [],
    activeCommessaId: null,
    recognized: false,
  };
}

function normalizeGiornaleData(giornale) {
  const base = {
    ...defaultGiornale(),
    ...(giornale || {}),
  };

  if (Array.isArray(base.sessioni) && base.sessioni.length > 0) {
    return {
      ...base,
      sessioni: base.sessioni.map((sessione, index) => normalizeSessioneLavoro(sessione, index)),
    };
  }

  const legacySessione = normalizeSessioneLavoro(
    {
      accensioneMotore: base.accensioneMotore || "",
      decollo: base.decollo || "",
      inizioAcquisizioneFoto: base.inizioAcquisizioneFoto || "",
      numeroStrisciate: Number(base.numeroStrisciate) || 0,
      strisciate: Array.isArray(base.strisciate) ? base.strisciate : [],
      fineLavori: base.fineLavori || "",
      globalMapper: Boolean(base.globalMapper),
      atterraggio: base.atterraggio || "",
      spegnimentoMotori: base.spegnimentoMotori || "",
    },
    0
  );

  return {
    meteo: base.meteo || "",
    foschia: Boolean(base.foschia),
    sessioni: [legacySessione],
    note: base.note || "",
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  state.cloudEndpoint = localStorage.getItem(CLOUD_ENDPOINT_KEY) || "";
  try {
    const savedSession = JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY) || "{}");
    state.currentUser.email = String(savedSession.email || "").trim();
    state.currentUser.password = String(savedSession.password || "");
  } catch {
    state.currentUser.email = "";
    state.currentUser.password = "";
  }
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const envelope = normalizeStateEnvelope(parsed);
    state.commesse = normalizeLoadedData(envelope);
    state.activeCommessaId =
      envelope.activeCommessaId && state.commesse.some((c) => c.id === envelope.activeCommessaId)
        ? envelope.activeCommessaId
        : state.commesse[0]?.id || null;
  } catch {
    console.warn("Archivio locale non valido");
  }
}

async function checkBackendAvailability() {
  try {
    const response = await fetch(apiUrl("/api/health"), { method: "GET", headers: authHeaders() });
    state.backendAvailable = response.ok;
  } catch {
    state.backendAvailable = false;
  }
}

async function loadServerConfig() {
  if (!state.backendAvailable) {
    return;
  }

  try {
    const response = await fetch(apiUrl("/api/config"), { method: "GET", headers: authHeaders() });
    if (!response.ok) {
      return;
    }

    const config = await response.json();
    const serverEndpoint = String(config?.defaultCloudEndpoint || "").trim();
    state.authRequired = Boolean(config?.authRequired);
    if (serverEndpoint && !state.cloudEndpoint) {
      state.cloudEndpoint = serverEndpoint;
      localStorage.setItem(CLOUD_ENDPOINT_KEY, serverEndpoint);
    }
  } catch {
    console.warn("Config server non disponibile");
  }
}

async function loadStateFromBackend() {
  if (!state.backendAvailable) {
    return;
  }

  try {
    const response = await fetch(apiUrl("/api/state"), { method: "GET", headers: authHeaders() });
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    const envelope = normalizeStateEnvelope(data);
    state.commesse = normalizeLoadedData(envelope);
    state.activeCommessaId =
      envelope.activeCommessaId && state.commesse.some((c) => c.id === envelope.activeCommessaId)
        ? envelope.activeCommessaId
        : state.commesse[0]?.id || null;
  } catch {
    console.warn("Lettura backend non riuscita");
  }
}

async function saveStateToBackend() {
  if (!state.backendAvailable) {
    return;
  }

  if (state.authRequired && (!state.currentUser.email || !state.currentUser.password)) {
    return;
  }

  try {
    await fetch(apiUrl("/api/state"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify(snapshotState()),
    });
  } catch {
    console.warn("Salvataggio backend non riuscito");
  }
}

function setCloudStatus(message) {
  dom.cloudStatus.textContent = message;
}

function formatDateTime(iso) {
  if (!iso) {
    return "n.d.";
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "n.d.";
  }

  return date.toLocaleString("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function markCommessaUpdated(commessa, action) {
  commessa.updatedAt = new Date().toISOString();
  commessa.updatedBy = state.currentUser.email || "sconosciuto";
  const history = Array.isArray(commessa.history) ? commessa.history : [];
  history.push({
    at: commessa.updatedAt,
    by: commessa.updatedBy,
    action,
  });
  commessa.history = history.slice(-40);
}

async function tryLogin(email, password, options = {}) {
  const trackLogin = Boolean(options.trackLogin);

  if (!state.backendAvailable || !state.authRequired) {
    state.currentUser.email = email;
    state.currentUser.password = password;
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ email, password }));

    if (trackLogin) {
      const active = getActiveCommessa();
      if (active) {
        markCommessaUpdated(active, "Login utente");
        saveState();
      }
    }

    renderUserBadge();
    hideAuthModal();
    return true;
  }

  const response = await fetch(apiUrl("/api/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return false;
  }

  state.currentUser.email = email;
  state.currentUser.password = password;
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ email, password }));

  if (trackLogin) {
    const active = getActiveCommessa();
    if (active) {
      markCommessaUpdated(active, "Login utente");
      saveState();
    }
  }

  renderUserBadge();
  hideAuthModal();
  return true;
}

function getCloudEndpoint() {
  return (state.cloudEndpoint || "").trim();
}

async function callCloud(action) {
  const endpoint = getCloudEndpoint();

  if (state.authRequired && (!state.currentUser.email || !state.currentUser.password)) {
    throw new Error("Auth richiesta");
  }

  if (state.backendAvailable) {
    const response = await fetch(apiUrl("/api/cloud"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({
        endpoint,
        action,
        payload: action === "save" ? snapshotState() : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error("Proxy cloud non disponibile");
    }

    return response.json();
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({
      action,
      payload: action === "save" ? snapshotState() : undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function pushToCloud() {
  const endpoint = getCloudEndpoint();
  if (!endpoint) {
    setCloudStatus("Inserisci prima l'URL Web App di Google Apps Script.");
    return;
  }

  setCloudStatus("Invio dati al cloud in corso...");

  try {
    await callCloud("save");

    setCloudStatus(state.backendAvailable ? "Salvataggio cloud completato (via server)." : "Salvataggio cloud completato.");
  } catch {
    setCloudStatus(
      state.backendAvailable
        ? "Cloud non raggiungibile: verifica URL Web App o permessi deploy."
        : "Cloud non raggiungibile (probabile blocco CORS): avvia il server locale con npm start."
    );
  }
}

async function pullFromCloud() {
  const endpoint = getCloudEndpoint();
  if (!endpoint) {
    setCloudStatus("Inserisci prima l'URL Web App di Google Apps Script.");
    return;
  }

  setCloudStatus("Caricamento dati dal cloud in corso...");

  try {
    const data = await callCloud("load");
    if (data?.error) {
      setCloudStatus(`Errore cloud: ${data.error}`);
      return;
    }

    const envelope = normalizeStateEnvelope(data);
    if (!envelope.recognized) {
      setCloudStatus("Formato risposta cloud non valido o non compatibile.");
      return;
    }

    state.commesse = normalizeLoadedData(envelope);
    state.activeCommessaId =
      envelope.activeCommessaId && state.commesse.some((c) => c.id === envelope.activeCommessaId)
        ? envelope.activeCommessaId
        : state.commesse[0]?.id || null;
    state.editCommessaId = null;
    saveState();
    render();
    setCloudStatus(state.backendAvailable ? "Caricamento cloud completato (via server)." : "Caricamento cloud completato.");
  } catch {
    setCloudStatus(
      state.backendAvailable
        ? "Cloud non raggiungibile: verifica URL Web App o permessi deploy."
        : "Cloud non raggiungibile (probabile blocco CORS): avvia il server locale con npm start."
    );
  }
}

function getActiveCommessa() {
  return state.commesse.find((c) => c.id === state.activeCommessaId) || null;
}

function renderCommessaHistory(commessa) {
  if (!dom.historyList) {
    return;
  }

  dom.historyList.innerHTML = "";

  if (!commessa) {
    dom.historyList.innerHTML = "<li>Nessuna commessa selezionata.</li>";
    return;
  }

  const history = Array.isArray(commessa.history) ? [...commessa.history].reverse() : [];
  if (history.length === 0) {
    dom.historyList.innerHTML = "<li>Nessuna modifica registrata.</li>";
    return;
  }

  const visible = history.slice(0, 12);
  for (const item of visible) {
    const li = document.createElement("li");
    li.textContent = `${formatDateTime(item.at)} - ${item.by || "sconosciuto"}: ${item.action || "Modifica"}`;
    dom.historyList.appendChild(li);
  }
}

function setActiveCommessa(commessaId) {
  state.activeCommessaId = commessaId;
  saveState();
  render();
}

function setEditMode(commessa) {
  state.editCommessaId = commessa?.id || null;

  if (!commessa) {
    dom.commessaForm.reset();
    dom.commessaSaveBtn.textContent = "Crea commessa";
    dom.commessaCancelEdit.classList.add("hidden");
    return;
  }

  dom.commessaCodice.value = commessa.codice;
  dom.commessaNome.value = commessa.nome;
  dom.commessaCliente.value = commessa.cliente;
  dom.commessaSaveBtn.textContent = "Salva modifica";
  dom.commessaCancelEdit.classList.remove("hidden");
}

function renderCommesse() {
  dom.commesseList.innerHTML = "";
  dom.commesseCount.textContent = String(state.commesse.length);

  if (state.commesse.length === 0) {
    dom.commesseList.innerHTML = "<p>Nessuna commessa creata.</p>";
    dom.activeCommessaChip.textContent = "Nessuna commessa selezionata";
    dom.activeCommessaChip.classList.add("muted");
    return;
  }

  const active = getActiveCommessa();
  dom.activeCommessaChip.textContent = active
    ? `${active.codice} - ${active.nome}`
    : "Nessuna commessa selezionata";
  dom.activeCommessaChip.classList.toggle("muted", !active);

  for (const commessa of state.commesse) {
    const card = document.createElement("article");
    card.className = `commessa-card ${commessa.id === state.activeCommessaId ? "active" : ""}`;

    card.innerHTML = `
      <h3>${commessa.codice} - ${commessa.nome}</h3>
      <p>${commessa.cliente}</p>
      <p>Ultima modifica: ${commessa.updatedBy || "n.d."} (${formatDateTime(commessa.updatedAt)})</p>
      <div class="commessa-card-footer">
        <button class="btn tiny ghost" data-work="${commessa.id}">Lavora</button>
        <button class="btn tiny ghost" data-edit="${commessa.id}">Modifica</button>
        <button class="btn tiny danger" data-delete="${commessa.id}">Cancella</button>
      </div>
    `;

    card.querySelector("[data-work]").addEventListener("click", (event) => {
      event.stopPropagation();
      setActiveCommessa(commessa.id);
    });

    card.querySelector("[data-edit]").addEventListener("click", (event) => {
      event.stopPropagation();
      setEditMode(commessa);
    });

    card.querySelector("[data-delete]").addEventListener("click", (event) => {
      event.stopPropagation();
      void deleteCommessa(commessa.id);
    });

    card.addEventListener("click", () => setActiveCommessa(commessa.id));
    dom.commesseList.appendChild(card);
  }
}

function renderChecklist(container, items, group, data) {
  container.innerHTML = "";

  items.forEach((item, index) => {
    const label = document.createElement("label");
    label.className = "check-inline";
    label.innerHTML = `
      <span class="check-order">${index + 1}.</span>
      <input type="checkbox" data-check-group="${group}" data-check-key="${item.key}" ${
      data[item.key] ? "checked" : ""
    } />
      ${item.label}
    `;
    container.appendChild(label);
  });
}

function buildStrisciateRows(tbody, strisciate, sessionIndex) {
  tbody.innerHTML = "";

  if (strisciate.length === 0) {
    tbody.innerHTML = "<tr><td colspan=\"5\">Nessuna strisciata. Inserisci il numero sopra.</td></tr>";
    syncStrisciateColumnWidths(tbody.closest("table"));
    return;
  }

  for (let i = 0; i < strisciate.length; i += 1) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="col-id"><input type="number" min="0" max="9999" step="1" class="str-id" data-session-index="${sessionIndex}" data-index="${i}" value="${strisciate[i].id ?? i + 1}" /></td>
      <td class="col-dir"><div class="dir-field"><input type="number" min="0" max="360" step="1" class="str-dir" data-session-index="${sessionIndex}" data-index="${i}" value="${strisciate[i].direzione ?? ""}" /><span class="dir-unit">deg</span></div></td>
      <td><input type="checkbox" class="str-parziale" data-session-index="${sessionIndex}" data-index="${i}" ${
      strisciate[i].parziale ? "checked" : ""
    } /></td>
      <td><input type="checkbox" class="str-completa" data-session-index="${sessionIndex}" data-index="${i}" ${
      strisciate[i].completa ? "checked" : ""
    } /></td>
      <td><input type="text" class="str-note" data-session-index="${sessionIndex}" data-index="${i}" value="${strisciate[i].note ?? ""}" placeholder="Note" /></td>
    `;
    tbody.appendChild(row);
  }

  syncStrisciateColumnWidths(tbody.closest("table"));
}

function syncStrisciateColumnWidths(table) {

  if (!table) {
    return;
  }

  const idInputs = table.querySelectorAll(".str-id");
  const dirInputs = table.querySelectorAll(".str-dir");

  const idMaxChars = getMaxColumnChars(idInputs, 3);
  const dirMaxChars = getMaxColumnChars(dirInputs, 4);

  table.style.setProperty("--col-id-ch", String(Math.max(idMaxChars, 3)));
  table.style.setProperty("--col-dir-ch", String(Math.max(dirMaxChars, 4)));
}

function getMaxColumnChars(inputs, fallbackChars) {
  let maxChars = fallbackChars;

  for (const input of inputs) {
    const valueChars = String(input.value ?? "").trim().length;
    const placeholderChars = String(input.placeholder ?? "").trim().length;
    maxChars = Math.max(maxChars, valueChars, placeholderChars);
  }

  return maxChars;
}

function renderGiornaleSessioni(sessioni) {
  dom.giornaleSessions.innerHTML = "";

  sessioni.forEach((sessione, index) => {
    const section = document.createElement("section");
    section.className = "giornale-session";
    section.dataset.sessionIndex = String(index);

    section.innerHTML = `
      <h4 class="session-title">Sessione lavoro ${index + 1}</h4>
      <div class="grid-2">
        <label>
          Accensione motore
          <input type="time" class="g-accensione" data-session-index="${index}" value="${sessione.accensioneMotore || ""}" />
        </label>
        <label>
          Decollo
          <input type="time" class="g-decollo" data-session-index="${index}" value="${sessione.decollo || ""}" />
        </label>
        <label>
          Inizio acquisizione foto
          <input type="time" class="g-inizio-acq" data-session-index="${index}" value="${sessione.inizioAcquisizioneFoto || ""}" />
        </label>
        <label>
          Numero strisciate
          <input type="number" min="0" step="1" class="g-num-strisciate" data-session-index="${index}" value="${sessione.numeroStrisciate || 0}" />
        </label>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="col-id">ID</th>
              <th class="col-dir">Direzione (deg)</th>
              <th>Parziale</th>
              <th>Completa</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody class="strisciate-body"></tbody>
        </table>
      </div>

      <div class="grid-2">
        <label>
          Fine lavori
          <input type="time" class="g-fine-lavori" data-session-index="${index}" value="${sessione.fineLavori || ""}" />
        </label>
        <label class="check-inline">
          <input type="checkbox" class="g-global-mapper" data-session-index="${index}" ${
            sessione.globalMapper ? "checked" : ""
          } />
          Check GLOBAL MAPPER
        </label>
        <label>
          Atterraggio
          <input type="time" class="g-atterraggio" data-session-index="${index}" value="${sessione.atterraggio || ""}" />
        </label>
        <label>
          Spegnimento motori
          <input type="time" class="g-spegnimento" data-session-index="${index}" value="${sessione.spegnimentoMotori || ""}" />
        </label>
      </div>

      <button type="button" class="btn ghost add-session-btn" data-session-index="${index}">Interruzione/Ripresa lavoro</button>
    `;

    dom.giornaleSessions.appendChild(section);

    const tbody = section.querySelector(".strisciate-body");
    buildStrisciateRows(tbody, sessione.strisciate || [], index);
  });
}

function ensureGiornaleSessione(active) {
  if (!Array.isArray(active.giornale.sessioni) || active.giornale.sessioni.length === 0) {
    active.giornale.sessioni = [normalizeSessioneLavoro(defaultSessioneLavoro(), 0)];
  }
}

function setWorkFormEnabled(enabled) {
  const controls = dom.workForm.querySelectorAll("input, textarea, button");
  for (const control of controls) {
    if (control.id === "geo-btn") {
      control.disabled = !enabled;
      continue;
    }
    control.disabled = !enabled;
  }
}

function renderWorkSheet() {
  const active = getActiveCommessa();

  if (!active) {
    dom.workForm.reset();
    dom.geoStatus.textContent = "Seleziona o crea una commessa per compilare la scheda.";
    dom.posizione.value = "";
    renderChecklist(dom.checkHardware, HARDWARE_ITEMS, "hardware", emptyChecks(HARDWARE_ITEMS));
    renderChecklist(dom.checkMontaggio, MONTAGGIO_ITEMS, "montaggio", emptyChecks(MONTAGGIO_ITEMS));
    dom.giornaleSessions.innerHTML = "";
    renderCommessaHistory(null);
    setWorkFormEnabled(false);
    return;
  }

  setWorkFormEnabled(true);

  dom.localita.value = active.localita || "";
  dom.data.value = active.data || "";

  if (active.posizione) {
    dom.posizione.value = `${active.posizione.lat.toFixed(6)}, ${active.posizione.lon.toFixed(6)}`;
    dom.geoStatus.textContent = `Precisione ${Math.round(active.posizione.accuracy)}m`;
  } else {
    dom.posizione.value = "";
    dom.geoStatus.textContent = "Posizione non ancora acquisita.";
  }

  renderChecklist(dom.checkHardware, HARDWARE_ITEMS, "hardware", active.checks.hardware);
  renderChecklist(dom.checkMontaggio, MONTAGGIO_ITEMS, "montaggio", active.checks.montaggio);

  ensureGiornaleSessione(active);
  dom.gMeteo.value = active.giornale.meteo || "";
  dom.gFoschia.checked = Boolean(active.giornale.foschia);
  dom.gNote.value = active.giornale.note || "";

  renderGiornaleSessioni(active.giornale.sessioni);
  renderCommessaHistory(active);
}

function render() {
  renderCommesse();
  renderWorkSheet();
}

function addOrUpdateCommessa(payload) {
  const codiceDuplicate = state.commesse.some(
    (c) => c.codice.toLowerCase() === payload.codice.toLowerCase() && c.id !== state.editCommessaId
  );

  if (codiceDuplicate) {
    alert("Esiste gia una commessa con questo codice.");
    return;
  }

  if (!state.editCommessaId) {
    const commessa = createCommessa(payload);
    state.commesse.push(commessa);
    state.activeCommessaId = commessa.id;
    saveState();
    render();
    return;
  }

  const target = state.commesse.find((c) => c.id === state.editCommessaId);
  if (!target) {
    return;
  }

  target.codice = payload.codice;
  target.nome = payload.nome;
  target.cliente = payload.cliente;
  markCommessaUpdated(target, "Modifica anagrafica commessa");
  state.activeCommessaId = target.id;

  setEditMode(null);
  saveState();
  render();
}

async function deleteCommessa(commessaId) {
  const ok = confirm("Vuoi cancellare definitivamente questa commessa?");
  if (!ok) {
    return;
  }

  state.commesse = state.commesse.filter((c) => c.id !== commessaId);

  if (state.editCommessaId === commessaId) {
    setEditMode(null);
  }

  if (state.activeCommessaId === commessaId) {
    state.activeCommessaId = state.commesse[0]?.id || null;
  }

  saveState();
  render();

  const endpoint = getCloudEndpoint();
  if (!endpoint) {
    return;
  }

  const syncCloudNow = confirm(
    "Commessa eliminata in locale. Vuoi aggiornare subito anche il cloud?"
  );

  if (!syncCloudNow) {
    setCloudStatus("Commessa eliminata in locale. Premi 'Salva su Cloud' per aggiornare il cloud.");
    return;
  }

  setCloudStatus("Aggiornamento cloud in corso dopo cancellazione...");

  try {
    await callCloud("save");
    setCloudStatus("Cancellazione sincronizzata anche sul cloud.");
  } catch {
    setCloudStatus("Errore aggiornamento cloud: la commessa e stata eliminata solo in locale.");
  }
}

function adjustStrisciateSessione(active, sessionIndex, count, sessionElement) {
  ensureGiornaleSessione(active);

  const sessione = active.giornale.sessioni[sessionIndex];
  if (!sessione) {
    return;
  }

  const safeCount = Math.max(0, Number(count) || 0);
  const old = Array.isArray(sessione.strisciate) ? sessione.strisciate : [];
  const next = [];

  for (let i = 0; i < safeCount; i += 1) {
    next.push(old[i] || defaultStrisciata(i));
  }

  sessione.numeroStrisciate = safeCount;
  sessione.strisciate = next;
  markCommessaUpdated(active, `Aggiornamento strisciate sessione ${sessionIndex + 1}: ${safeCount}`);
  saveState();

  const tbody = sessionElement.querySelector(".strisciate-body");
  if (tbody) {
    buildStrisciateRows(tbody, next, sessionIndex);
  }
}

function acquireGeolocation() {
  const active = getActiveCommessa();
  if (!active) {
    alert("Seleziona prima una commessa.");
    return;
  }

  if (!("geolocation" in navigator)) {
    dom.geoStatus.textContent = "Geolocalizzazione non supportata dal browser.";
    return;
  }

  dom.geoStatus.textContent = "Acquisizione posizione in corso...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      active.posizione = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy,
        capturedAt: new Date().toISOString(),
      };
      markCommessaUpdated(active, "Acquisizione geolocalizzazione");
      saveState();
      renderWorkSheet();
    },
    (error) => {
      const labels = {
        1: "Permesso negato",
        2: "Posizione non disponibile",
        3: "Timeout acquisizione",
      };
      dom.geoStatus.textContent = `Errore geolocalizzazione: ${labels[error.code] || "sconosciuto"}`;
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
}

function collectGiornaleFromForm(sessioni) {
  return {
    meteo: dom.gMeteo.value,
    foschia: dom.gFoschia.checked,
    sessioni: Array.isArray(sessioni)
      ? sessioni.map((sessione, index) => normalizeSessioneLavoro(sessione, index))
      : [normalizeSessioneLavoro(defaultSessioneLavoro(), 0)],
    note: dom.gNote.value.trim(),
  };
}

function bindEvents() {
  dom.printPdfBtn.addEventListener("click", () => {
    window.print();
  });

  dom.commessaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    addOrUpdateCommessa({
      codice: dom.commessaCodice.value.trim(),
      nome: dom.commessaNome.value.trim(),
      cliente: dom.commessaCliente.value.trim(),
    });

    if (!state.editCommessaId) {
      dom.commessaForm.reset();
    }
  });

  dom.commessaCancelEdit.addEventListener("click", () => {
    setEditMode(null);
  });

  dom.geoBtn.addEventListener("click", acquireGeolocation);

  dom.giornaleSessions.addEventListener("input", (event) => {
    const active = getActiveCommessa();
    if (!active) {
      return;
    }

    ensureGiornaleSessione(active);

    const target = event.target;
    const sessionIndex = Number(target.dataset.sessionIndex);
    const sessionElement = target.closest(".giornale-session");
    const sessione = active.giornale.sessioni[sessionIndex];

    if (!Number.isInteger(sessionIndex) || !sessione || !sessionElement) {
      return;
    }

    if (target.classList.contains("g-accensione")) {
      sessione.accensioneMotore = target.value;
      markCommessaUpdated(active, `Accensione sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    if (target.classList.contains("g-decollo")) {
      sessione.decollo = target.value;
      markCommessaUpdated(active, `Decollo sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    if (target.classList.contains("g-inizio-acq")) {
      sessione.inizioAcquisizioneFoto = target.value;
      markCommessaUpdated(active, `Inizio acquisizione sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    if (target.classList.contains("g-num-strisciate")) {
      adjustStrisciateSessione(active, sessionIndex, target.value, sessionElement);
      return;
    }

    if (target.classList.contains("g-fine-lavori")) {
      sessione.fineLavori = target.value;
      markCommessaUpdated(active, `Fine lavori sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    if (target.classList.contains("g-atterraggio")) {
      sessione.atterraggio = target.value;
      markCommessaUpdated(active, `Atterraggio sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    if (target.classList.contains("g-spegnimento")) {
      sessione.spegnimentoMotori = target.value;
      markCommessaUpdated(active, `Spegnimento sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    const index = Number(target.dataset.index);
    if (!Number.isInteger(index) || !sessione.strisciate[index]) {
      return;
    }

    if (target.classList.contains("str-id")) {
      const idValue = Math.max(0, Math.min(9999, Number(target.value) || 0));
      sessione.strisciate[index].id = idValue;
      target.value = String(idValue);
      syncStrisciateColumnWidths(sessionElement.querySelector("table"));
    }

    if (target.classList.contains("str-dir")) {
      const rawDir = String(target.value ?? "").trim();
      if (rawDir === "") {
        sessione.strisciate[index].direzione = "";
      } else {
        const dirValue = Math.max(0, Math.min(360, Number(rawDir) || 0));
        sessione.strisciate[index].direzione = dirValue;
        target.value = String(dirValue);
      }
      syncStrisciateColumnWidths(sessionElement.querySelector("table"));
    }

    if (target.classList.contains("str-note")) {
      sessione.strisciate[index].note = target.value;
    }

    markCommessaUpdated(active, `Modifica riga ${index + 1} sessione ${sessionIndex + 1}`);
    saveState();
  });

  dom.giornaleSessions.addEventListener("change", (event) => {
    const active = getActiveCommessa();
    if (!active) {
      return;
    }

    ensureGiornaleSessione(active);

    const target = event.target;
    const sessionIndex = Number(target.dataset.sessionIndex);
    const sessione = active.giornale.sessioni[sessionIndex];

    if (!Number.isInteger(sessionIndex) || !sessione) {
      return;
    }

    if (target.classList.contains("g-global-mapper")) {
      sessione.globalMapper = target.checked;
      markCommessaUpdated(active, `Global Mapper sessione ${sessionIndex + 1}`);
      saveState();
      return;
    }

    const index = Number(target.dataset.index);
    if (!Number.isInteger(index) || !sessione.strisciate[index]) {
      return;
    }

    if (target.classList.contains("str-parziale")) {
      sessione.strisciate[index].parziale = target.checked;
    }

    if (target.classList.contains("str-completa")) {
      sessione.strisciate[index].completa = target.checked;
    }

    markCommessaUpdated(active, `Spunte riga ${index + 1} sessione ${sessionIndex + 1}`);
    saveState();
  });

  dom.giornaleSessions.addEventListener("click", (event) => {
    const trigger = event.target.closest(".add-session-btn");
    if (!trigger) {
      return;
    }

    const active = getActiveCommessa();
    if (!active) {
      return;
    }

    ensureGiornaleSessione(active);
    active.giornale.sessioni.push(
      normalizeSessioneLavoro(defaultSessioneLavoro(), active.giornale.sessioni.length)
    );

    markCommessaUpdated(active, `Interruzione/ripresa: aggiunta sessione ${active.giornale.sessioni.length}`);
    saveState();
    renderWorkSheet();
  });

  dom.workForm.addEventListener("change", (event) => {
    const active = getActiveCommessa();
    if (!active) {
      return;
    }

    const checkGroup = event.target.dataset.checkGroup;
    const checkKey = event.target.dataset.checkKey;
    if (checkGroup && checkKey) {
      active.checks[checkGroup][checkKey] = event.target.checked;
      markCommessaUpdated(active, `Check ${checkGroup}: ${checkKey}`);
      saveState();
      return;
    }

    if (event.target.id === "g-meteo") {
      active.giornale.meteo = event.target.value;
      markCommessaUpdated(active, "Aggiornamento condizioni meteo");
      saveState();
      return;
    }

    if (event.target.id === "g-foschia") {
      active.giornale.foschia = event.target.checked;
      markCommessaUpdated(active, "Aggiornamento foschia");
      saveState();
    }
  });

  dom.workForm.addEventListener("input", (event) => {
    const active = getActiveCommessa();
    if (!active) {
      return;
    }

    if (event.target.id === "g-note") {
      active.giornale.note = event.target.value;
      saveState();
    }
  });

  dom.workForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const active = getActiveCommessa();
    if (!active) {
      alert("Seleziona prima una commessa.");
      return;
    }

    active.localita = dom.localita.value.trim();
    active.data = dom.data.value;
    active.giornale = collectGiornaleFromForm(active.giornale.sessioni || []);
    markCommessaUpdated(active, "Salvataggio scheda commessa");

    saveState();
    render();
    alert("Scheda commessa salvata.");
  });

  dom.exportDataBtn.addEventListener("click", () => {
    const content = JSON.stringify(state, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `archivio-commesse-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();

    URL.revokeObjectURL(url);
  });

  dom.importDataInput.addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const envelope = normalizeStateEnvelope(data);
        const nextCommesse = normalizeLoadedData(envelope);
        state.commesse = nextCommesse;
        state.activeCommessaId =
          envelope.activeCommessaId && nextCommesse.some((c) => c.id === envelope.activeCommessaId)
            ? envelope.activeCommessaId
            : nextCommesse[0]?.id || null;
        state.editCommessaId = null;
        saveState();
        render();
      } catch {
        alert("Impossibile importare il file JSON.");
      }
    };

    reader.readAsText(file);
    dom.importDataInput.value = "";
  });

  dom.cloudEndpoint.addEventListener("change", () => {
    state.cloudEndpoint = dom.cloudEndpoint.value.trim();
    saveState();
    setCloudStatus(state.cloudEndpoint ? "Endpoint cloud configurato." : "Cloud non configurato.");
  });

  dom.saveCloudBtn.addEventListener("click", () => {
    void pushToCloud();
  });

  dom.loadCloudBtn.addEventListener("click", () => {
    void pullFromCloud();
  });

  dom.changeUserBtn.addEventListener("click", () => {
    showAuthModal();
  });

  dom.authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = dom.authEmail.value.trim().toLowerCase();
    const password = dom.authPassword.value;

    if (!email.includes("@")) {
      setAuthStatus("Inserisci un'email valida.");
      return;
    }

    if (!password) {
      setAuthStatus("Inserisci la password.");
      return;
    }

    setAuthStatus("Verifica credenziali...");
    const ok = await tryLogin(email, password, { trackLogin: true });
    if (!ok) {
      setAuthStatus("Credenziali non valide.");
      return;
    }

    setAuthStatus("");
    await checkBackendAvailability();
    await loadStateFromBackend();
    render();
  });
}

async function init() {
  loadState();
  renderUserBadge();
  await checkBackendAvailability();
  await loadServerConfig();
  if (state.authRequired && (!state.currentUser.email || !state.currentUser.password)) {
    showAuthModal();
  }
  if (state.authRequired && state.currentUser.email && state.currentUser.password) {
    const ok = await tryLogin(state.currentUser.email, state.currentUser.password, { trackLogin: false });
    if (!ok) {
      state.currentUser.email = "";
      state.currentUser.password = "";
      renderUserBadge();
      showAuthModal();
    }
  }
  await loadStateFromBackend();
  bindEvents();
  setEditMode(null);
  dom.cloudEndpoint.value = state.cloudEndpoint || "";
  setCloudStatus(
    state.cloudEndpoint
      ? state.backendAvailable
        ? "Endpoint cloud configurato. Database locale server attivo."
        : "Endpoint cloud configurato."
      : state.backendAvailable
      ? "Cloud non configurato. Database locale server attivo."
      : "Cloud non configurato."
  );
  render();
}

void init();
