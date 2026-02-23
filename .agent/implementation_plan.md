# ImanTrack — Production-Ready Refactoring Plan

## Audit Summary

### Architecture Issues Found:
1. **Sunnah Module**: SunnahGrid uses `daily_progress.sunnah_actions[]` (string array approach) instead of proper `sunnah_logs` table. Dual implementation exists but SunnahGrid ignores it.
2. **Quran Reader**: `upsertQuranLog` function exists but Mushaf CDN URL `https://cdn.islamic.network/quran/images/{page}.png` is likely broken. No error recovery.
3. **DhikrQuickWidget**: Counts are fully local (useState) — no Supabase persistence at all. `dhikr.service.ts` exists but is never called.
4. **Theme System**: ThemeToggle uses manual `classList.add('dark')` while `providers.tsx` uses `next-themes` with `data-theme` attribute. These conflict. CSS vars use both `[data-theme="dark"]` and `.dark`.
5. **Auth Flow**: LoginForm redirects to `/tracker` instead of `/dashboard`. AuthProvider exists but is never used in layout.
6. **Mobile UX**: `h-[75vh]` and `h-[85vh]` used in QuranReader and AssistantChat. Bottom nav is 16px (h-16) but pb-20 in protected layout may not be enough with iOS safe areas.
7. **Mushaf**: Using external CDN that may not exist. No fallback, no Supabase Storage integration.
8. **Types**: Lots of `as any` casts throughout the codebase.

## Execution Plan (in order):

### Phase 1: Fix Theme System
- Unify ThemeToggle to use next-themes hook
- Ensure CSS custom properties work with both `data-theme` and `.dark`
- Fix hardcoded colors in GlobalNavigation

### Phase 2: Fix Auth Flow  
- Add AuthProvider to root layout
- Fix LoginForm redirect to `/dashboard`
- Fix redirect for logged-in users on home page
- Fix double login scenario

### Phase 3: Fix Sunnah Module
- Rewrite SunnahGrid to use proper `sunnah_logs` table via `toggleSunnahAction()` + `getSunnahLogs()` 
- Optimistic UI with rollback
- Proper toggle (insert/delete) pattern

### Phase 4: Fix Dhikr Widget
- Connect DhikrQuickWidget to `dhikr.service.ts` `logDhikrSession()`
- Load existing counts from `dhikr_logs` on mount
- Save on each tap with debounce

### Phase 5: Fix Quran Reader & Mushaf
- Fix Mushaf URL to working CDN (quran.com or Al Quran Cloud API)
- Add proper error fallback with retry
- Ensure "Завершить" button properly saves and shows toast

### Phase 6: Fix Mobile UX
- Replace h-[75vh] / h-[85vh] with proper flex layouts
- Fix overflow for prayer buttons
- Fix padding under navbar
- Ensure Isha prayer is visible

### Phase 7: Fix Assistant  
- Already has graceful fallback for no API key
- Clean up types (remove `any`)

### Phase 8: Production Polish
- Remove all `as any` casts where possible
- Clean console.logs from LoginForm
- Ensure all error handling is consistent
