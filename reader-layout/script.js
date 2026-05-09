(function () {
  var STORAGE_KEY = "reader-layout-notes-v1";
  var HINT_MS = 4000;

  var ta = document.getElementById("aiMockAnswer");
  var wrap = document.getElementById("aiMockAnswerWrap");
  var actions = document.getElementById("aiMockActions");
  var btnAdd = document.getElementById("btnAddNote");
  var hintEl = document.getElementById("aiMockHint");
  var badge = document.getElementById("aiSyncBadge");
  var listEl = document.getElementById("notesList");

  var lastSyncedSnapshot = null;
  var hintTimer = null;

  function loadNotes() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveNotes(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }

  function firstLineTitle(text) {
    var lines = String(text).split("\n");
    for (var i = 0; i < lines.length; i++) {
      var t = lines[i].trim();
      if (t.length) return lines[i].trimEnd();
    }
    return "(空白)";
  }

  /** 展开区只显示「标题行之后」的正文，避免与标题重复 */
  function restAfterTitleLine(text) {
    var lines = String(text).split("\n");
    var i = 0;
    while (i < lines.length && lines[i].trim() === "") i++;
    if (i >= lines.length) return "";
    return lines.slice(i + 1).join("\n");
  }

  function clearHintTimer() {
    if (hintTimer) {
      clearTimeout(hintTimer);
      hintTimer = null;
    }
  }

  function showHint(msg) {
    if (!hintEl) return;
    clearHintTimer();
    hintEl.textContent = msg;
    hintTimer = setTimeout(function () {
      hintEl.textContent = "";
      hintTimer = null;
    }, HINT_MS);
  }

  function setSyncedUI(on) {
    if (wrap) wrap.classList.toggle("ai-mock-answer--synced", !!on);
    if (badge) badge.hidden = !on;
  }

  function updateSyncFromInput() {
    var cur = ta ? ta.value.trim() : "";
    if (lastSyncedSnapshot !== null && cur !== lastSyncedSnapshot) {
      setSyncedUI(false);
    } else if (lastSyncedSnapshot !== null && cur === lastSyncedSnapshot) {
      setSyncedUI(true);
    }
  }

  function updateActionsVisibility() {
    if (!actions || !ta) return;
    var has = ta.value.trim().length > 0;
    actions.hidden = !has;
  }

  function renderNotes() {
    if (!listEl) return;
    var notes = loadNotes();
    listEl.innerHTML = "";

    if (notes.length === 0) {
      var empty = document.createElement("p");
      empty.className = "notes-list__empty";
      empty.textContent = "暂无笔记。在中栏输入模拟回答后点「加入笔记」。";
      listEl.appendChild(empty);
      return;
    }

    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var art = document.createElement("article");
      art.className = "note-card";
      art.dataset.id = String(n.id);

      var head = document.createElement("button");
      head.type = "button";
      head.className = "note-card__head";
      head.setAttribute("aria-expanded", "false");
      var chev = document.createElement("span");
      chev.className = "note-card__chevron";
      chev.setAttribute("aria-hidden", "true");
      var titleSpan = document.createElement("span");
      titleSpan.className = "note-card__title-text";
      titleSpan.textContent = firstLineTitle(n.text);
      head.appendChild(chev);
      head.appendChild(titleSpan);

      var body = document.createElement("div");
      body.className = "note-card__body";
      body.hidden = true;
      body.textContent = restAfterTitleLine(n.text);

      art.appendChild(head);
      art.appendChild(body);
      listEl.appendChild(art);
    }
  }

  function onNotesListClick(e) {
    var head = e.target.closest(".note-card__head");
    if (!head || !listEl.contains(head)) return;
    var card = head.closest(".note-card");
    if (!card) return;
    var body = card.querySelector(".note-card__body");
    if (!body) return;
    var wasOpen = head.getAttribute("aria-expanded") === "true";
    var nowOpen = !wasOpen;
    head.setAttribute("aria-expanded", nowOpen ? "true" : "false");
    body.hidden = wasOpen;
    card.classList.toggle("note-card--expanded", nowOpen);
  }

  function onAddNote() {
    if (!ta) return;
    var text = ta.value.trim();
    if (!text.length) return;

    var notes = loadNotes();
    var dup = notes.some(function (n) {
      return String(n.text).trim() === text;
    });
    if (dup) {
      showHint("已存在相同笔记");
      return;
    }

    notes.push({
      id: Date.now(),
      text: text,
      createdAt: Date.now()
    });
    saveNotes(notes);
    lastSyncedSnapshot = text;
    setSyncedUI(true);
    renderNotes();
  }

  if (ta) {
    ta.addEventListener("input", function () {
      updateActionsVisibility();
      updateSyncFromInput();
    });
    ta.addEventListener("change", updateActionsVisibility);
  }

  if (btnAdd) btnAdd.addEventListener("click", onAddNote);

  if (listEl) listEl.addEventListener("click", onNotesListClick);

  updateActionsVisibility();
  updateSyncFromInput();
  renderNotes();
})();
