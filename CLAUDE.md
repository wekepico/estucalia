# Estucalia - Next.js Codebase Architecture

## Quick Overview
- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI (shadcn/ui)
- **i18n**: Spanish (default), English, French via Context API
- **UI Components**: 30+ Radix UI components

---

## 1. Router Architecture - App Router Only

Uses /app directory (NOT Pages Router):
- Dynamic routes: [id]/page.tsx
- Nested layouts via layout.tsx
- Server Components by default
- 'use client' for interactive/hook-based components

Key routes:
- / - Home with section components
- /aplicaciones/[id] - Application details
- /blog/[id] - Blog post details
- /producto/[id] - Product details
- /espacios/[id] - Space details
- /profesionales/aplicadores - Applicators
- /profesionales/certificaciones - Certifications

---

## 2. Folder Structure

app/
├── layout.tsx          # Root: LanguageProvider, navigation, footer
├── page.tsx            # Home: composes HeroSection, CompanyInfo, etc.
├── globals.css         # Tailwind directives, fonts, CSS variables
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── api/                # API routes (empty)
├── components/         # Feature-based components
│   ├── ui/             # Radix UI wrapped components (30+)
│   ├── ClientNavigation.tsx
│   ├── Footer.tsx
│   ├── home/
│   ├── aplicaciones/
│   ├── blog/
│   ├── contacto/
│   └── ... (other features)
├── context/
│   └── LanguageContext.tsx  # i18n state & hooks
├── data/
│   ├── aplicaciones.ts
│   └── espacios.ts
├── types/              # TypeScript definitions
├── hooks/              # React hooks
└── [routes]/          # Dynamic pages

components/
└── ui/                # Shadcn UI components

lib/
└── utils.ts           # cn() Tailwind merge utility

hooks/
└── use-toast.ts       # Toast hook

services/
└── bolgsServices.ts   # Blog API

messages/
├── en.json
├── es.json
└── fr.json

---

## 3. Component Organization

Feature-based organization (not type-based).

Each feature folder has:
- Main component (HeroSection.tsx)
- components/ subfolder for nested/reusable parts

Example:
app/components/home/
├── HeroSection.tsx
├── CompanyInfo.tsx
├── components/
│   ├── ProductGrid.tsx
│   └── Card.tsx

---

## 4. Styling - Tailwind CSS

Primary framework with:
- CSS variables for theming
- Dark mode (class-based)
- tailwindcss-animate plugin
- Global styles in app/globals.css

Utility function cn() in lib/utils.ts:
Usage: cn('px-4', condition && 'bg-blue-500')

---

## 5. UI Components - Radix UI (shadcn/ui)

Located in components/ui/ - 30+ components:
- button, card, form, input, dialog
- dropdown-menu, navigation-menu, accordion
- carousel (Embla), toast, chart (Recharts)

Usage:
import { Button } from '@/components/ui/button';
<Button variant="outline">Click</Button>

---

## 6. State Management

Context API for i18n:
const { t, language, setLanguage } = useLanguage();

Features:
- Spanish (default), English, French
- localStorage persistence
- Nested translation keys (dot notation)

---

## 7. Data Patterns

Static data in app/data/:
- aplicaciones.ts - Applications with types
- espacios.ts - Spaces data

TypeScript interfaces for type safety.

Dynamic routes with [id]/page.tsx

External API in services/bolgsServices.ts

---

## 8. Forms & Validation

React Hook Form + Zod:
- Form state management
- Schema validation
- UI components in components/ui/form.tsx

---

## 9. Key Dependencies

Core:
- next 13.5.1, react 18.2.0, typescript 5.2.2

UI:
- @radix-ui/* - Accessible primitives
- lucide-react, react-icons - Icons
- embla-carousel-react - Carousel

Styling:
- tailwindcss 3.3.3
- class-variance-authority - Variants
- clsx + tailwind-merge - Utilities
- tailwindcss-animate

Forms:
- react-hook-form 7.53.0
- @hookform/resolvers - Resolvers
- zod 3.23.8 - Validation

Data:
- recharts - Charts
- date-fns - Dates
- react-hot-toast - Notifications

---

## 10. Important Conventions

Import Aliases:
@/*         → Root
@/components → /components
@/lib       → /lib
@/hooks     → /hooks
@/app       → /app

File Naming:
- page.tsx - Routes
- layout.tsx - Layouts
- PascalCase - Components
- camelCase - Utils/services

---

## 11. Config Files

next.config.js:
- trailingSlash: false
- images.unoptimized: true

tsconfig.json:
- Strict mode, path aliases

tailwind.config.ts:
- Dark mode, CSS variables, animations

components.json (shadcn/ui):
- Path aliases, CSS variables

---

## 12. Multi-Language (i18n)

Translation files: messages/{en,es,fr}.json

Nested structure: home.hero.title

Usage:
const { t } = useLanguage();
<h1>{t('home.hero.title')}</h1>

---

## 13. Quick Patterns

Add a New Page:
1. Create /app/route-name/page.tsx
2. Create component in /app/components/route-name/
3. Add translations to messages/
4. Link in ClientNavigation.tsx

Add a Component:
'use client';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/context/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  return <Button>{t('key')}</Button>;
}

---

## 14. Key Files

app/layout.tsx - Root layout
app/page.tsx - Home
app/globals.css - Global styles
tailwind.config.ts - Theme
app/context/LanguageContext.tsx - i18n
app/data/* - Static data
messages/* - Translations
services/* - APIs
components/ui/* - UI components
lib/utils.ts - cn() utility

---

## 15. Development

npm run dev    # Start dev
npm run build  # Build
npm run start  # Production
npm run lint   # Lint

---

## Summary

Modern Next.js 13 with:
- App Router only (no Pages Router)
- Radix UI + Tailwind CSS
- Context API for i18n
- TypeScript for type safety
- Feature-based folder organization
- Best practices: Server Components default, Client Components where needed
