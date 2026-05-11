(function () {
  if (typeof READER_MOCK_BOOKS === "undefined" || !Array.isArray(READER_MOCK_BOOKS)) return;
  var grid = document.getElementById("shelfBookGrid");
  if (!grid) return;

  grid.innerHTML = "";

  for (var i = 0; i < READER_MOCK_BOOKS.length; i++) {
    var bk = READER_MOCK_BOOKS[i];
    var pct = typeof bk.progressPercent === "number" ? bk.progressPercent : 0;
    pct = Math.min(100, Math.max(0, pct));

    var a = document.createElement("a");
    a.className = "shelf-book-card";
    a.href = "index.html?book=" + encodeURIComponent(bk.id);

    var h2 = document.createElement("h2");
    h2.className = "shelf-book-card__title";
    h2.textContent = bk.title;

    var wrap = document.createElement("div");
    wrap.className = "shelf-book-card__cover-wrap";
    var img = document.createElement("img");
    img.className = "shelf-book-card__cover";
    img.src = bk.coverSrc;
    img.alt = "《" + (bk.shortTitle || bk.title) + "》封面";
    img.width = 280;
    img.height = 420;
    wrap.appendChild(img);

    var foot = document.createElement("footer");
    foot.className = "shelf-book-card__footer";
    var track = document.createElement("div");
    track.className = "shelf-book-card__progress-track";
    track.setAttribute("aria-hidden", "true");
    var fill = document.createElement("div");
    fill.className = "shelf-book-card__progress-fill";
    fill.style.width = pct + "%";
    track.appendChild(fill);
    var lab = document.createElement("span");
    lab.className = "shelf-book-card__progress-label";
    lab.textContent = pct + "%";
    foot.appendChild(track);
    foot.appendChild(lab);

    a.appendChild(h2);
    a.appendChild(wrap);
    a.appendChild(foot);
    grid.appendChild(a);
  }
})();
