<div align="center">
<div align="center">

<br/>

██████╗ ██╗   ██╗██████╗  █████╗ ███╗   ██╗    ██╗  ██╗██╗   ██╗██████╗
██╔═══██╗██║   ██║██╔══██╗██╔══██╗████╗  ██║    ██║  ██║██║   ██║██╔══██╗
██║   ██║██║   ██║██████╔╝███████║██╔██╗ ██║    ███████║██║   ██║██████╔╝
██║▄▄ ██║██║   ██║██╔══██╗██╔══██║██║╚██╗██║    ██╔══██║██║   ██║██╔══██╗
╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║ ╚████║    ██║  ██║╚██████╔╝██████╔╝
╚════▀╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝


**A Modern, High-Performance Al-Quran Reading & Learning Platform**

---

# 📖 Quran Hub

### **Connect with the Divine Wisdom**

**The Ultimate Production-Grade Digital Quran Experience with Multi-Language Support**

---

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-white?style=for-the-badge&logo=vercel&logoColor=black)](https://quran-hub-vert.vercel.app/)

---

[**Explore Surahs**](#-key-capabilities) • [**Live Demo**](https://quran-hub-vert.vercel.app/) • [**Technical Specs**](#-tech-stack) • [**Getting Started**](#-getting-started)

---

</div>

## 📑 Table of Contents

- [✨ Key Capabilities](#-key-capabilities)
- [🛠️ Tech Stack](#-tech-stack)
- [🌍 Supported Ecosystem](#-supported-ecosystem)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)

---

## ✨ Key Capabilities

<div align="center">
<table>
  <tr>
    <td width="33%" valign="top">
      <h3>🌍 Multi-Translation</h3>
      <p>Seamlessly toggle between Bengali and English translations or view both simultaneously.</p>
    </td>
    <td width="33%" valign="top">
      <h3>⚙️ Dynamic Settings</h3>
      <p>Real-time control over Arabic fonts, text size, and translation visibility for a custom experience.</p>
    </td>
    <td width="33%" valign="top">
      <h3>🔍 Smart Search</h3>
      <p>Instant search by Ayah number or translation text to find specific guidance quickly.</p>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>📱 Mobile Optimized</h3>
      <p>Fully responsive UI with a floating settings drawer for smooth reading on small screens.</p>
    </td>
    <td width="33%" valign="top">
      <h3>⚡ High Performance</h3>
      <p>Server-side data fetching via Next.js 15 for lightning-fast page transitions.</p>
    </td>
    <td width="33%" valign="top">
      <h3>💾 Local Persistence</h3>
      <p>Automatically saves your font preferences and language choices in the browser.</p>
    </td>
  </tr>
</table>
</div>

---

## 🛠️ Tech Stack

### **Modern Core**

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **UI Engine**: [React 19](https://react.dev/) + [Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide Icons](https://lucide.dev/)

### **Infrastructure**

- **Deployment**: [Vercel](https://vercel.app)
- **Data Source**: [Al-Quran Cloud API](https://alquran.cloud/api)
- **Fonts**: [Next/Font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Amiri, Lateef, Scheherazade New)

---

## 🌍 Supported Ecosystem

### **Languages & Fonts**

| 🇧🇩 Bengali | 🇬🇧 English | 🕌 Arabic Fonts |
| :---: | :---: | :---: |
| ✅ | ✅ | Amiri, Lateef, Scheherazade |

### **Platform Status**

> `RESPONSIVE` • `DARK_MODE` • `SEO_OPTIMIZED` • `PERSISTENT_SETTINGS`

---

## 📂 Project Structure

```text
├── app/                  # Next.js 15 Routes & Layouts
│   ├── surah/[id]/       # Dynamic Surah Detail Page
│   ├── loading.tsx       # Smooth Transition Loader
│   └── error.tsx         # Global Error Boundary
├── components/           # Reusable Atomic Components
│   ├── quran/            # Surah Card, SettingsPanel, AyahList
│   └── ui/               # Custom Buttons & Icons
├── context/              # Global Quran Settings State
├── public/               # Static Assets & Icons
└── styles/               # Global Tailwind Config

<br/>
