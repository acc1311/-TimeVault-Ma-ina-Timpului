
# ⏳ TimeVault — Mașina Timpului / Time Machine

[![License: Free](https://img.shields.io/badge/License-Free-green.svg)](#-licență--license)
[![PWA](https://img.shields.io/badge/PWA-installable-purple.svg)](#-tehnologii--technologies)
[![Languages](https://img.shields.io/badge/languages-6-orange.svg)](#-limbi-suportate--supported-languages)

> **RO:** O aplicație web interactivă care îți arată **ce s-a întâmplat în istorie într-o anumită zi** — cu poze, descrieri și traduceri multilingve. Explorează evenimente istorice de la anul 38 până în prezent.
>
> **EN:** An interactive web application that shows you **what happened in history on a specific day** — featuring photos, descriptions, and multilingual translations. Explore historical events from 38 AD to the present day.

---

## ✨ Funcționalități / Features

| Funcționalitate / Feature | Descriere (RO) | Description (EN) |
|---|---|---|
| 🗓️ **Date Explorer** | Alege o zi din calendar, sau folosește *Astăzi* / *Zi aleatorie*. | Pick a calendar day, or use *Today* / *Random day*. |
| 🌍 **Multilingual** | Interfață și conținut traduse în **RO, EN, DE, FR, ES, IT**. | Interface and content translated into **RO, EN, DE, FR, ES, IT**. |
| 🔄 **Auto Translation** | Traducere automată (Google Translate) fără limită/cheie API. | Unlimited automatic translation via Google Translate (no API key required). |
| 🗂️ **Era Filtering** | Glisează intervalul de ani pentru a restrânge rezultatele. | Slide the year range selector to narrow down events. |
| 🔍 **Search** | Filtrează evenimentele după titlu, an sau text. | Filter events by title, year, or content text. |
| ⭐ **Favorites** | Salvează evenimentele preferate în `localStorage`. | Save favorite historical events directly to `localStorage`. |
| 📤 **Export / Import** | Salvează și restaurează lista de favorite ca fișier `.json`. | Export and restore your favorites list as a `.json` file. |
| 📜 **Infinite Scroll** | Încarcă automat mai multe evenimente la derulare. | Automatically loads more historical events upon scrolling. |
| 🎴 **Toggle View** | Comută între carduri cu imagini și listă compactă. | Switch between visual image cards and a compact list view. |
| 🔗 **Share** | Partajează evenimente cu text și link direct. | Share events directly with text and link integration. |
| 🔎 **Detail Modal** | Click pentru descriere completă, imagine și link Wikipedia. | Click any event for full description, image, and Wikipedia link. |
| 🌗 **Dark / Light Theme** | Temă comutabilă, salvată automat în browser. | Toggleable dark/light theme, saved automatically in browser. |
| 📱 **PWA Support** | Instalabil pe mobil/desktop, funcționează parțial offline. | Installable on mobile/desktop with partial offline capabilities. |

---

## 🚀 Cum o folosești / How to Use

**RO:** Este o aplicație **frontend pură** — nu necesită server, build sau pas de instalare.  
**EN:** It is a **pure frontend application** — requires no backend server, build process, or installation.

### 1. Local / Local Environment
- **RO:** Deschide `index.html` direct în browser (dublu-click pe fișier). *Notă: Pentru PWA/Service Worker este recomandat un server local (`python -m http.server` în folder).*
- **EN:** Open `index.html` directly in your browser. *Note: For PWA/Service Worker support, a local HTTP server is recommended (`python -m http.server` inside the directory).*

### 2. Online (GitHub Pages)
- **RO:** Urcă folderul într-un depozit GitHub și activează *Settings → Pages → Deploy from branch* (`main`, root `/`).
- **EN:** Push the directory to a GitHub repository and enable *Settings → Pages → Deploy from branch* (`main`, root `/`).

> 💡 **Notă rețea / Network note:**  
> **RO:** Aplicația necesită conexiune la internet pentru API-urile Wikipedia și Google Translate.  
> **EN:** An active internet connection is required to fetch Wikipedia events and perform dynamic translations.

---

## 📁 Structură Proiect / Project Structure

```text
├── index.html            # Structura paginii / Markup layout
├── styles.css            # Stiluri, teme dark/light, animații / Styling & themes
├── app.js                # Logică: date, traducere, filtrare / App logic
├── sw.js                 # Service worker (PWA/offline)
├── manifest.webmanifest  # Manifest PWA
├── icon-192.png          # Icon aplicație (192px)
├── icon-512.png          # Icon aplicație (512px)
└── README.md             # Documentație / Documentation

```

---

## 🛠️ Tehnologii / Technologies

* **Vanilla JavaScript (ES6+)** — Fără framework-uri externe / *Framework-free implementation*
* **Wikipedia REST API** — Endpoint `/feed/onthisday/events/{month}/{day}`
* **Google Translate API** — Endpoint gratuit `translate.googleapis.com` / *Free translation endpoint*
* **localStorage** — Salvare preferințe și lista de favorite / *Stores user preferences & favorites*
* **Web Share API** — Partajare nativă pe dispozitive mobile / *Native mobile sharing*
* **Service Worker + PWA** — Instalabil, cache offline / *Installable app shell caching*
* **IntersectionObserver** — Scroll infinit performant / *Smooth infinite scrolling*

---

## 🌐 Limbi Suportate / Supported Languages

| Cod / Code | Limbă / Language | Interfață / UI | Conținut / Content |
| --- | --- | --- | --- |
| **RO** | Română / Romanian | ✅ | ✅ *(Tradus din EN / Translated from EN)* |
| **EN** | Engleză / English | ✅ | Nativ / Native |
| **DE** | Germană / German | ✅ | Nativ / Native |
| **FR** | Franceză / French | ✅ | Nativ / Native |
| **ES** | Spaniolă / Spanish | ✅ | Nativ / Native |
| **IT** | Italiană / Italian | ✅ | Nativ / Native |

> **RO:** Pentru limbi fără suport Wikipedia direct (precum **RO**), aplicația preia evenimentele în engleză și le traduce automat pe loc.
> **EN:** For languages without native Wikipedia feeds (such as **RO**), the application fetches events in English and performs dynamic instant translations.

---

## 📄 API-uri Utilizate / Used APIs

* **Wikipedia:** `https://{lang}.wikipedia.org/api/rest_v1/feed/onthisday/events/{MM}/{DD}`
* **Google Translate:** `https://translate.googleapis.com/translate_a/single?client=gtx&sl={src}&tl={dst}&dt=t&q={text}`

---

## 🔒 Confidențialitate / Privacy

* **RO:** Fără conturi, cookie-uri sau urmărire (tracking). Toate datele sunt salvate **local în browserul tău** (`localStorage`).
* **EN:** No accounts, cookies, or tracking. All preferences and saved events remain **locally in your browser** (`localStorage`).

---

## 📝 Licență / License

**RO:** Gratuit pentru utilizare și modificare în scopuri personale și educaționale.

**EN:** Free to use and modify for personal and educational purposes.

---

*Construit ca o mașină a timpului. ⏳ / Built as a time machine. ⏳*
