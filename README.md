# KaizenFinder — Discover Your Ikigai

A gamified React web app that guides you through discovering your **Ikigai** — the Japanese concept of your reason for being — at the intersection of:

- 💖 What you **LOVE**
- 🌟 What you're **GOOD AT**
- 🌍 What the **WORLD NEEDS**
- 💰 What you can be **PAID FOR**

## Live App

**https://oytuncak.github.io/Kaizenfinder/**

## Features

- 4-section guided Q&A (tags, sliders, free text)
- Animated SVG Ikigai Venn diagram that fills as you progress
- XP & levelling system: Explorer → Seeker → Discoverer → Enlightened → Ikigai Master
- Achievement badges
- Personalized results: Ikigai center card + Passion / Mission / Profession / Vocation intersection cards

## Tech Stack

- React 18 + Vite 5
- Dark glassmorphism UI (CSS custom properties)
- GitHub Actions → `gh-pages` branch → GitHub Pages

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

Pushing to `claude/kaizen-discovery-app-VdApj` triggers an automatic deployment to GitHub Pages.
