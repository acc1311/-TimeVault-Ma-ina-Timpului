# ⏳ TimeVault — Mașina Timpului

O aplicație web interactivă care îți arată **ce s-a întâmplat în istorie într-o anumită zi** — cu poze, descrieri și traduceri multilingve. Explorează evenimente istorice de la anul 38 până în prezent.

## ✨ Funcționalități

- 🗓️ **Explorează orice dată** — alege o zi din calendar, sau folosește butoanele *Astăzi* / *Zi aleatorie*
- 🌍 **Multilingv** — interfață și conținut traduse automat în **RO, EN, DE, FR, ES, IT**
- 🔄 **Traducere automată** (Google Translate) — fără limită, fără cheie API, fără cont
- 🗂️ **Filtrare după epocă** — glisează intervalul de ani pentru a restrânge rezultatele
- 🔍 **Căutare** — filtrează evenimentele după titlu, an sau text
- ⭐ **Favorite** — salvează evenimentele preferate (stocate local)
- 📤 **Export / Import** favorite — salvează lista ca fișier `.json` și o poți restaura
- 📜 **Scroll infinit** — încarcă automat mai multe evenimente când derulezi
- 🎴 **Toggle vizualizare** — comută între carduri cu imagini și listă compactă
- 🔗 **Share** — partajează evenimente cu text + link
- 🔎 **Modal detaliat** — fă click pe un eveniment pentru descriere completă, imagine și link Wikipedia
- 🌗 **Temă dark / light** — comutabilă, salvată în browser
- 📱 **PWA** — instalabil pe mobil/desktop, funcționează parțial offline

## 🚀 Cum o folosești

Este o aplicație **frontend pură** — nu necesită server, build sau instalare.

1. **Local:** deschide `index.html` direct în browser (dublu-click pe fișier). *(Service worker-ul/PWA necesită HTTP(S) — pentru localhost folosește un server local: `python -m http.server` în folder.)*
2. **Online (GitHub Pages):** urcă conținutul folderului într-un repo GitHub și activează *Settings → Pages → Deploy from branch* (branch `main`, root `/`).

> 💡 **Notă rețea:** aplicația are nevoie de internet pentru a accesa API-ul Wikipedia și Google Translate.

## 📁 Structură

```
├── index.html           # Structura paginii
├── styles.css           # Stiluri, teme dark/light, animații
├── app.js               # Toată logica: date, traducere, filtrare, click
├── sw.js                # Service worker (PWA/offline)
├── manifest.webmanifest # Manifest PWA
├── icon-192.png         # Icon aplicație (192px)
├── icon-512.png         # Icon aplicație (512px)
└── README.md            # Documentație
```

## 🛠️ Tehnologii

- **Vanilla JavaScript** (ES6+) — fără framework
- **Wikipedia REST API** — endpoint-ul `/feed/onthisday/events/{month}/{day}` pentru evenimentele zilei
- **Google Translate API** (endpoint gratuit `translate.googleapis.com`) — pentru traducere instantă
- **localStorage** — pentru preferințe (temă, limbă, vizualizare) și lista de favorite
- **Web Share API** — partajare nativă pe dispozitive mobile
- **Service Worker + PWA** — instalabil, cache offline pentru shell-ul aplicației și date
- **IntersectionObserver** — scroll infinit pentru încărcare automată

## 🌐 Limbi suportate

| Cod | Limbă | UI tradus | Conținut tradus |
|-----|-------|-----------|-----------------|
| RO | Română | ✅ | ✅ (din EN)  |
| EN | Engleză | ✅ | nativ |
| DE | Germană | ✅ | nativ |
| FR | Franceză | ✅ | nativ |
| ES | Spaniolă | ✅ | nativ |
| IT | Italiană | ✅ | nativ |

Pentru **RO** (și orice limbă fără conținut Wikipedia nativ) aplicația citește evenimentele în engleză și le traduce instant în limbă aleasă.

## 📄 API-uri folosite

- **Wikipedia:** `https://{lang}.wikipedia.org/api/rest_v1/feed/onthisday/events/{MM}/{DD}`
- **Google Translate:** `https://translate.googleapis.com/translate_a/single?client=gtx&sl={src}&tl={dst}&dt=t&q={text}`

## 🔒 Confidențialitate

- Fără conturi, fără cookie-uri, fără tracking
- Toate preferințele rămân **în browserul tău** (localStorage)
- Datele istorice provin de la Wikipedia (licență cc-by-sa)

## 📝 Licență

Free to use and modify for personal and educational purposes.

---

Construit ca o mașină a timpului. ⏳
