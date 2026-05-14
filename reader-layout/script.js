(function () {
  var STORAGE_V2 = "reader-layout-store-v2";
  var STORAGE_LEGACY = "reader-layout-notes-v1";
  var HINT_MS = 4000;

  var KNOWN_BOOK_IDS =
    typeof READER_MOCK_BOOKS !== "undefined" && READER_MOCK_BOOKS.length
      ? READER_MOCK_BOOKS.map(function (b) {
          return b.id;
        })
      : ["jzs", "fan", "cell"];

  var BOOK_META = {};
  (function buildBookMeta() {
    if (typeof READER_MOCK_BOOKS === "undefined" || !READER_MOCK_BOOKS.length) {
      BOOK_META = {
        jzs: {
          title: "置身事内：中国政府与经济发展",
          shortTitle: "置身事内",
          author: "兰小欢"
        },
        fan: {
          title: "反脆弱：从不确定性中获益",
          shortTitle: "反脆弱",
          author: "纳西姆·尼古拉斯·塔勒布"
        },
        cell: {
          title: "战斗细胞：人体免疫系统中的奇妙之旅",
          shortTitle: "战斗细胞",
          author: "菲利普·德特默"
        }
      };
      return;
    }
    for (var bi = 0; bi < READER_MOCK_BOOKS.length; bi++) {
      var row = READER_MOCK_BOOKS[bi];
      BOOK_META[row.id] = {
        title: row.title,
        shortTitle: row.shortTitle || row.title,
        author: typeof row.author === "string" ? row.author : ""
      };
    }
  })();

  function blockText(block) {
    if (!block) return "";
    if (typeof block.content === "string") return block.content;
    if (typeof block.text === "string") return block.text;
    return "";
  }

  function emptyStore() {
    var books = {};
    for (var i = 0; i < KNOWN_BOOK_IDS.length; i++) {
      books[KNOWN_BOOK_IDS[i]] = [];
    }
    return { version: 2, books: books };
  }

  function loadStoreRaw() {
    try {
      var raw = localStorage.getItem(STORAGE_V2);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || o.version !== 2 || typeof o.books !== "object") return null;
      return o;
    } catch (e) {
      return null;
    }
  }

  function migrateLegacyIfNeeded() {
    try {
      var oldRaw = localStorage.getItem(STORAGE_LEGACY);
      if (!oldRaw) return null;
      var parsed = JSON.parse(oldRaw);
      if (!Array.isArray(parsed)) return null;
      var store = emptyStore();
      store.books.jzs = parsed.map(function (n) {
        return {
          id: n.id != null ? n.id : Date.now(),
          type: "ai_mock",
          content: typeof n.text === "string" ? n.text : String(n.content || ""),
          createdAt: typeof n.createdAt === "number" ? n.createdAt : Date.now()
        };
      });
      localStorage.setItem(STORAGE_V2, JSON.stringify(store));
      return store;
    } catch (e) {
      return null;
    }
  }

  function loadStore() {
    var s = loadStoreRaw();
    if (s) return s;
    s = migrateLegacyIfNeeded();
    if (s) return s;
    return emptyStore();
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_V2, JSON.stringify(store));
  }

  /** 一次性：URL 带 clearCellNotes=1 时清空《战斗细胞》(cell) 的笔记并去掉该参数，便于测试无笔记状态 */
  function applyClearCellNotesQuery() {
    try {
      var sp = new URLSearchParams(window.location.search);
      if (sp.get("clearCellNotes") !== "1") return;
      var store = loadStore();
      store.books.cell = [];
      saveStore(store);
      sp.delete("clearCellNotes");
      var qs = sp.toString();
      window.history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : "") + window.location.hash);
    } catch (e) {}
  }

  function seedMockIfEmpty() {
    if (typeof READER_MOCK_BOOKS === "undefined" || !Array.isArray(READER_MOCK_BOOKS)) return;
    var store = loadStore();
    var changed = false;
    for (var si = 0; si < READER_MOCK_BOOKS.length; si++) {
      var mockBook = READER_MOCK_BOOKS[si];
      var bid = mockBook.id;
      var existing = store.books[bid];
      if (!Array.isArray(existing) || existing.length === 0) {
        store.books[bid] = mockBook.blocks.map(function (blk) {
          return {
            id: blk.id,
            type: blk.type,
            content: blk.content,
            createdAt: blk.createdAt
          };
        });
        changed = true;
      }
    }
    if (changed) saveStore(store);
  }

  seedMockIfEmpty();

  function currentBookId() {
    try {
      var q = new URLSearchParams(window.location.search).get("book");
      if (q && KNOWN_BOOK_IDS.indexOf(q) !== -1) return q;
    } catch (e) {}
    return null;
  }

  var bookId = currentBookId();
  if (!bookId) {
    window.location.replace("home.html");
    return;
  }

  applyClearCellNotesQuery();

  var ta = document.getElementById("aiMockAnswer");
  var wrap = document.getElementById("aiMockAnswerWrap");
  var actions = document.getElementById("aiMockActions");
  var btnAdd = document.getElementById("btnAddNote");
  var hintEl = document.getElementById("aiMockHint");
  var badge = document.getElementById("aiSyncBadge");
  var listEl = document.getElementById("notesList");
  var topbarTitle = document.getElementById("topbarCurrentBookTitle");
  var readerToolbarTitle = document.getElementById("readerToolbarTitle");
  var btnExportMd = document.getElementById("btnExportMarkdown");
  var exportModal = document.getElementById("exportMarkdownModal");
  var exportTextarea = document.getElementById("exportMarkdownTextarea");
  var btnExportModalClose = document.getElementById("btnExportModalClose");

  var lastSyncedSnapshot = null;
  var hintTimer = null;

  function loadNotes() {
    var store = loadStore();
    var arr = store.books[bookId];
    return Array.isArray(arr) ? arr : [];
  }

  function saveNotes(notes) {
    var store = loadStore();
    store.books[bookId] = notes;
    saveStore(store);
  }

  function applyBookToChrome() {
    var meta = BOOK_META[bookId];
    if (meta) {
      if (topbarTitle) topbarTitle.textContent = meta.shortTitle;
      if (readerToolbarTitle) readerToolbarTitle.textContent = meta.title;
      document.title = meta.shortTitle + " · 阅读器";
    }
  }

  function firstLineTitle(text) {
    var lines = String(text).split("\n");
    for (var i = 0; i < lines.length; i++) {
      var t = lines[i].trim();
      if (t.length) return lines[i].trimEnd();
    }
    return "(空白)";
  }

  function restAfterTitleLine(text) {
    var lines = String(text).split("\n");
    var i = 0;
    while (i < lines.length && lines[i].trim() === "") i++;
    if (i >= lines.length) return "";
    return lines.slice(i + 1).join("\n");
  }

  function buildExportMarkdown() {
    var meta = BOOK_META[bookId] || {};
    var bookTitle = typeof meta.title === "string" ? meta.title : "";
    var author = typeof meta.author === "string" ? meta.author.trim() : "";
    var lines = [];
    lines.push("# " + (bookTitle || "未命名书籍"));
    lines.push("");
    lines.push(author ? "作者：" + author : "作者：—");
    lines.push("");

    var notes = loadNotes();
    if (!notes.length) {
      lines.push("_（暂无笔记）_");
      return lines.join("\n");
    }

    var chunks = [];
    for (var ni = 0; ni < notes.length; ni++) {
      var raw = String(blockText(notes[ni])).trim();
      var head = firstLineTitle(raw);
      var body = restAfterTitleLine(raw).trim();
      chunks.push("## " + head + "\n\n" + body);
    }
    lines.push(chunks.join("\n\n"));
    return lines.join("\n");
  }

  function setExportModalOpen(open) {
    if (!exportModal) return;
    exportModal.hidden = !open;
    if (open) {
      if (exportTextarea) {
        exportTextarea.value = buildExportMarkdown();
        exportTextarea.focus();
        exportTextarea.select();
      }
      document.body.classList.add("export-md-modal--open");
    } else {
      document.body.classList.remove("export-md-modal--open");
    }
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
      var bodyText = blockText(n);
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
      titleSpan.textContent = firstLineTitle(bodyText);
      head.appendChild(chev);
      head.appendChild(titleSpan);

      var body = document.createElement("div");
      body.className = "note-card__body";
      body.hidden = true;
      body.textContent = restAfterTitleLine(bodyText);

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
      return String(blockText(n)).trim() === text;
    });
    if (dup) {
      showHint("已存在相同笔记");
      return;
    }

    notes.push({
      id: Date.now(),
      type: "ai_mock",
      content: text,
      createdAt: Date.now()
    });
    saveNotes(notes);
    lastSyncedSnapshot = text;
    setSyncedUI(true);
    renderNotes();
  }

  applyBookToChrome();

  if (ta) {
    ta.addEventListener("input", function () {
      updateActionsVisibility();
      updateSyncFromInput();
    });
    ta.addEventListener("change", updateActionsVisibility);
  }

  if (btnAdd) btnAdd.addEventListener("click", onAddNote);

  if (listEl) listEl.addEventListener("click", onNotesListClick);

  if (btnExportMd) {
    btnExportMd.addEventListener("click", function () {
      setExportModalOpen(true);
    });
  }
  if (btnExportModalClose) {
    btnExportModalClose.addEventListener("click", function () {
      setExportModalOpen(false);
    });
  }
  if (exportModal) {
    var backdrop = exportModal.querySelector(".export-md-modal__backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setExportModalOpen(false);
      });
    }
    document.addEventListener("keydown", function (e) {
      if (exportModal.hidden || e.key !== "Escape") return;
      e.preventDefault();
      setExportModalOpen(false);
    });
  }

  updateActionsVisibility();
  updateSyncFromInput();
  renderNotes();
})();
