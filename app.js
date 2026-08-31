/* TimeVault — Mașina Timpului
 * Surse: Wikipedia REST API (onthisday + extract) + Google Translate (fără limită)
 */
(function () {
  "use strict";

  const MONTHS = {
    ro: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    it: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
  };

  // Limbi care au endpoint-ul onthisday pe Wikipedia
  const SUPPORTED = { en: true, de: true, fr: true, es: true, it: true };

  function buildI18n() {
    const base = {
      eyebrow: "On this day in history",
      sub: "Discover what happened across the centuries.",
      today: "Today", random: "Random day", dateLabel: "Pick a date",
      events: "events", span: "year span", media: "with images",
      read: "Read", loading: "Loading events…",
      translating: "Translating events…", more: "Learn more", share: "Share",
      search: "Search…", loadMore: "Load more", noResults: "No results found",
      favTitle: "Show favorites only", saved: "Saved", removeFav: "Remove from favorites",
      viewLabel: "Switch view", exportLabel: "Export favorites",
      importLabel: "Import favorites", exported: "Favorites exported",
      imported: "Favorites imported", importFailed: "Invalid favorites file",
      errTitle: "Could not load events", retry: "Try again",
      empty: "No events in the selected range.", filter: "Filter by era",
      wiki: "Read on Wikipedia", close: "Close",
      footer: "Historical data provided by ",
      footerSuffix: "(API REST). Built as a time machine."
    };
    const map = {
      ro: {
        eyebrow: "În ziua aceasta în istorie",
        sub: "Descoperă ce s-a întâmplat de-a lungul secolelor.",
        today: "Astăzi", random: "Zi aleatorie", dateLabel: "Alege o dată",
        events: "evenimente", span: "interval ani", media: "cu imagini",
        read: "Citește", loading: "Se încarcă evenimentele…",
        translating: "Se traduc evenimentele…", more: "Află mai multe", share: "Distribuie",
        search: "Caută…", loadMore: "Încarcă mai multe", noResults: "Niciun rezultat găsit",
        favTitle: "Doar favorite", saved: "Salvat", removeFav: "Șterge din favorite",
        viewLabel: "Schimbă vizualizarea", exportLabel: "Exportă favorite",
        importLabel: "Importă favorite", exported: "Favorite exportate",
        imported: "Favorite importate", importFailed: "Fișier de favorite invalid",
        errTitle: "Nu am putut încărca evenimentele", retry: "Încearcă din nou",
        empty: "Niciun eveniment în intervalul selectat.", filter: "Filtrează după epocă",
        wiki: "Citește pe Wikipedia", close: "Închide",
        footer: "Date istorice oferite de ",
        footerSuffix: "(API REST). Construit ca o mașină a timpului."
      },
      de: {
        eyebrow: "An diesem Tag in der Geschichte",
        sub: "Entdecke, was sich über die Jahrhunderte ereignet hat.",
        today: "Heute", random: "Zufälliger Tag", dateLabel: "Datum wählen",
        events: "Ereignisse", span: "Jahresspanne", media: "mit Bildern",
        read: "Lesen", loading: "Ereignisse werden geladen…",
        translating: "Ereignisse werden übersetzt…", more: "Mehr erfahren", share: "Teilen",
        search: "Suchen…", loadMore: "Mehr laden", noResults: "Keine Ergebnisse gefunden",
        favTitle: "Nur Favoriten", saved: "Gespeichert", removeFav: "Aus Favoriten entfernen",
        errTitle: "Ereignisse konnten nicht geladen werden", retry: "Erneut versuchen",
        empty: "Keine Ereignisse im gewählten Zeitraum.", filter: "Nach Epoche filtern",
        wiki: "Auf Wikipedia lesen", close: "Schließen",
        footer: "Historische Daten von ",
        footerSuffix: "(API-REST). Als Zeitmaschine gebaut."
      },
      fr: {
        eyebrow: "Ce jour dans l'histoire",
        sub: "Découvrez ce qui s'est passé à travers les siècles.",
        today: "Aujourd'hui", random: "Jour aléatoire", dateLabel: "Choisir une date",
        events: "événements", span: "intervalle d'années", media: "avec images",
        read: "Lire", loading: "Chargement des événements…",
        translating: "Traduction des événements…", more: "En savoir plus", share: "Partager",
        search: "Rechercher…", loadMore: "Charger plus", noResults: "Aucun résultat trouvé",
        favTitle: "Favoris uniquement", saved: "Enregistré", removeFav: "Retirer des favoris",
        errTitle: "Impossible de charger les événements", retry: "Réessayer",
        empty: "Aucun événement dans la plage sélectionnée.", filter: "Filtrer par époque",
        wiki: "Lire sur Wikipédia", close: "Fermer",
        footer: "Données historiques fournies par ",
        footerSuffix: "(API REST). Construit comme une machine à remonter le temps."
      },
      es: {
        eyebrow: "Tal día como hoy en la historia",
        sub: "Descubre qué pasó a lo largo de los siglos.",
        today: "Hoy", random: "Día aleatorio", dateLabel: "Elige una fecha",
        events: "eventos", span: "rango de años", media: "con imágenes",
        read: "Leer", loading: "Cargando eventos…",
        translating: "Traduciendo eventos…", more: "Saber más", share: "Compartir",
        search: "Buscar…", loadMore: "Cargar más", noResults: "No se encontraron resultados",
        favTitle: "Solo favoritos", saved: "Guardado", removeFav: "Quitar de favoritos",
        errTitle: "No se pudieron cargar los eventos", retry: "Reintentar",
        empty: "No hay eventos en el rango seleccionado.", filter: "Filtrar por época",
        wiki: "Leer en Wikipedia", close: "Cerrar",
        footer: "Datos históricos proporcionados por ",
        footerSuffix: "(API REST). Construida como una máquina del tiempo."
      },
      it: {
        eyebrow: "In questo giorno nella storia",
        sub: "Scopri cosa è successo attraverso i secoli.",
        today: "Oggi", random: "Giorno casuale", dateLabel: "Scegli una data",
        events: "eventi", span: "intervallo anni", media: "con immagini",
        read: "Leggi", loading: "Caricamento eventi…",
        translating: "Traduzione eventi…", more: "Scopri di più", share: "Condividi",
        search: "Cerca…", loadMore: "Carica altri", noResults: "Nessun risultato trovato",
        favTitle: "Solo preferiti", saved: "Salvato", removeFav: "Rimuovi dai preferiti",
        errTitle: "Impossibile caricare gli eventi", retry: "Riprova",
        empty: "Nessun evento nell'intervallo selezionato.", filter: "Filtra per epoca",
        wiki: "Leggi su Wikipedia", close: "Chiudi",
        footer: "Dati storici forniti da ",
        footerSuffix: "(API REST). Costruita come una macchina del tempo."
      }
    };
    map.en = base;
    return map;
  }

  const I18N = buildI18n();

  const state = {
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    lang: localStorage.getItem("tv-lang") || "ro",
    events: [],
    yearMin: 0,
    yearMax: new Date().getFullYear(),
    theme: localStorage.getItem("tv-theme") || "dark",
    search: "",
    favOnly: false,
    view: localStorage.getItem("tv-view") || "card",
    favs: loadFavorites(),
    rendered: 0,
    pageSize: 20
  };

  function loadFavorites() {
    try { return JSON.parse(localStorage.getItem("tv-favs") || "{}"); }
    catch (e) { return {}; }
  }
  function saveFavorites() {
    try { localStorage.setItem("tv-favs", JSON.stringify(state.favs)); } catch (e) {}
  }

  function exportFavorites() {
    const ids = Object.keys(state.favs);
    if (!ids.length) { showToast(t("noFavs", "No favorites yet")); return; }
    const blob = new Blob([JSON.stringify(state.favs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `timevault-favorites-${pad(state.month)}-${pad(state.day)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(t("exported"));
  }

  function importFavorites(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("bad");
        Object.keys(data).forEach((k) => { state.favs[k] = true; });
        saveFavorites();
        render();
        showToast(t("imported"));
      } catch (e) {
        showToast(t("importFailed"));
      }
    };
    reader.readAsText(file);
  }

  const $ = (id) => document.getElementById(id);
  const els = {
    body: document.body,
    heroDate: $("heroDate"), heroSub: $("heroSub"), heroEyebrow: $("heroEyebrow"),
    dateInput: $("dateInput"), dateLabel: document.querySelector('label[for="dateInput"]'),
    todayBtn: $("todayBtn"), randomBtn: $("randomBtn"),
    langSelect: $("langSelect"), themeToggle: $("themeToggle"),
    stats: $("stats"), statCount: $("statCount"), statSpan: $("statSpan"), statMedia: $("statMedia"),
    filterBar: $("filterBar"), filterHead: document.querySelector(".filter-head span:first-child"),
    filterRange: $("filterRange"), yearMin: $("yearMin"), yearMax: $("yearMax"),
    timeline: $("timeline"),
    modal: $("modal"), modalMedia: $("modalMedia"), modalYear: $("modalYear"),
    modalTitle: $("modalTitle"), modalExtract: $("modalExtract"), modalDesc: $("modalDesc"),
    modalLink: $("modalLink"), modalClose: document.querySelector(".modal-close"),
    modalShare: $("modalShare"),
    footerText: $("footerText"),
    statEventsLabel: $("statEventsLabel"),
    statSpanLabel: $("statSpanLabel"),
    statMediaLabel: $("statMediaLabel"),
    toolbar: $("toolbar"), searchInput: $("searchInput"),
    favToggle: $("favToggle"), viewToggle: $("viewToggle"),
    exportFavs: $("exportFavs"), importFavs: $("importFavs"), importFavsInput: $("importFavsInput")
  };

  const pad = (n) => String(n).padStart(2, "0");
  const currentYear = () => new Date().getFullYear();
  const monthName = (m) => (MONTHS[state.lang] || MONTHS.en)[m - 1];
  const t = (key, def) => (I18N[state.lang] && I18N[state.lang][key]) || def || I18N.en[key];

  function applyTheme() {
    els.body.setAttribute("data-theme", state.theme);
    els.themeToggle.querySelector(".theme-icon").textContent = state.theme === "dark" ? "🌙" : "☀️";
    localStorage.setItem("tv-theme", state.theme);
  }

  function applyI18n() {
    els.heroEyebrow.textContent = t("eyebrow");
    els.heroSub.textContent = t("sub");
    els.todayBtn.textContent = t("today");
    els.randomBtn.textContent = t("random");
    if (els.dateLabel) els.dateLabel.textContent = t("dateLabel");
    if (els.filterHead) els.filterHead.textContent = t("filter");
    if (els.statEventsLabel) els.statEventsLabel.textContent = t("events");
    if (els.statSpanLabel) els.statSpanLabel.textContent = t("span");
    if (els.statMediaLabel) els.statMediaLabel.textContent = t("media");
    els.modalLink.textContent = t("wiki") + " →";
    els.modalClose.setAttribute("aria-label", t("close"));
    if (els.searchInput) els.searchInput.placeholder = t("search");
    if (els.favToggle) { els.favToggle.title = t("favTitle"); els.favToggle.setAttribute("aria-label", t("favTitle")); }
    if (els.viewToggle) els.viewToggle.title = t("viewLabel", "Switch view");
    if (els.exportFavs) { els.exportFavs.title = t("exportLabel"); els.exportFavs.setAttribute("aria-label", t("exportLabel")); }
    if (els.importFavs) { els.importFavs.title = t("importLabel"); els.importFavs.setAttribute("aria-label", t("importLabel")); }
    if (els.footerText) {
      const pre = els.footerText.querySelector('[data-role="footerPrefix"]');
      const suf = els.footerText.querySelector('[data-role="footerSuffix"]');
      if (pre) pre.textContent = t("footer");
      if (suf) suf.textContent = I18N[state.lang] && I18N[state.lang].footerSuffix ? " " + I18N[state.lang].footerSuffix : suf ? suf.textContent : "";
    }
    localStorage.setItem("tv-lang", state.lang);
  }

  function setDate(month, day) {
    state.month = month; state.day = day;
    els.dateInput.value = `${currentYear()}-${pad(month)}-${pad(day)}`;
    els.heroDate.textContent = `${monthName(state.month)} ${state.day}`;
  }

  // ---------- Traducere (Google Translate — gratuit, fără limită, fără cheie) ----------
  const _caches = {};
  function getCache(sl, tl) {
    const k = sl + "-" + tl;
    if (!_caches[k]) _caches[k] = loadCache(sl, tl);
    return _caches[k];
  }
  function flushCache(sl, tl) {
    const k = sl + "-" + tl;
    if (_caches[k]) saveCache(sl, tl, _caches[k]);
  }
  function loadCache(sl, tl) {
    try { return JSON.parse(localStorage.getItem("tv-tr-" + sl + "-" + tl) || "{}"); }
    catch (e) { return {}; }
  }
  function saveCache(sl, tl, map) {
    try { localStorage.setItem("tv-tr-" + sl + "-" + tl, JSON.stringify(map)); } catch (e) {}
  }

  async function googleTranslate(text, sl, tl) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
    let attempt = 0;
    const max = 3;
    while (true) {
      try {
        const res = await fetch(url);
        if (res.status === 429 || res.status === 503) {
          // rate-limited -> așteptăm și reîncercăm cu backoff
          if (++attempt >= max) throw new Error("Google Translate rate limited");
          await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt)));
          continue;
        }
        if (!res.ok) throw new Error("Google Translate HTTP " + res.status);
        const data = await res.json();
        return data[0].map((s) => s[0]).join("");
      } catch (e) {
        if (e.message === "Google Translate rate limited") throw e;
        if (++attempt >= max) throw e;
        await new Promise((r) => setTimeout(r, 500 * Math.pow(2, attempt)));
      }
    }
  }

  // Google Translate acceptă ~5000 caractere per cerere
  function splitChunks(text, max) {
    const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
    const chunks = [];
    let cur = "";
    for (const s of sentences) {
      if (cur && (cur + s).length > max) { chunks.push(cur.trim()); cur = s; }
      else cur += s;
    }
    if (cur.trim()) chunks.push(cur.trim());
    return chunks.length ? chunks : [text];
  }

  async function translateChunk(chunk, tl, sl, cache) {
    if (cache[chunk]) return cache[chunk];
    try {
      const out = await googleTranslate(chunk, sl, tl);
      if (!out) return chunk;
      cache[chunk] = out;
      return out;
    } catch (e) { return chunk; }
  }

  async function translate(text, tl, sl) {
    if (!text || tl === sl) return text;
    const cache = getCache(sl, tl);
    if (cache[text]) return cache[text];

    if (text.length <= 4500) {
      const out = await translateChunk(text, tl, sl, cache);
      if (out !== text) cache[text] = out;
      return out;
    }

    const chunks = splitChunks(text, 4500);
    let out = "";
    for (const c of chunks) {
      const tr = await translateChunk(c, tl, sl, cache);
      out += (out && !/\s$/.test(out) ? " " : "") + tr;
    }
    if (out.trim() && out.trim() !== text.trim()) cache[text] = out;
    return out;
  }

  async function translateAndUpdate(events, tl, sl) {
    if (tl === sl) return;
    const CONC = 4;
    for (let i = 0; i < events.length; i += CONC) {
      const batch = events.slice(i, i + CONC);
      await Promise.all(batch.map(async (ev) => {
        try {
          const srcText = ev._origExtract || ev._origText;
          const [trExtract, trTitle, trDesc] = await Promise.all([
            translate(srcText, tl, sl),
            translate(ev._origTitle || "", tl, sl),
            ev._origDesc ? translate(ev._origDesc, tl, sl) : Promise.resolve("")
          ]);
          if (trExtract && trExtract !== srcText) ev.displayExtract = trExtract;
          if (trTitle && trTitle !== ev._origTitle) ev.displayTitle = trTitle;
          if (trDesc && trDesc !== ev._origDesc) ev.displayDesc = trDesc;
          updateCardText(ev);
        } catch (e) {}
      }));
    }
    flushCache(sl, tl);
  }

  function updateCardText(ev) {
    const el = els.timeline.querySelector(`.event[data-id="${ev._id}"]`);
    if (!el) return;
    const textEl = el.querySelector(".event-text");
    const titleEl = el.querySelector(".event-title");
    if (textEl) textEl.textContent = ev.displayExtract || ev._origExtract || ev._origText;
    if (titleEl && ev.displayTitle) titleEl.textContent = ev.displayTitle;
  }

  // ---------- Modal (deschide în aceeași pagină) ----------
  function openModal(ev) {
    const source = SUPPORTED[state.lang] ? state.lang : "en";
    const sl = source, tl = state.lang;

    els.modalYear.textContent = ev.year;
    els.modalMedia.innerHTML = ev.img
      ? `<img src="${ev.img}" alt="${escapeHtml(ev.displayExtract || ev._origText)}" />`
      : `<div class="no-img">${ev.year}</div>`;
    els.modalLink.href = ev.link || "#";
    els.modalShare.querySelector("span").textContent = t("share");
    els.modalShare.onclick = () => shareEvent(ev);

    // Extract (tradus deja în fundal; dacă nu, traducem la deschidere)
    const fillExtract = async () => {
      const src = ev._origExtract || ev._origText;
      if (tl === sl) { els.modalExtract.textContent = ev.displayExtract || src; return; }
      if (ev.displayExtract && ev.displayExtract !== src) { els.modalExtract.textContent = ev.displayExtract; return; }
      els.modalExtract.textContent = t("translating");
      const tr = await translate(src, tl, sl);
      ev.displayExtract = tr; els.modalExtract.textContent = tr;
      updateCardText(ev); flushCache(sl, tl);
    };

    // Title + desc (traduse la deschidere, la cerere)
    const fillMeta = async () => {
      if (tl === sl) {
        els.modalTitle.textContent = ev._origTitle || "";
        if (ev._origDesc) { els.modalDesc.hidden = false; els.modalDesc.textContent = ev._origDesc; }
        else els.modalDesc.hidden = true;
        return;
      }
      els.modalTitle.textContent = t("translating");
      const tr = await translate(ev._origTitle || "", tl, sl);
      ev.displayTitle = tr; els.modalTitle.textContent = tr;
      if (ev._origDesc) {
        els.modalDesc.hidden = false; els.modalDesc.textContent = t("translating");
        const dr = await translate(ev._origDesc, tl, sl);
        ev.displayDesc = dr; els.modalDesc.textContent = dr;
      } else els.modalDesc.hidden = true;
      flushCache(sl, tl);
    };

    fillExtract();
    fillMeta();

    els.modal.hidden = false;
    els.body.classList.add("modal-open");
    const card = els.modal.querySelector(".modal-card");
    const backdrop = els.modal.querySelector(".modal-backdrop");
    backdrop.style.animation = "fade .2s ease";
    card.style.animation = "pop .25s cubic-bezier(.2,.8,.2,1)";
    els.modalClose.focus();
    storeLastFocused();
  }

  let lastFocused = null;
  function storeLastFocused() { lastFocused = document.activeElement; }

  function focusTrap(e) {
    if (!els.modal || els.modal.hidden) return;
    if (e.key !== "Tab") return;
    const focusables = els.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function closeModal() {
    const backdrop = els.modal.querySelector(".modal-backdrop");
    const card = els.modal.querySelector(".modal-card");
    backdrop.style.animation = "fadeOut .18s ease forwards";
    card.style.animation = "popOut .18s ease forwards";
    setTimeout(() => {
      els.modal.hidden = true;
      els.body.classList.remove("modal-open");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }, 170);
  }

  // ---------- Date ----------
  async function loadEvents() {
    showLoading(t("loading"));
    const source = SUPPORTED[state.lang] ? state.lang : "en";
    const url = `https://${source}.wikipedia.org/api/rest_v1/feed/onthisday/events/${pad(state.month)}/${pad(state.day)}`;
    try {
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      state.events = (data.events || []).map((e, i) => {
        const page = (e.pages && e.pages.find((p) => p.originalimage || p.thumbnail)) || null;
        const extract = page && page.extract ? page.extract : "";
        return {
          _id: i,
          year: e.year,
          _origText: e.text || "",
          _origExtract: extract,
          displayExtract: extract,
          _origTitle: page && page.titles ? page.titles.normalized : "",
          displayTitle: page && page.titles ? page.titles.normalized : "",
          _origDesc: page && page.description ? page.description : "",
          displayDesc: page && page.description ? page.description : "",
          img: page ? (page.originalimage ? page.originalimage.source : page.thumbnail.source) : null,
          link: page && page.content_urls && page.content_urls.desktop ? page.content_urls.desktop.page : null
        };
      }).sort((a, b) => a.year - b.year);

      setupFilterRange();
      state.rendered = state.pageSize;
      render();

      // Traducere progresivă în fundal (doar dacă e nevoie)
      if (source !== state.lang) translateAndUpdate(state.events, state.lang, source);
    } catch (err) {
      showError(err);
    }
  }

  function setupFilterRange() {
    const years = state.events.map((e) => e.year).filter((y) => typeof y === "number");
    const min = years.length ? Math.min(...years) : 0;
    const max = years.length ? Math.max(...years) : currentYear();
    els.yearMin.min = els.yearMax.min = min;
    els.yearMin.max = els.yearMax.max = max;
    state.yearMin = min; state.yearMax = max;
    els.yearMin.value = min; els.yearMax.value = max;
    updateFilterLabel();
  }

  function updateFilterLabel() { els.filterRange.textContent = `${state.yearMin} – ${state.yearMax}`; }

  function matchesSearch(ev) {
    const q = state.search.trim().toLowerCase();
    if (!q) return true;
    const hay = [
      String(ev.year),
      ev.displayTitle || ev._origTitle || "",
      ev.displayExtract || ev._origExtract || ev._origText,
      ev.displayDesc || ev._origDesc || ""
    ].join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function visibleEvents() {
    return state.events.filter((e) =>
      e.year >= state.yearMin && e.year <= state.yearMax &&
      matchesSearch(e) &&
      (!state.favOnly || state.favs[e._id])
    );
  }

  function eventIsFav(ev) { return !!state.favs[ev._id]; }
  function toggleFav(ev) {
    if (state.favs[ev._id]) { delete state.favs[ev._id]; }
    else { state.favs[ev._id] = true; }
    saveFavorites();
    updateFavButtons(ev);
  }
  function updateFavButtons(ev) {
    const el = document.querySelector(`.event[data-id="${ev._id}"] [data-fav]`);
    if (el) {
      const on = eventIsFav(ev);
      el.classList.toggle("active", on);
      el.setAttribute("aria-label", on ? t("removeFav") : t("saved"));
      el.title = on ? t("removeFav") : t("saved");
    }
  }

  // ---------- Render ----------
  function showLoading(msg) {
    els.stats.hidden = true; els.filterBar.hidden = true; els.timeline.innerHTML = "";
    const p = document.createElement("div");
    p.className = "placeholder";
    p.innerHTML = `<div class="spinner"></div><p>${escapeHtml(msg)}</p>`;
    els.timeline.appendChild(p);
  }

  function showError(err) {
    els.timeline.innerHTML = "";
    const box = document.createElement("div");
    box.className = "error-box";
    box.innerHTML = `<h3>${t("errTitle")}</h3><p>${escapeHtml(String(err.message || err))}</p>
      <button class="btn btn-primary" id="retryBtn">${t("retry")}</button>`;
    els.timeline.appendChild(box);
    box.querySelector("#retryBtn").addEventListener("click", loadEvents);
  }

  function render() {
    const events = visibleEvents();
    els.stats.hidden = false; els.filterBar.hidden = false; els.toolbar.hidden = false;
    const withMedia = state.events.filter((e) => e.img).length;
    const years = state.events.map((e) => e.year).filter((y) => typeof y === "number");
    const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "—";

    els.statCount.textContent = state.events.length;
    els.statSpan.textContent = span;
    els.statMedia.textContent = withMedia;

    els.timeline.innerHTML = "";
    if (!events.length) {
      const empty = document.createElement("div");
      empty.className = "empty"; empty.textContent = t("empty");
      els.timeline.appendChild(empty);
      return;
    }

    state.rendered = Math.min(state.rendered || state.pageSize, events.length);
    const slice = events.slice(0, state.rendered);
    slice.forEach((ev, i) => els.timeline.appendChild(buildCard(ev, i)));

    appendLoadMore(events.length);
  }

  // Loader cu scroll infinit (IntersectionObserver) + fallback buton
  function appendLoadMore(total) {
    destroyInfiniteObserver();
    if (state.rendered >= total) return;

    if (!("IntersectionObserver" in window)) {
      appendLoadMoreButton(total);
      return;
    }

    const sentinel = document.createElement("div");
    sentinel.className = "sentinel";
    sentinel.innerHTML = `<div class="spinner"></div>`;
    els.timeline.appendChild(sentinel);

    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      state.rendered = Math.min(state.rendered + state.pageSize, total);
      const events = visibleEvents();
      const start = els.timeline.querySelectorAll(".event").length;
      for (let i = start; i < state.rendered && i < events.length; i++) {
        els.timeline.insertBefore(buildCard(events[i], i), sentinel);
      }
      if (state.rendered < events.length) {
        appendLoadMore(events.length);
      } else {
        sentinel.remove();
      }
    }, { rootMargin: "300px" });
    state._io = io;
    io.observe(sentinel);
  }

  function appendLoadMoreButton(total) {
    destroyInfiniteObserver();
    const btn = document.createElement("button");
    btn.className = "btn btn-ghost load-more";
    btn.textContent = `${t("loadMore")} (${total - state.rendered})`;
    btn.addEventListener("click", () => {
      state.rendered = Math.min(state.rendered + state.pageSize, total);
      render();
    });
    els.timeline.appendChild(btn);
  }

  function destroyInfiniteObserver() {
    if (state._io) { state._io.disconnect(); state._io = null; }
  }

  function buildCard(ev, index) {
    const isList = state.view === "list";
    const wrap = document.createElement("article");
    wrap.className = "event" + (isList ? " event-list" : "");
    wrap.dataset.id = ev._id;
    wrap.style.animationDelay = Math.min(index * 40, 400) + "ms";
    wrap.setAttribute("role", "button");
    wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("aria-label", ev.year + " — " + (ev.displayTitle || ev._origTitle || "") + ": " + (ev.displayExtract || ev._origExtract || ev._origText));

    const media = ev.img
      ? `<div class="card-media"><img src="${ev.img}" alt="${escapeHtml(ev.displayExtract || ev._origText)}" loading="lazy" /></div>`
      : `<div class="card-media"><div class="no-img">${ev.year}</div></div>`;
    const text = ev.displayExtract || ev._origExtract || ev._origText;
    const title = ev.displayTitle || ev._origTitle || "";
    const favOn = eventIsFav(ev);
    const titleBlock = title
      ? (isList
          ? `<h3 class="event-title">${escapeHtml(title)}</h3>`
          : `<h3 class="event-title">${escapeHtml(title)}</h3>`)
      : "";

    if (isList) {
      wrap.innerHTML = `
        <button class="btn-fav" data-fav aria-label="${favOn ? escapeHtml(t("removeFav")) : escapeHtml(t("saved"))}" title="${favOn ? escapeHtml(t("removeFav")) : escapeHtml(t("saved"))}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${favOn ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
        <div class="list-body">
          <span class="event-year">${ev.year}</span>
          ${titleBlock}
          <p class="event-text">${escapeHtml(text)}</p>
          <div class="event-meta">
            <button class="btn-share" data-share aria-label="${escapeHtml(t("share"))}" title="${escapeHtml(t("share"))}">${t("share")}</button>
          </div>
        </div>`;
    } else {
      wrap.innerHTML = `
        <div class="card">
          ${media}
          <button class="btn-fav btn-fav-card" data-fav aria-label="${favOn ? escapeHtml(t("removeFav")) : escapeHtml(t("saved"))}" title="${favOn ? escapeHtml(t("removeFav")) : escapeHtml(t("saved"))}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${favOn ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </button>
          <div class="card-body">
            <span class="event-year">${ev.year}</span>
            ${titleBlock}
            <p class="event-text">${escapeHtml(text)}</p>
            <div class="event-meta">
              <button class="btn-share" data-share aria-label="${escapeHtml(t("share"))}" title="${escapeHtml(t("share"))}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>${t("share")}</span>
              </button>
              <span class="card-more">${t("more")} →</span>
            </div>
          </div>
        </div>`;
    }

    const open = () => openModal(ev);
    wrap.addEventListener("click", (e) => {
      if (e.target.closest("[data-share]")) { e.stopPropagation(); shareEvent(ev); return; }
      if (e.target.closest("[data-fav]")) { e.stopPropagation(); toggleFav(ev); return; }
      open();
    });
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    return wrap;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function shareEvent(ev) {
    const title = ev.displayTitle || ev._origTitle || "";
    const text = ev.displayExtract || ev._origExtract || ev._origText;
    const shareText = `${ev.year} — ${title}\n${text.substring(0, 200)}${text.length > 200 ? "…" : ""}`;
    const url = ev.link || `https://en.wikipedia.org/wiki/${encodeURIComponent(ev._origTitle || "")}`;
    if (navigator.share) {
      navigator.share({ title: `${ev.year} — ${title}`, text: shareText, url }).catch(() => {});
    } else {
      const clip = `${shareText}\n${url}`;
      navigator.clipboard.writeText(clip).then(() => {
        showToast(t("share") + " ✓");
      }).catch(() => {});
    }
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ---------- Events ----------
  function bind() {
    els.dateInput.addEventListener("change", () => {
      if (!els.dateInput.value) return;
      const [y, m, d] = els.dateInput.value.split("-").map(Number);
      state.month = m; state.day = d;
      els.heroDate.textContent = `${monthName(state.month)} ${state.day}`;
      loadEvents();
    });
    els.todayBtn.addEventListener("click", () => {
      const now = new Date(); setDate(now.getMonth() + 1, now.getDate()); loadEvents();
    });
    els.randomBtn.addEventListener("click", () => {
      const m = Math.floor(Math.random() * 12) + 1;
      const d = Math.floor(Math.random() * daysInMonth(m)) + 1;
      setDate(m, d); loadEvents();
    });
    els.langSelect.addEventListener("change", () => {
      state.lang = els.langSelect.value;
      applyI18n();
      els.heroDate.textContent = `${monthName(state.month)} ${state.day}`;
      loadEvents();
    });
    els.themeToggle.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark"; applyTheme();
    });
    els.yearMin.addEventListener("input", () => {
      let v = Number(els.yearMin.value);
      if (v > Number(els.yearMax.value)) { v = Number(els.yearMax.value); els.yearMin.value = v; }
      state.yearMin = v; updateFilterLabel(); state.rendered = state.pageSize; render();
    });
    els.yearMax.addEventListener("input", () => {
      let v = Number(els.yearMax.value);
      if (v < Number(els.yearMin.value)) { v = Number(els.yearMin.value); els.yearMax.value = v; }
      state.yearMax = v; updateFilterLabel(); state.rendered = state.pageSize; render();
    });
    if (els.searchInput) {
      els.searchInput.addEventListener("input", () => {
        state.search = els.searchInput.value;
        state.rendered = state.pageSize;
        render();
      });
    }
    if (els.favToggle) {
      els.favToggle.addEventListener("click", () => {
        state.favOnly = !state.favOnly;
        els.favToggle.classList.toggle("active", state.favOnly);
        els.favToggle.setAttribute("aria-pressed", state.favOnly ? "true" : "false");
        state.rendered = state.pageSize;
        render();
      });
    }
    if (els.viewToggle) {
      els.viewToggle.addEventListener("click", () => {
        state.view = state.view === "card" ? "list" : "card";
        els.viewToggle.classList.toggle("active", state.view === "list");
        localStorage.setItem("tv-view", state.view);
        state.rendered = state.pageSize;
        render();
      });
    }
    if (els.exportFavs) {
      els.exportFavs.addEventListener("click", exportFavorites);
    }
    if (els.importFavs && els.importFavsInput) {
      els.importFavs.addEventListener("click", () => els.importFavsInput.click());
      els.importFavsInput.addEventListener("change", () => {
        if (els.importFavsInput.files && els.importFavsInput.files[0]) {
          importFavorites(els.importFavsInput.files[0]);
        }
        els.importFavsInput.value = "";
      });
    }

    // Modal close
    els.modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !els.modal.hidden) closeModal();
    });
    document.addEventListener("keydown", focusTrap);
  }

  function daysInMonth(m) { return new Date(currentYear(), m, 0).getDate(); }

  function init() {
    applyTheme();
    els.langSelect.value = state.lang;
    setDate(state.month, state.day);
    applyI18n();
    if (els.viewToggle && state.view === "list") els.viewToggle.classList.add("active");
    if (els.favToggle && state.favOnly) {
      els.favToggle.classList.add("active");
      els.favToggle.setAttribute("aria-pressed", "true");
    }
    bind();
    loadEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
