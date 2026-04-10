/*
  Deploy su Google Apps Script come Web App (accesso: Anyone with the link).
  Salva i dati in Script Properties (utile per collaborazione semplice).
*/

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || "{}");
    var action = body.action;
    var props = PropertiesService.getScriptProperties();

    if (action === "save") {
      var payload = body.payload || { commesse: [], activeCommessaId: null };
      props.setProperty("SPO_STATE", JSON.stringify(payload));
      return jsonOut({ ok: true });
    }

    if (action === "load") {
      var raw = props.getProperty("SPO_STATE");
      if (!raw) {
        return jsonOut({ commesse: [], activeCommessaId: null });
      }
      return jsonOut(JSON.parse(raw));
    }

    return jsonOut({ error: "Azione non supportata" });
  } catch (err) {
    return jsonOut({ error: String(err) });
  }
}

function doGet() {
  return jsonOut({ ok: true, service: "SPO cloud endpoint" });
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
