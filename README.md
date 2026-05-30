# 🐾 Petrův pes

Webová aplikace pro správu klientů, členství a rezervací.

Projekt vzniká jako moderní systém pro správu péče o psy, komunikaci s klienty a interní administraci.

---

## ✨ Funkce

### Veřejná část

* landing page
* informace o službách
* registrace / přihlášení

### Klientská zóna

* přehled profilu
* rezervace termínů
* členská sekce
* klientské informace na jednom místě

### Administrace

* správa klientů
* správa rezervací
* detail klienta
* interní dashboard

---

## 🧠 Přístup

Projekt staví na:

* jednoduchosti používání
* přehledné administraci
* rychlosti
* moderním UX bez zbytečné složitosti

Cílem není přehlcený systém, ale nástroj, který šetří čas a usnadňuje každodenní provoz.

---

## 🛠️ Tech Stack

* Astro
* React Islands
* TypeScript
* Tailwind CSS
* Supabase

  * Authentication
  * Database
  * Role-based access

---

## 📂 Struktura projektu

```txt
src/
├── components/
│   ├── admin/
│   ├── auth/
│   ├── dashboard/
│   └── layout/
├── layouts/
├── lib/
├── pages/
└── styles/
```

---

## ⚙️ Lokální spuštění

Nainstalujte dependencies:

```bash
npm install
```

Spusťte development server:

```bash
npm run dev
```

Aplikace poběží na:

```txt
http://localhost:4321
```

---

## 🔐 Environment Variables

Vytvořte `.env` soubor:

```env
PUBLIC_SUPABASE_URL=your_url
PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 📦 Build

Production build:

```bash
npm run build
```

Preview buildu:

```bash
npm run preview
```

---

## 🚧 Stav projektu

Aktivní vývoj.

Plánované oblasti:

* role management
* lepší správa rezervací
* členské funkce
* rozšíření administrace
* notifikace

---

## 👨‍💻 Development

Vyvíjí:

Michal Mikulenka

Pokud narazíte na issue nebo máte návrh na zlepšení, vytvořte issue nebo pull request.
