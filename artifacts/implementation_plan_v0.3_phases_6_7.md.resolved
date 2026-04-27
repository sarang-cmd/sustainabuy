# Implementation Plan: Phases 6 & 7 👤📄

This plan covers the enhancement of the user account system and the implementation of essential static content and feedback loops.

## User Review Required

> [!IMPORTANT]
> Some features like "Image Upload" for avatars might require a cloud storage setup (Firebase Storage). I will implement local-first solutions (Base64 or preset gallery) as a fallback if storage is not yet configured.

---

## Proposed Changes

### [Component] Account & Auth (Phase 6) 👤

#### [MODIFY] [AuthContext.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/contexts/AuthContext.tsx)
- Update `user` object to include extended profile fields (bio, birthday).
- Add methods for updating profile and managing email/password.

#### [NEW] [AccountPage.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/app/account/AccountPageContent.tsx)
- Build a comprehensive settings UI for name, bio, and birthday.
- Implement avatar selection gallery.

#### [NEW] [HistoryPage.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/app/account/history/page.tsx)
- Display a list of recently viewed products (linked to local storage/db).

---

### [Component] Static Pages & Content (Phase 7) 📄

#### [NEW] [About.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/app/about/page.tsx)
- Dynamic "About Us" page with mission and values.

#### [NEW] [Privacy.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/app/privacy/page.tsx)
- Standard Privacy Policy template.

#### [MODIFY] [Footer.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/components/layout/Footer.tsx)
- Link the new static pages.

#### [MODIFY] [DataBank.tsx](file:///C:/Users/sarbr/Desktop/Antigravity/Projects/SustainaBuy_v0.2/components/ui/DataBank.tsx)
- Fix the bottom buttons and add success/failure feedback components.

---

## Verification Plan

### Automated Tests
- Test auth state persistence in `AuthContext`.
- Verify avatar selection updates across the app.

### Manual Verification
- Test profile update flow in the new Account page.
- Check footer links for all new static pages.
- Verify "Recently Viewed" history in the history page.
