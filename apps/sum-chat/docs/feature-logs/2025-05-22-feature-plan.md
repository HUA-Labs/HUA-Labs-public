# 2025-05-22 Theme System & UI/UX Major Refactoring

## 1. Theme System Overhaul

- Added multi-theme support: Prism (Pink), Hyper Tomato (Red), Dark, Light, System
- Global theme state managed with zustand + localStorage persist
- ThemeProvider syncs CSS variables to body, Tailwind variable-based styling
- Removed next-themes, ThemeClientEffect, and all legacy/conflicting code

## 2. Color/Style Hierarchy by Theme

- theme.ts: sidebarBg, popoverBg, userBubbleBg, etc. clearly separated by layer
- Each layer (sidebar, popover, bubble, etc.) uses distinct brightness/tone for clarity

## 3. Popover/Dropdown/Menu Theming

- Popover background always solid (no transparency), border removed, shadow only
- Hover state uses more vivid color for clear feedback
- Text/icons use popoverFg for visibility

## 4. Chat Input Visibility Improvements

- Improved background, text, placeholder, focus, border for all states
- Removed outer background, only input area uses theme color

## 5. Consistent Theming Across All Components

- All major components use useTheme() and colors for style
- Sidebar/header/chatUI primary color fully unified
- Inactive/hover/timestamp colors also unified per theme

## 6. Message Bubble Style Improvements

- Assistant (GPT) responses have no bubble background, only text
- User bubbles are more distinct from background in all themes

## 7. Themed Scrollbars

- Chat session scrollbars themed per .chat-session class and current theme
- Thumb/track colors set for each theme

## 8. Settings Modal UX

- Theme selector only visible in "Theme Select" mode
- Label changed to "Theme Select" for clarity

## 9. All Popover/Sidebar Menus Fully Themed

- No border, only shadow and background
- Hover/active states themed per layer

---

## TODO & Next Feature Plan (2025-05-22)

- [ ] **Server-side guest session/chat limit**
- Guest users are currently limited only via localStorage (client-side)
- Plan: Enforce guest session/message limits on the server (Next.js API + MongoDB)
- Identify guests via cookie/UUID, store and check counts in MongoDB
- On limit exceeded, API returns 403, client shows login modal
- Prevents bypass by clearing localStorage

- [ ] **Login button behavior for guests**
- Currently, clicking the login button in guest mode shows '로그아웃하시겠습니까?'
- Should show the login modal directly if not authenticated
- Fix: Only show logout modal for authenticated users, otherwise show login modal

> All features above were designed, implemented, and tested on 2025-05-22. See commit log for details.
