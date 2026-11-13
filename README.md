# BloodLink – Every Drop Connects a Life

[![Deploy Status](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge&logo=cloudflare&logoColor=white&color=10B981)](https://bloodlink.afrith15.workers.dev/)
[![Live Website](https://img.shields.io/badge/Website-bloodlink.afrith15.workers.dev-C8102E?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bloodlink.afrith15.workers.dev/)
[![Framework](https://img.shields.io/badge/TanStack%20Start-Full%20Stack-2563EB?style=for-the-badge)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A healthcare technology platform connecting voluntary blood donors, hospitals and people in need of blood.

🌐 **Live Website**: [https://bloodlink.afrith15.workers.dev/](https://bloodlink.afrith15.workers.dev/)  
🔗 **GitHub Repository**: [https://github.com/dev-afrith/bloodlink](https://github.com/dev-afrith/bloodlink)

---

## 🌐 Live Demo

Experience the full interactive BloodLink platform deployed globally on Cloudflare Workers:

👉 **[Launch BloodLink Live Platform](https://bloodlink.afrith15.workers.dev/)**

- **Live URL**: `https://bloodlink.afrith15.workers.dev/`
- **Deployment Platform**: Cloudflare Workers (SSR & Global Edge Network)
- **Status**: Operational & Accessible 24/7

> [!NOTE]
> BloodLink is an interactive healthcare technology prototype built for demonstration and review. Authentication sessions, donor profiles, and submitted blood requirements operate via in-memory frontend demo state with persistent session sharing, without connecting to a live medical production database.

---

## 📖 Project Overview

BloodLink is a healthcare technology platform designed to bridge the critical gap between voluntary blood donors, healthcare institutions, and families facing medical emergencies. Built with clinical precision, compassionate community design, and modern web architecture, BloodLink offers intuitive discovery, real-time tracking, and clinical utility tools to streamline blood donation workflows.

### Core Objectives
- **Accelerate Critical Access**: Enable patients and hospital staff to request compatible blood components with precise clinical urgency tiers.
- **Transparent Tracking**: Provide instant reference-based tracking of submitted blood requests across the entire application lifecycle.
- **Empower Voluntary Donors**: Foster an active community of donors categorized by blood group, geography, and verified availability.
- **Clinical Awareness & Education**: Deliver evidence-based educational guides and real-time clinical calculators adhering to WHO medical guidelines.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Voluntary Donor Discovery** | Filter donors by ABO/Rh blood groups, location hierarchy (State, City, Area), and live readiness status. |
| **Request Blood Intake** | Comprehensive medical intake form capturing patient details, hospital requirements, blood components, units, and urgency levels. |
| **Track Request Status** | Centralized in-memory tracking system allowing users to search and review blood requests by Reference ID with clean single-page medical printouts. |
| **Urgent Hospital Requests** | Public board monitoring hospital requirements categorized by urgency tier (*Urgent*, *Priority*, *Planned*). |
| **Interactive Clinical Tools** | Light-blue healthcare themed suite including Blood Compatibility Matrices, Donation Eligibility Checkers, and Interval Estimators. |
| **Authorized Blood Banks** | Directory of verified blood donation centers, component laboratories (Whole Blood, Platelets, Plasma), and mobile drive schedules. |
| **Responsive Clinical UI** | Fluid layouts optimized for mobile drawers, tablets, and desktop workstations with high contrast and accessibility compliance. |

---

## 👥 User Roles

BloodLink simplifies user authentication into two dedicated personas designed for healthcare workflows:

### 1. Voluntary Donor (`Donor`)
- Dedicated registration and first-time **Complete Your Profile** workflow.
- Manage personal health readiness, blood group, last donation date, and emergency contact preferences.
- Access the Donor Dashboard to review upcoming donation drives, personal eligibility status, and community impact.

### 2. Hospital Representative (`Hospital Staff`)
- Streamlined clinical staff sign-in requiring verified hospital credentials, department, and medical registration ID.
- Hospital Dashboard with overview of institutional blood requirements, active component requisitions, and priority blood requests.
- Direct intake shortcuts to post emergency component requests.

> [!TIP]
> **Frontend Demo Authentication**: Both roles support instant demo sign-in. First-time sign-in presents a mandatory profile completion step, storing genuine session state in centralized React Context without generating synthetic random profiles.

---

## 🩸 Blood Request and Tracking

BloodLink features an end-to-end blood requirement submission and tracking pipeline:

1. **Intake (`/request-blood`)**:
   - Captures patient identification, attending physician/hospital details, blood component (`Whole Blood`, `Packed Red Cells`, `Platelets`, `Fresh Frozen Plasma`, `Cryoprecipitate`), units needed, and urgency level (`Emergency Immediate`, `Urgent (Within 6h)`, `Priority (Within 24h)`, `Planned`).
   - Generates an instant, unique Reference ID (e.g., `REQ-202611-XXXX`).
   - Clean printable **Blood Request Confirmation Report** formatted specifically for single-page A4 medical documentation.

2. **Tracking (`/request-blood#track` or via Navigation)**:
   - Real-time search across the shared application state using the generated Reference ID.
   - Displays real-time request status, hospital intake details, assigned units, and contact information.
   - Includes dedicated **Print Tracking Report** functionality that isolates only the request document, suppressing navigation and web chrome.

---

## 🧮 Interactive Clinical Tools

Designed with a modern, high-contrast light blue healthcare aesthetic (`#EFF6FF` background, `#2563EB` primary accents, `#FFFFFF` clinical cards):

- **Blood Group Compatibility Matrix**: Instant lookup of red cell and plasma donor-recipient compatibility rules.
- **Donation Eligibility Screener**: Interactive checklist verifying age, weight, hemoglobin levels, travel history, and medical intervals.
- **Donation Interval Calculator**: Helps whole-blood and platelet donors safely plan their next voluntary donation.
- **Illustrative Clinical Metrics**: Clean visual indicators showcasing regional blood availability trends and component distribution.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router) | Full-stack SSR framework with strictly typed file-based routing |
| **Language** | [TypeScript 5.x](https://www.typescriptlang.org/) | End-to-end type safety for clinical schemas and application logic |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS architecture with CSS variables |
| **Icons & UI** | [Lucide React](https://lucide.dev/) & [Radix UI](https://www.radix-ui.com/) | Accessible primitives and clinical icon set |
| **Typography** | Fontsource (`Plus Jakarta Sans` & `Inter`) | Self-hosted web fonts ensuring zero layout shifts |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) | Smooth page transitions with reduced-motion accessibility |
| **Forms & Validation** | React Hook Form & [Zod](https://zod.dev/) | Strict client-side validation for medical and contact schemas |
| **Deployment & Server** | [Nitro](https://nitro.unjs.io/) & [Cloudflare Workers](https://workers.cloudflare.com/) | Global edge server-side rendering and asset hosting |
| **Testing** | [Vitest](https://vitest.dev/) & React Testing Library | Unit and component integration testing suites |

---

## 📁 Project Structure

```text
bloodlink/
├── public/                 # Static assets, SVG icons, and OG images
├── src/
│   ├── components/         # Reusable UI & clinical components
│   │   ├── bloodlink/      # Domain components (Discovery, Request, Tracking, Auth)
│   │   └── ui/             # Radix primitives (Dialog, Tabs, Accordion, Tooltips)
│   ├── context/            # React Context providers (Auth state, Blood Request store)
│   ├── data/               # Browser-safe clinical and directory data modules
│   ├── routes/             # TanStack file-based application routes
│   │   ├── __root.tsx      # Root application shell with Navbar and Footer
│   │   ├── index.tsx       # Homepage with discovery, metrics, and clinical tools
│   │   ├── auth.tsx        # Demo Sign-In and profile creation flow
│   │   ├── dashboard.tsx   # Role-based dashboard (Donor & Hospital Staff)
│   │   ├── request-blood.tsx # Request Blood form & Tracking interface
│   │   └── find-donors.tsx # Voluntary donor search and filtering
│   ├── styles.css          # Design system variables, color tokens, and print media rules
│   └── entry-client.tsx    # Client hydration entrypoint
├── wrangler.json           # Cloudflare Workers deployment configuration
├── vite.config.ts          # Vite build and dependency pre-bundling configuration
└── package.json            # Project dependencies and script declarations
```

---

## 🚀 Installation and Setup

### Prerequisites
- **Node.js**: v20.0.0 or higher
- **Package Manager**: `npm` (v10+) or `bun`

### 1. Clone the Repository
```sh
git clone https://github.com/dev-afrith/bloodlink.git
cd bloodlink
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Development Server
```sh
npm run dev
```
The application will be accessible locally at `http://localhost:3000`.

### 4. Run Tests & Validation
```sh
# Run unit and integration tests
npm run test

# Run TypeScript type-checking
npx tsc --noEmit
```

---

## ☁️ Deployment

BloodLink is pre-configured for instant zero-configuration deployment to **Cloudflare Workers** using Nitro's `cloudflare-module` preset.

### 1. Production Build
```sh
npm run build
```
This builds both the client assets (`.output/public`) and the SSR worker bundle (`.output/server`).

### 2. Deploy to Cloudflare Workers
```sh
npx wrangler deploy --config .output/server/wrangler.json
```
The deployment will publish the worker to your configured Cloudflare subdomain (e.g., `https://bloodlink.afrith15.workers.dev`).

---

## 🔮 Future Enhancements

- **Real-Time Push Notifications**: Web Push & SMS integration for high-urgency blood appeals within a 15km donor radius.
- **Verified EHR / HL7 FHIR Integration**: Secure connectors for hospital blood bank inventory management systems.
- **Geographic Proximity Routing**: Interactive GIS mapping with live drive-time estimation to nearest active blood banks.
- **Donor Badge & Milestone Gamification**: Recognition tiers celebrating regular voluntary contributions to inspire retention.

---

## 🎨 Brand Guidelines

- **Primary Deep Crimson**: `#C8102E`
- **Secondary Dark Crimson**: `#8F1027`
- **Clinical Light Blue**: `#EFF6FF` / `#2563EB`
- **Surface Crisp White**: `#FFFFFF`
- **Neutral Canvas**: `#F8FAFC` / `#0F172A`

---

© 2026 **BloodLink**. Every Drop Connects a Life. Designed for AI Prompt Battle 2.0.
