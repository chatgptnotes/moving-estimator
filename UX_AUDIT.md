# UX Audit Report — Moving Estimator

**Date:** 2026-02-21  
**Auditor:** AI UX Auditor  
**App Type:** Mobile-first React SPA (Vite + Tailwind + Framer Motion)

---

## Executive Summary

The app has a solid foundation with good visual design (blue+orange theme), smooth animations via Framer Motion, and a clear 3-step flow. The main issues were **small touch targets**, **missing visual feedback**, **no progress indicators**, and **missing empty/error states**. All critical issues have been fixed.

---

## Issues Found & Fixed

### 🔴 Critical (Fixed)

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | **Touch targets too small** — Bottom nav buttons, delete icons, back buttons all < 44px | BottomNav, History, Estimate, Scanner | All touch targets now ≥ 48px with `min-h-[48px]` / `min-w-[48px]` |
| 2 | **No active tab indicator** on bottom nav — only color change, easy to miss | BottomNav | Added animated orange bar above active tab using `layoutId` |
| 3 | **No back button on NewMove** — user trapped on form page | NewMove | Added back button in header |
| 4 | **No progress indicator** for multi-step flow | NewMove | Added 3-step progress bar (Details → Scan → Results) |
| 5 | **Delete without confirmation** — one tap deletes estimate permanently | History | Added `confirm()` dialog before delete |
| 6 | **Input zoom on iOS** — inputs with font-size < 16px cause Safari to zoom | index.css | Added `font-size: 16px !important` on inputs |
| 7 | **No recording state indicator** — hard to tell if recording is active | Scanner | Added red pulsing dot + "Recording" label + timer minimum indicator |

### 🟡 Important (Fixed)

| # | Issue | Fix |
|---|-------|-----|
| 8 | No idle guide in scanner — user sees blank camera with no instruction | Added "Tap the red button" guide overlay |
| 9 | AI analysis has no progress bar or time estimate | Added animated progress bar + "5-15 seconds" estimate |
| 10 | Empty history state is plain and uninviting | Redesigned with illustration circle, descriptive text, prominent CTA |
| 11 | Bottom nav has no backdrop blur — content shows through awkwardly | Added `backdrop-blur-lg` and `bg-white/95` |
| 12 | No tap feedback on buttons | Added `active:scale-95` transitions throughout |
| 13 | Share buttons section has no heading | Added "Share Estimate" section header |
| 14 | Scanner room pills too small to tap | Increased to `min-h-[48px]` with padding |
| 15 | Move type selector buttons too small | Increased to `min-h-[48px]` |
| 16 | Settings dropdowns too small | Increased to `min-h-[44px]` with more padding |
| 17 | No `-webkit-tap-highlight-color: transparent` | Added globally |
| 18 | No `overscroll-behavior-y: contain` — pull-down triggers browser refresh | Added to body |
| 19 | Safe area CSS variable wasn't robust | Improved with CSS custom property fallback |
| 20 | Skeleton loader CSS class missing | Added `.skeleton` with shimmer animation |

### 🟢 Already Good (No Changes Needed)

- **Theme consistency:** Blue (#1E3A5F) + Orange (#FF6B35) used consistently throughout
- **Card design:** Proper shadows, rounded corners, border colors
- **Hero section:** Compelling, great visual hierarchy
- **Scanner bottom nav hidden:** Correctly hidden during scanning for full-screen experience
- **Room selection grid:** Intuitive emoji + label design, 3-column grid works well on mobile
- **Estimate page layout:** Clear volume summary, expandable room breakdown, visual truck fill bars
- **Cost range display:** Low/mid/high clearly presented with mid highlighted
- **WhatsApp sharing:** One-tap share with pre-formatted message
- **Framer Motion animations:** Smooth, performant, not janky
- **Safe area bottom padding:** Already handled via `pb-safe` class
- **Recording button:** Already 80×80px (well above 48px minimum)
- **LocalStorage persistence:** Works offline, data preserved between sessions

---

## Flow Analysis

### Current Flow: Start → Estimate
1. Home → Tap "Start Scanning" → **NewMove page**
2. Fill from/to details → Select rooms → Tap "Start Scanning" → **Scanner**
3. Record each room → Tap "Analyze" → **AI Processing** → **Estimate page**

**Total: 3 screens, ~8-12 taps** (reasonable for the data collected)

**Possible optimization:** Pre-select common room presets (Studio, 1BHK, 2BHK, 3BHK) to skip individual room selection. Not implemented to avoid scope creep.

---

## Remaining Recommendations (Future Work)

1. **Code splitting** — Bundle is 657KB, should split per-route with `React.lazy()`
2. **Pull-to-refresh** on History page
3. **Swipe-to-delete** on history items (instead of trash icon)
4. **Undo toast** after delete (instead of confirm dialog)
5. **Camera permission flow** — Show friendly explanation before requesting camera access
6. **Camera denied fallback** — Manual item entry mode
7. **Offline indicator** — Show banner when offline
8. **Haptic feedback** — Use `navigator.vibrate()` on key actions (requires Capacitor plugin for iOS)
9. **Page transitions** — AnimatePresence on route changes
10. **PWA manifest** — For "Add to Home Screen" experience

---

## Build Status
✅ `npm run build` passes (warning about chunk size > 500KB — code splitting recommended)
