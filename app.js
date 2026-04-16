const STORAGE_KEY = "spo_commesse_archive_v2";
const CLOUD_ENDPOINT_KEY = "spo_cloud_endpoint";
const AUTH_SESSION_KEY = "spo_auth_session_v1";
const LANGUAGE_KEY = "spo_language_v1";

const HARDWARE_ITEMS = [
  { key: "camere", label: { it: "Macchine fotografiche", en: "Cameras" } },
  { key: "displayCaviGps", label: { it: "Display cavi e antenna GPS", en: "Display cables and GPS antenna" } },
  { key: "moduloControllo", label: { it: "Modulo di controllo", en: "Control module" } },
  { key: "cinghie", label: { it: "Cinghie ancoraggio", en: "Tie-down straps" } },
  { key: "prolunghe", label: { it: "Prolunghe elettriche", en: "Power extension cables" } },
  { key: "ssdControlBox", label: { it: "Dischi SSD control box", en: "Control box SSD drives" } },
  { key: "adattatoriSsd", label: { it: "Adattatori SSD", en: "SSD adapters" } },
  { key: "dischiBackup", label: { it: "Dischi backup e docker station", en: "Backup drives and dock station" } },
  { key: "computer", label: { it: "Computer", en: "Computer" } },
];

const MONTAGGIO_ITEMS = [
  { key: "montaggioFotocamere", label: { it: "Montaggio fotocamere", en: "Camera assembly" } },
  { key: "montaggioModulo", label: { it: "Montaggio modulo controllo", en: "Control module assembly" } },
  { key: "montaggioDisplay", label: { it: "Montaggio display", en: "Display assembly" } },
  { key: "montaggioAntenna", label: { it: "Montaggio antenna GPS", en: "GPS antenna assembly" } },
  { key: "montaggioBatterie", label: { it: "Montaggio batterie", en: "Battery assembly" } },
  { key: "caviRiserva", label: { it: "Cavi di riserva", en: "Spare cables" } },
  { key: "topoflight", label: { it: "Avvio topoflight e caricamento missione", en: "Start Topoflight and load mission" } },
  { key: "ixCapture", label: { it: "Avvio IX capture", en: "Start IX Capture" } },
  { key: "cartelleLavoro", label: { it: "Creazione cartelle di lavoro", en: "Create working folders" } },
  { key: "scattiProva", label: { it: "Scatti di prova", en: "Test shots" } },
  { key: "verificaGpsExif", label: { it: "Verifica dati GPS/EXIF", en: "Check GPS/EXIF data" } },
];

const METEO_OPTIONS = [
  { value: "soleggiato", label: { it: "Soleggiato", en: "Sunny" } },
  { value: "parzialmente nuvoloso", label: { it: "Parzialmente nuvoloso", en: "Partly cloudy" } },
  { value: "nuvoloso", label: { it: "Nuvoloso", en: "Cloudy" } },
  { value: "pioggia", label: { it: "Pioggia", en: "Rain" } },
];

const TRANSLATIONS = {
  it: {
    eyebrow: "Gestione Operativa",
    appTitle: "Archivio Rilievi SPO",
    languageLabel: "Lingua",
    changeUser: "Cambia utente",
    printPdf: "Stampa PDF",
    exportJson: "Esporta JSON",
    importJson: "Importa JSON",
    jobsTitle: "Commesse",
    jobCodePlaceholder: "Codice commessa",
    jobNamePlaceholder: "Nome commessa",
    clientPlaceholder: "Cliente",
    createJob: "Crea commessa",
    saveEdit: "Salva modifica",
    cancelEdit: "Annulla modifica",
    cloudTitle: "Cloud Google Drive",
    cloudPlaceholder: "URL Web App Google Apps Script",
    saveCloud: "Salva su Cloud",
    loadCloud: "Carica da Cloud",
    cloudNotConfigured: "Cloud non configurato.",
    jobSheetTitle: "Scheda Commessa",
    noJobSelected: "Nessuna commessa selezionata",
    baseDataTitle: "Dati Base",
    locationLabel: "Localita",
    dateLabel: "Data",
    positionLabel: "Posizione geolocalizzata",
    positionModeGps: "Sensore GPS",
    positionModeManual: "Inserimento manuale",
    positionPlaceholder: "Latitudine, Longitudine",
    manualPositionPlaceholder: "Incolla coordinate o link Google Maps",
    acquirePosition: "Acquisisci posizione",
    applyManualPosition: "Usa posizione",
    transportChecksTitle: "Check Trasporto",
    assemblyChecksTitle: "Check Montaggio",
    workLogTitle: "Giornale di Lavoro",
    weatherLabel: "Meteo",
    weatherPlaceholder: "Seleziona meteo",
    cloudHeightLabel: "Altezza nuvole",
    mistLabel: "Foschia",
    notesLabel: "Note",
    finalNotesPlaceholder: "Annotazioni finali",
    saveJobSheet: "Salva scheda commessa",
    historyTitle: "Storico modifiche",
    historyHint: "Mostra utente (login) e salvataggi della commessa selezionata.",
    loginTitle: "Accesso",
    loginHint: "Inserisci email e password condivisa per tracciare le modifiche.",
    emailLabel: "Email",
    emailPlaceholder: "nome@azienda.it",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
    loginButton: "Entra",
    unauthenticatedUser: "Utente non autenticato",
    userBadge: "Utente: {email}",
    noJobsCreated: "Nessuna commessa creata.",
    selectOrCreateJob: "Seleziona o crea una commessa per compilare la scheda.",
    positionNotAcquired: "Posizione non ancora acquisita.",
    gpsAccuracy: "Precisione {accuracy}m",
    positionFromGps: "Posizione acquisita da GPS. Precisione {accuracy}m",
    positionFromManual: "Posizione inserita manualmente da Google Maps.",
    checkNotePlaceholder: "Note",
    workButton: "Lavora",
    editButton: "Modifica",
    deleteButton: "Cancella",
    lastUpdate: "Ultima modifica: {user} ({date})",
    notAvailable: "n.d.",
    noHistoryForSelection: "Nessuna commessa selezionata.",
    noHistoryChanges: "Nessuna modifica registrata.",
    noFlightLines: "Nessuna strisciata. Inserisci il numero sopra.",
    sessionTitle: "Sessione lavoro {index}",
    ignitionLabel: "Accensione motore",
    takeoffLabel: "Decollo",
    acquisitionStartLabel: "Inizio acquisizione foto",
    flightLinesCountLabel: "Numero strisciate",
    idLabel: "ID",
    directionLabel: "Direzione (deg)",
    partialLabel: "Parziale",
    completeLabel: "Completa",
    finishLabel: "Fine lavori",
    globalMapperLabel: "Check GLOBAL MAPPER",
    landingLabel: "Atterraggio",
    engineOffLabel: "Spegnimento motori",
    interruptionResume: "Interruzione/Ripresa lavoro",
    duplicateJobCode: "Esiste gia una commessa con questo codice.",
    deleteJobConfirm: "Vuoi cancellare definitivamente questa commessa?",
    syncDeleteConfirm: "Commessa eliminata in locale. Vuoi aggiornare subito anche il cloud?",
    deletedLocalOnly: "Commessa eliminata in locale. Premi 'Salva su Cloud' per aggiornare il cloud.",
    cloudDeleteSyncing: "Aggiornamento cloud in corso dopo cancellazione...",
    cloudDeleteSynced: "Cancellazione sincronizzata anche sul cloud.",
    cloudDeleteError: "Errore aggiornamento cloud: la commessa e stata eliminata solo in locale.",
    selectJobFirst: "Seleziona prima una commessa.",
    geolocationUnsupported: "Geolocalizzazione non supportata dal browser.",
    geolocationPending: "Acquisizione posizione in corso...",
    geolocationError: "Errore geolocalizzazione: {reason}",
    geolocationDenied: "Permesso negato",
    geolocationUnavailable: "Posizione non disponibile",
    geolocationTimeout: "Timeout acquisizione",
    manualPositionInvalid: "Incolla coordinate valide o un link Google Maps con latitudine e longitudine.",
    jobSheetSaved: "Scheda commessa salvata.",
    invalidEmail: "Inserisci un'email valida.",
    missingPassword: "Inserisci la password.",
    checkingCredentials: "Verifica credenziali...",
    invalidCredentials: "Credenziali non valide.",
    importError: "Impossibile importare il file JSON.",
    saveCloudPending: "Invio dati al cloud in corso...",
    saveCloudDoneServer: "Salvataggio cloud completato (via server).",
    saveCloudDoneClient: "Salvataggio cloud completato.",
    loadCloudPending: "Caricamento dati dal cloud in corso...",
    loadCloudDoneServer: "Caricamento cloud completato (via server).",
    loadCloudDoneClient: "Caricamento cloud completato.",
    cloudUrlRequired: "Inserisci prima l'URL Web App di Google Apps Script.",
    cloudProxyError: "Cloud non raggiungibile: verifica URL Web App o permessi deploy.",
    cloudCorsError: "Cloud non raggiungibile (probabile blocco CORS): avvia il server locale con npm start.",
    cloudInvalidResponse: "Formato risposta cloud non valido o non compatibile.",
    endpointConfigured: "Endpoint cloud configurato.",
    backendLocalActive: "Database locale server attivo.",
    backendConfigUnavailable: "Config server non disponibile",
    backendReadFailed: "Lettura backend non riuscita",
    backendSaveFailed: "Salvataggio backend non riuscito",
    localArchiveInvalid: "Archivio locale non valido",
  },
  en: {
    eyebrow: "Operations Management",
    appTitle: "SPO Survey Archive",
    languageLabel: "Language",
    changeUser: "Change user",
    printPdf: "Print PDF",
    exportJson: "Export JSON",
    importJson: "Import JSON",
    jobsTitle: "Jobs",
    jobCodePlaceholder: "Job code",
    jobNamePlaceholder: "Job name",
    clientPlaceholder: "Client",
    createJob: "Create job",
    saveEdit: "Save changes",
    cancelEdit: "Cancel edit",
    cloudTitle: "Google Drive Cloud",
    cloudPlaceholder: "Google Apps Script Web App URL",
    saveCloud: "Save to cloud",
    loadCloud: "Load from cloud",
    cloudNotConfigured: "Cloud not configured.",
    jobSheetTitle: "Job Sheet",
    noJobSelected: "No job selected",
    baseDataTitle: "Basic Data",
    locationLabel: "Location",
    dateLabel: "Date",
    positionLabel: "Geolocated position",
    positionModeGps: "GPS sensor",
    positionModeManual: "Manual entry",
    positionPlaceholder: "Latitude, Longitude",
    manualPositionPlaceholder: "Paste coordinates or a Google Maps link",
    acquirePosition: "Capture position",
    applyManualPosition: "Use position",
    transportChecksTitle: "Transport Checks",
    assemblyChecksTitle: "Assembly Checks",
    workLogTitle: "Work Log",
    weatherLabel: "Weather",
    weatherPlaceholder: "Select weather",
    cloudHeightLabel: "Cloud height",
    mistLabel: "Mist",
    notesLabel: "Notes",
    finalNotesPlaceholder: "Final notes",
    saveJobSheet: "Save job sheet",
    historyTitle: "Change history",
    historyHint: "Shows user login and saves for the selected job.",
    loginTitle: "Login",
    loginHint: "Enter email and the shared password to track changes.",
    emailLabel: "Email",
    emailPlaceholder: "name@company.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
    loginButton: "Sign in",
    unauthenticatedUser: "User not authenticated",
    userBadge: "User: {email}",
    noJobsCreated: "No jobs created.",
    selectOrCreateJob: "Select or create a job to fill in the sheet.",
    positionNotAcquired: "Position not acquired yet.",
    gpsAccuracy: "Accuracy {accuracy}m",
    positionFromGps: "Position captured from GPS. Accuracy {accuracy}m",
    positionFromManual: "Position entered manually from Google Maps.",
    checkNotePlaceholder: "Notes",
    workButton: "Open",
    editButton: "Edit",
    deleteButton: "Delete",
    lastUpdate: "Last update: {user} ({date})",
    notAvailable: "n/a",
    noHistoryForSelection: "No job selected.",
    noHistoryChanges: "No changes recorded.",
    noFlightLines: "No flight lines. Enter the number above.",
    sessionTitle: "Work session {index}",
    ignitionLabel: "Engine start",
    takeoffLabel: "Takeoff",
    acquisitionStartLabel: "Photo acquisition start",
    flightLinesCountLabel: "Flight lines count",
    idLabel: "ID",
    directionLabel: "Direction (deg)",
    partialLabel: "Partial",
    completeLabel: "Complete",
    finishLabel: "Work end",
    globalMapperLabel: "GLOBAL MAPPER check",
    landingLabel: "Landing",
    engineOffLabel: "Engine shutdown",
    interruptionResume: "Work interruption/resume",
    duplicateJobCode: "A job with this code already exists.",
    deleteJobConfirm: "Do you want to permanently delete this job?",
    syncDeleteConfirm: "Job deleted locally. Do you want to update the cloud now too?",
    deletedLocalOnly: "Job deleted locally. Press 'Save to cloud' to update the cloud.",
    cloudDeleteSyncing: "Updating cloud after deletion...",
    cloudDeleteSynced: "Deletion synced to the cloud too.",
    cloudDeleteError: "Cloud update error: the job was deleted only locally.",
    selectJobFirst: "Select a job first.",
    geolocationUnsupported: "Geolocation is not supported by this browser.",
    geolocationPending: "Capturing position...",
    geolocationError: "Geolocation error: {reason}",
    geolocationDenied: "Permission denied",
    geolocationUnavailable: "Position unavailable",
    geolocationTimeout: "Acquisition timeout",
    manualPositionInvalid: "Paste valid coordinates or a Google Maps link with latitude and longitude.",
    jobSheetSaved: "Job sheet saved.",
    invalidEmail: "Enter a valid email address.",
    missingPassword: "Enter the password.",
    checkingCredentials: "Checking credentials...",
    invalidCredentials: "Invalid credentials.",
    importError: "Unable to import the JSON file.",
    saveCloudPending: "Sending data to the cloud...",
    saveCloudDoneServer: "Cloud save completed (via server).",
    saveCloudDoneClient: "Cloud save completed.",
    loadCloudPending: "Loading data from the cloud...",
    loadCloudDoneServer: "Cloud load completed (via server).",
    loadCloudDoneClient: "Cloud load completed.",
    cloudUrlRequired: "Enter the Google Apps Script Web App URL first.",
    cloudProxyError: "Cloud unreachable: check Web App URL or deploy permissions.",
    cloudCorsError: "Cloud unreachable (likely CORS block): start the local server with npm start.",
    cloudInvalidResponse: "Invalid or unsupported cloud response format.",
    endpointConfigured: "Cloud endpoint configured.",
    backendLocalActive: "Local server database active.",
    backendConfigUnavailable: "Server config unavailable",
    backendReadFailed: "Backend read failed",
    backendSaveFailed: "Backend save failed",
    localArchiveInvalid: "Invalid local archive",
  },
};

const state = {
  commesse: [],
  activeCommessaId: null,
  editCommessaId: null,
  cloudEndpoint: "",
  language: "it",
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
  posizioneManuale: document.getElementById("commessa-posizione-manuale"),
  manualGeoRow: document.getElementById("manual-geo-row"),
  applyManualGeoBtn: document.getElementById("apply-manual-geo"),
  positionModeGps: document.getElementById("position-mode-gps"),
  positionModeManual: document.getElementById("position-mode-manual"),
  geoBtn: document.getElementById("geo-btn"),
  geoStatus: document.getElementById("geo-status"),

  checkHardware: document.getElementById("check-hardware"),
  checkMontaggio: document.getElementById("check-montaggio"),

  gMeteo: document.getElementById("g-meteo"),
  gAltezzaNuvole: document.getElementById("g-altezza-nuvole"),
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
  languageSelect: document.getElementById("language-select"),
  changeUserBtn: document.getElementById("change-user"),
  authModal: document.getElementById("auth-modal"),
  authForm: document.getElementById("auth-form"),
  authEmail: document.getElementById("auth-email"),
  authPassword: document.getElementById("auth-password"),
  authStatus: document.getElementById("auth-status"),
};

function t(key, params = {}) {
  const dictionary = TRANSLATIONS[state.language] || TRANSLATIONS.it;
  let template = dictionary[key] || TRANSLATIONS.it[key] || key;

  for (const [paramKey, value] of Object.entries(params)) {
    template = template.replace(`{${paramKey}}`, String(value));
  }

  return template;
}

function getItemLabel(item) {
  return item.label?.[state.language] || item.label?.it || "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = t("appTitle");

  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }

  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  }

  renderMeteoOptions();
}

function setLanguage(language) {
  state.language = TRANSLATIONS[language] ? language : "it";
  localStorage.setItem(LANGUAGE_KEY, state.language);
  if (dom.languageSelect) {
    dom.languageSelect.value = state.language;
  }
  applyTranslations();
  renderUserBadge();
  render();
}

function renderMeteoOptions() {
  if (!dom.gMeteo) {
    return;
  }

  const selectedValue = dom.gMeteo.value;
  dom.gMeteo.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = t("weatherPlaceholder");
  dom.gMeteo.appendChild(emptyOption);

  for (const option of METEO_OPTIONS) {
    const element = document.createElement("option");
    element.value = option.value;
    element.textContent = option.label[state.language] || option.label.it;
    dom.gMeteo.appendChild(element);
  }

  dom.gMeteo.value = selectedValue;
}

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
    dom.userBadge.textContent = t("unauthenticatedUser");
    dom.userBadge.classList.add("muted");
    return;
  }

  dom.userBadge.textContent = t("userBadge", { email: state.currentUser.email });
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
    out[item.key] = {
      checked: false,
      note: "",
    };
  }
  return out;
}

function normalizeCheckEntry(entry) {
  if (typeof entry === "boolean") {
    return {
      checked: entry,
      note: "",
    };
  }

  return {
    checked: Boolean(entry?.checked),
    note: String(entry?.note ?? ""),
  };
}

function normalizeCheckState(items, source) {
  const out = {};

  for (const item of items) {
    out[item.key] = normalizeCheckEntry(source?.[item.key]);
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
    altezzaNuvoleFt: "",
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
  localStorage.setItem(LANGUAGE_KEY, state.language || "it");
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
      hardware: normalizeCheckState(HARDWARE_ITEMS, c.checks?.hardware || {}),
      montaggio: normalizeCheckState(MONTAGGIO_ITEMS, c.checks?.montaggio || {}),
    },
    giornale: normalizeGiornaleData(c.giornale ?? c.giornaleDiLavoro ?? c.workLog ?? c),
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
  const parsedGiornale = parseMaybeJson(giornale);
  const source = parsedGiornale && typeof parsedGiornale === "object" ? parsedGiornale : {};
  const hasExplicitSessioni = Array.isArray(source.sessioni) && source.sessioni.length > 0;

  if (hasExplicitSessioni) {
    const base = {
      ...defaultGiornale(),
      ...source,
    };

    return {
      ...base,
      sessioni: base.sessioni.map((sessione, index) => normalizeSessioneLavoro(sessione, index)),
    };
  }

  const base = {
    ...source,
  };

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
    altezzaNuvoleFt: String(base.altezzaNuvoleFt ?? base.altezzaNuvole ?? ""),
    foschia: Boolean(base.foschia),
    sessioni: [legacySessione],
    note: base.note || "",
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  state.cloudEndpoint = localStorage.getItem(CLOUD_ENDPOINT_KEY) || "";
  state.language = localStorage.getItem(LANGUAGE_KEY) || "it";
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
    console.warn(t("localArchiveInvalid"));
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
    console.warn(t("backendConfigUnavailable"));
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
    console.warn(t("backendReadFailed"));
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
    console.warn(t("backendSaveFailed"));
  }
}

function setCloudStatus(message) {
  dom.cloudStatus.textContent = message;
}

function formatDateTime(iso) {
  if (!iso) {
    return t("notAvailable");
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return t("notAvailable");
  }

  return date.toLocaleString(state.language === "en" ? "en-GB" : "it-IT", {
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
    setCloudStatus(t("cloudUrlRequired"));
    return;
  }

  setCloudStatus(t("saveCloudPending"));

  try {
    await callCloud("save");

    setCloudStatus(state.backendAvailable ? t("saveCloudDoneServer") : t("saveCloudDoneClient"));
  } catch {
    setCloudStatus(state.backendAvailable ? t("cloudProxyError") : t("cloudCorsError"));
  }
}

async function pullFromCloud() {
  const endpoint = getCloudEndpoint();
  if (!endpoint) {
    setCloudStatus(t("cloudUrlRequired"));
    return;
  }

  setCloudStatus(t("loadCloudPending"));

  try {
    const data = await callCloud("load");
    if (data?.error) {
      setCloudStatus(`Errore cloud: ${data.error}`);
      return;
    }

    const envelope = normalizeStateEnvelope(data);
    if (!envelope.recognized) {
      setCloudStatus(t("cloudInvalidResponse"));
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
    setCloudStatus(state.backendAvailable ? t("loadCloudDoneServer") : t("loadCloudDoneClient"));
  } catch {
    setCloudStatus(state.backendAvailable ? t("cloudProxyError") : t("cloudCorsError"));
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
    dom.historyList.innerHTML = `<li>${t("noHistoryForSelection")}</li>`;
    return;
  }

  const history = Array.isArray(commessa.history) ? [...commessa.history].reverse() : [];
  if (history.length === 0) {
    dom.historyList.innerHTML = `<li>${t("noHistoryChanges")}</li>`;
    return;
  }

  const visible = history.slice(0, 12);
  for (const item of visible) {
    const li = document.createElement("li");
    li.textContent = `${formatDateTime(item.at)} - ${item.by || t("notAvailable")}: ${item.action || t("editButton")}`;
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
    dom.commessaSaveBtn.textContent = t("createJob");
    dom.commessaCancelEdit.classList.add("hidden");
    return;
  }

  dom.commessaCodice.value = commessa.codice;
  dom.commessaNome.value = commessa.nome;
  dom.commessaCliente.value = commessa.cliente;
  dom.commessaSaveBtn.textContent = t("saveEdit");
  dom.commessaCancelEdit.classList.remove("hidden");
}

function renderCommesse() {
  dom.commesseList.innerHTML = "";
  dom.commesseCount.textContent = String(state.commesse.length);

  if (state.commesse.length === 0) {
    dom.commesseList.innerHTML = `<p>${t("noJobsCreated")}</p>`;
    dom.activeCommessaChip.textContent = t("noJobSelected");
    dom.activeCommessaChip.classList.add("muted");
    return;
  }

  const active = getActiveCommessa();
  dom.activeCommessaChip.textContent = active
    ? `${active.codice} - ${active.nome}`
    : t("noJobSelected");
  dom.activeCommessaChip.classList.toggle("muted", !active);

  for (const commessa of state.commesse) {
    const card = document.createElement("article");
    card.className = `commessa-card ${commessa.id === state.activeCommessaId ? "active" : ""}`;

    card.innerHTML = `
      <h3>${commessa.codice} - ${commessa.nome}</h3>
      <p>${commessa.cliente}</p>
      <p>${t("lastUpdate", {
        user: commessa.updatedBy || t("notAvailable"),
        date: formatDateTime(commessa.updatedAt),
      })}</p>
      <div class="commessa-card-footer">
        <button class="btn tiny ghost" data-work="${commessa.id}">${t("workButton")}</button>
        <button class="btn tiny ghost" data-edit="${commessa.id}">${t("editButton")}</button>
        <button class="btn tiny danger" data-delete="${commessa.id}">${t("deleteButton")}</button>
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
    const row = document.createElement("div");
    const entry = normalizeCheckEntry(data[item.key]);
    row.className = "check-row";
    row.innerHTML = `
      <label class="check-inline">
        <span class="check-order">${index + 1}.</span>
        <input type="checkbox" data-check-group="${group}" data-check-key="${item.key}" ${entry.checked ? "checked" : ""} />
        <span>${getItemLabel(item)}</span>
      </label>
      <textarea
        class="check-note-input"
        data-check-note-group="${group}"
        data-check-note-key="${item.key}"
        placeholder="${t("checkNotePlaceholder")}">${escapeHtml(entry.note)}</textarea>
    `;
    container.appendChild(row);
  });
}

function buildStrisciateRows(tbody, strisciate, sessionIndex) {
  tbody.innerHTML = "";

  if (strisciate.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">${t("noFlightLines")}</td></tr>`;
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
      <td><textarea class="str-note" data-session-index="${sessionIndex}" data-index="${i}" placeholder="${t("checkNotePlaceholder")}">${escapeHtml(strisciate[i].note ?? "")}</textarea></td>
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

  const idMaxChars = getMaxColumnChars(idInputs, 4);
  const dirMaxChars = getMaxColumnChars(dirInputs, 4);

  table.style.setProperty("--col-id-ch", String(Math.max(idMaxChars, 4)));
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
      <h4 class="session-title">${t("sessionTitle", { index: index + 1 })}</h4>
      <div class="grid-2">
        <label>
          ${t("ignitionLabel")}
          <input type="time" class="g-accensione" data-session-index="${index}" value="${sessione.accensioneMotore || ""}" />
        </label>
        <label>
          ${t("takeoffLabel")}
          <input type="time" class="g-decollo" data-session-index="${index}" value="${sessione.decollo || ""}" />
        </label>
        <label>
          ${t("acquisitionStartLabel")}
          <input type="time" class="g-inizio-acq" data-session-index="${index}" value="${sessione.inizioAcquisizioneFoto || ""}" />
        </label>
        <label>
          ${t("flightLinesCountLabel")}
          <input type="number" min="0" step="1" class="g-num-strisciate" data-session-index="${index}" value="${sessione.numeroStrisciate || 0}" />
        </label>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th class="col-id">${t("idLabel")}</th>
              <th class="col-dir">${t("directionLabel")}</th>
              <th>${t("partialLabel")}</th>
              <th>${t("completeLabel")}</th>
              <th>${t("notesLabel")}</th>
            </tr>
          </thead>
          <tbody class="strisciate-body"></tbody>
        </table>
      </div>

      <div class="grid-2">
        <label>
          ${t("finishLabel")}
          <input type="time" class="g-fine-lavori" data-session-index="${index}" value="${sessione.fineLavori || ""}" />
        </label>
        <label class="check-inline">
          <input type="checkbox" class="g-global-mapper" data-session-index="${index}" ${
            sessione.globalMapper ? "checked" : ""
          } />
          ${t("globalMapperLabel")}
        </label>
        <label>
          ${t("landingLabel")}
          <input type="time" class="g-atterraggio" data-session-index="${index}" value="${sessione.atterraggio || ""}" />
        </label>
        <label>
          ${t("engineOffLabel")}
          <input type="time" class="g-spegnimento" data-session-index="${index}" value="${sessione.spegnimentoMotori || ""}" />
        </label>
      </div>

      <button type="button" class="btn ghost add-session-btn" data-session-index="${index}">${t("interruptionResume")}</button>
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

function setPositionMode(mode) {
  const isManual = mode === "manual";
  dom.positionModeGps.checked = !isManual;
  dom.positionModeManual.checked = isManual;
  dom.manualGeoRow.classList.toggle("hidden", !isManual);
  dom.geoBtn.classList.toggle("hidden", isManual);
}

function updatePrintNoteVisibility() {
  const noteFields = document.querySelectorAll(".check-note-input, .str-note, #g-note");

  for (const field of noteFields) {
    const isEmpty = String(field.value || "").trim() === "";
    field.classList.toggle("print-empty-note", isEmpty);
    if (!isEmpty) {
      field.style.height = "auto";
      field.style.height = field.scrollHeight + "px";
    }
  }

  const finalNoteWrapper = document.getElementById("g-note-wrapper");
  if (finalNoteWrapper) {
    const finalNoteEmpty = String(dom.gNote?.value || "").trim() === "";
    finalNoteWrapper.classList.toggle("print-empty-note-block", finalNoteEmpty);
  }
}

function resetPrintNoteHeights() {
  const noteFields = document.querySelectorAll(".check-note-input, .str-note, #g-note");
  for (const field of noteFields) {
    field.style.height = "";
  }
}

function formatPosition(position) {
  if (!position) {
    return "";
  }

  return `${Number(position.lat).toFixed(6)}, ${Number(position.lon).toFixed(6)}`;
}

function setWorkFormEnabled(enabled) {
  const controls = dom.workForm.querySelectorAll("input, textarea, button");
  for (const control of controls) {
    control.disabled = !enabled;
  }
}

function renderWorkSheet() {
  const active = getActiveCommessa();

  if (!active) {
    dom.workForm.reset();
    dom.geoStatus.textContent = t("selectOrCreateJob");
    dom.posizione.value = "";
    dom.posizioneManuale.value = "";
    setPositionMode("gps");
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
    dom.posizione.value = formatPosition(active.posizione);
    if (active.posizione.source === "manual") {
      dom.posizioneManuale.value = active.posizione.rawInput || formatPosition(active.posizione);
      dom.geoStatus.textContent = t("positionFromManual");
      setPositionMode("manual");
    } else {
      dom.posizioneManuale.value = "";
      dom.geoStatus.textContent = t("positionFromGps", {
        accuracy: Math.round(Number(active.posizione.accuracy) || 0),
      });
      setPositionMode("gps");
    }
  } else {
    dom.posizione.value = "";
    dom.posizioneManuale.value = "";
    dom.geoStatus.textContent = t("positionNotAcquired");
    setPositionMode(dom.positionModeManual.checked ? "manual" : "gps");
  }

  renderChecklist(dom.checkHardware, HARDWARE_ITEMS, "hardware", active.checks.hardware);
  renderChecklist(dom.checkMontaggio, MONTAGGIO_ITEMS, "montaggio", active.checks.montaggio);

  ensureGiornaleSessione(active);
  dom.gMeteo.value = active.giornale.meteo || "";
  dom.gAltezzaNuvole.value = active.giornale.altezzaNuvoleFt || "";
  dom.gFoschia.checked = Boolean(active.giornale.foschia);
  dom.gNote.value = active.giornale.note || "";

  renderGiornaleSessioni(active.giornale.sessioni);
  renderCommessaHistory(active);
  updatePrintNoteVisibility();
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
    alert(t("duplicateJobCode"));
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
  const ok = confirm(t("deleteJobConfirm"));
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

  const syncCloudNow = confirm(t("syncDeleteConfirm"));

  if (!syncCloudNow) {
    setCloudStatus(t("deletedLocalOnly"));
    return;
  }

  setCloudStatus(t("cloudDeleteSyncing"));

  try {
    await callCloud("save");
    setCloudStatus(t("cloudDeleteSynced"));
  } catch {
    setCloudStatus(t("cloudDeleteError"));
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

function parseManualCoordinates(rawValue) {
  const trimmed = String(rawValue || "").trim();
  if (!trimmed) {
    return null;
  }

  const decoded = decodeURIComponent(trimmed);
  const patterns = [
    /^\s*(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)\s*$/,
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /[?&](?:q|query)=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/i,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);
    if (!match) {
      continue;
    }

    const lat = Number(match[1]);
    const lon = Number(match[2]);
    if (Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
      return { lat, lon };
    }
  }

  return null;
}

function applyManualGeolocation() {
  const active = getActiveCommessa();
  if (!active) {
    alert(t("selectJobFirst"));
    return;
  }

  const parsed = parseManualCoordinates(dom.posizioneManuale.value);
  if (!parsed) {
    dom.geoStatus.textContent = t("manualPositionInvalid");
    return;
  }

  active.posizione = {
    lat: parsed.lat,
    lon: parsed.lon,
    accuracy: null,
    capturedAt: new Date().toISOString(),
    source: "manual",
    rawInput: dom.posizioneManuale.value.trim(),
  };
  markCommessaUpdated(active, "Posizione manuale");
  saveState();
  renderWorkSheet();
}

function acquireGeolocation() {
  const active = getActiveCommessa();
  if (!active) {
    alert(t("selectJobFirst"));
    return;
  }

  if (!("geolocation" in navigator)) {
    dom.geoStatus.textContent = t("geolocationUnsupported");
    return;
  }

  dom.geoStatus.textContent = t("geolocationPending");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      active.posizione = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy,
        capturedAt: new Date().toISOString(),
        source: "gps",
      };
      markCommessaUpdated(active, "Acquisizione geolocalizzazione");
      saveState();
      renderWorkSheet();
    },
    (error) => {
      const labels = {
        1: t("geolocationDenied"),
        2: t("geolocationUnavailable"),
        3: t("geolocationTimeout"),
      };
      dom.geoStatus.textContent = t("geolocationError", { reason: labels[error.code] || t("notAvailable") });
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
    altezzaNuvoleFt: String(dom.gAltezzaNuvole.value || "").trim(),
    foschia: dom.gFoschia.checked,
    sessioni: Array.isArray(sessioni)
      ? sessioni.map((sessione, index) => normalizeSessioneLavoro(sessione, index))
      : [normalizeSessioneLavoro(defaultSessioneLavoro(), 0)],
    note: dom.gNote.value.trim(),
  };
}

function bindEvents() {
  dom.printPdfBtn.addEventListener("click", () => {
    updatePrintNoteVisibility();
    window.print();
  });

  window.addEventListener("beforeprint", updatePrintNoteVisibility);
  window.addEventListener("afterprint", resetPrintNoteHeights);

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

  dom.languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  dom.geoBtn.addEventListener("click", acquireGeolocation);
  dom.applyManualGeoBtn.addEventListener("click", applyManualGeolocation);
  dom.positionModeGps.addEventListener("change", () => setPositionMode("gps"));
  dom.positionModeManual.addEventListener("change", () => setPositionMode("manual"));

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
      active.checks[checkGroup][checkKey] = normalizeCheckEntry(active.checks[checkGroup][checkKey]);
      active.checks[checkGroup][checkKey].checked = event.target.checked;
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

    if (event.target.id === "g-altezza-nuvole") {
      const rawValue = String(event.target.value ?? "").trim();
      const normalizedValue = rawValue === "" ? "" : String(Math.max(0, Number(rawValue) || 0));
      event.target.value = normalizedValue;
      active.giornale.altezzaNuvoleFt = normalizedValue;
      markCommessaUpdated(active, "Aggiornamento altezza nuvole");
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

    const checkGroup = event.target.dataset.checkNoteGroup;
    const checkKey = event.target.dataset.checkNoteKey;
    if (checkGroup && checkKey) {
      active.checks[checkGroup][checkKey] = normalizeCheckEntry(active.checks[checkGroup][checkKey]);
      active.checks[checkGroup][checkKey].note = event.target.value;
      saveState();
      updatePrintNoteVisibility();
      return;
    }

    if (event.target.id === "g-note") {
      active.giornale.note = event.target.value;
      saveState();
      updatePrintNoteVisibility();
    }
  });

  dom.workForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const active = getActiveCommessa();
    if (!active) {
      alert(t("selectJobFirst"));
      return;
    }

    active.localita = dom.localita.value.trim();
    active.data = dom.data.value;
    active.giornale = collectGiornaleFromForm(active.giornale.sessioni || []);
    markCommessaUpdated(active, "Salvataggio scheda commessa");

    saveState();
    render();
    alert(t("jobSheetSaved"));
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
        alert(t("importError"));
      }
    };

    reader.readAsText(file);
    dom.importDataInput.value = "";
  });

  dom.cloudEndpoint.addEventListener("change", () => {
    state.cloudEndpoint = dom.cloudEndpoint.value.trim();
    saveState();
    setCloudStatus(state.cloudEndpoint ? t("endpointConfigured") : t("cloudNotConfigured"));
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
      setAuthStatus(t("invalidEmail"));
      return;
    }

    if (!password) {
      setAuthStatus(t("missingPassword"));
      return;
    }

    setAuthStatus(t("checkingCredentials"));
    const ok = await tryLogin(email, password, { trackLogin: true });
    if (!ok) {
      setAuthStatus(t("invalidCredentials"));
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
  applyTranslations();
  if (dom.languageSelect) {
    dom.languageSelect.value = state.language;
  }
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
        ? `${t("endpointConfigured")} ${t("backendLocalActive")}`
        : t("endpointConfigured")
      : state.backendAvailable
      ? `${t("cloudNotConfigured")} ${t("backendLocalActive")}`
      : t("cloudNotConfigured")
  );
  render();
}

void init();
