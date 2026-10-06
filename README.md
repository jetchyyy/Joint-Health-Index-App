# Joint Health Index — Progressive Web App (PWA)

A mobile-first, offline-first clinical scoring and assessment tool developed for **The Knee Arthritis and Orthopedic Institute** in partnership with **ArthroLogic Inc.**

## Features

- **Exact Physical Form Fidelity**: Fully matches the Joint Health Index assessment sheet with bilingual English and Filipino (Tagalog) labels.
  - **Part A: Frequency of Pain** (4 questions, scale 0–4)
  - **Part B: Severity of Pain** (4 questions, scale 0–4)
  - **Part C: Duration of Stiffness** (1 question, scale 0–4)
- **Real-Time Live Scoring**: Computes section subtotals and total score (0–36) with real-time level classification.
- **Level 2 & Level 3 Clinical Redirection**:
  - Automatically identifies patients with score levels 2 (21–8) and 3 (7–0) requiring urgent or clinical orthopedic attention.
  - Displays high-priority clinical advisory with countdown redirect to [https://arthrologicph.com/](https://arthrologicph.com/) and direct contact actions.
- **100% Offline-First PWA**:
  - Service worker caching (`sw.js`) enabling full functionality with or without an active internet connection.
  - Local record storage (`localStorage`) so assessments are never lost.
  - Assessment History drawer with CSV export and records viewer.
- **Clean & Premium Design**:
  - Solid color palette (deep medical navy, pristine white, crisp clinical borders).
  - No gradients and no emojis — uses clean SVG vector icons and medical typography.
- **Printable Medical Report**: Includes print view formatted for official patient records.

## Project Location

```
/Users/jetchmerald/Documents/jetch/joint-health-index
```

## How to Run Locally

1. Open your terminal and navigate to the project folder:
   ```bash
   cd /Users/jetchmerald/Documents/jetch/joint-health-index
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your mobile browser or desktop.
4. To install as a mobile app, tap "Add to Home Screen" or the "Install" button.
