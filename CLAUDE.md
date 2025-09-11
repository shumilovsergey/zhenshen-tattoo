# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a tattoo artist portfolio website (zhenshen-tattoo) - a single-page application serving as a business card in Russian ("сайт визитка"). The application features a hero image with booking CTA and navigation menu in a modern mobile-first design.

## Architecture

### Core Structure
- **Single-file architecture**: All HTML, CSS, and JavaScript contained in `index.html` (~277 lines)
- **Static assets**: Images stored in `assets/` directory
- **No build system**: Pure HTML/CSS/JS without frameworks or build tools
- **Self-contained**: Inline styles and scripts with no external dependencies

### Current Implementation (index.html)
- **Modern CSS**: CSS custom properties with dark theme variables
- **Hero section**: Full-screen background image with overlay and centered CTA button
- **Navigation**: Clean card-based menu items with icons and ripple effects
- **Responsive design**: Mobile-first with `aspect-ratio` and viewport units
- **Interactive elements**: Touch-friendly with ripple animations and hover states

### Key Features
- **CSS Variables**: Consistent theming with `--bg`, `--card`, `--text`, etc.
- **Aspect ratio**: Hero image uses `9/12` aspect ratio for mobile optimization
- **Ripple effects**: Touch interaction feedback with CSS animations
- **Accessibility**: Proper ARIA labels, focus states, and semantic HTML
- **Safe areas**: iPhone safe area support with `env(safe-area-inset-bottom)`

### Legacy Files (Not Currently Used)
- `main.js`: Previous SPA routing logic (277 lines)
- `styles.css`: Separate stylesheet (389 lines) 
- `pages/*.html`: Individual content pages (about, portfolio, care, faq, contacts)

## Development Workflow

### Common Commands
- **View locally**: Open `index.html` in browser or use local server
- **Deploy**: Commit and push to main branch (no build step required)
- **Development**: Direct editing of `index.html`, no compilation needed

### File Structure
```
├── index.html           # Main application (all-in-one)
├── assets/
│   └── profile.jpg      # Hero background image
├── main.js              # Legacy SPA logic (unused)
├── styles.css           # Legacy styles (unused)
├── pages/               # Legacy content pages (unused)
└── template.png         # Design reference
```

### Current JavaScript Functionality
- **Ripple effects**: Touch/click visual feedback animation
- **Demo navigation**: Placeholder toast notifications for menu items
- **Booking CTA**: Scroll-to-contacts placeholder (ready for Telegram integration)
- **Accessibility**: Reduced motion preference detection

## Development Notes

### Making Changes
- **All changes**: Edit `index.html` directly - it contains everything
- **Styling**: Modify CSS within `<style>` tags around lines 8-167
- **Functionality**: Edit JavaScript within `<script>` tags around lines 212-275
- **Images**: Replace `assets/profile.jpg` or update background-image URL

### Design System
- **Color scheme**: Dark theme with subtle cards and white accents
- **Typography**: System font stack with consistent sizing
- **Spacing**: 18px base padding with 16px border radius
- **Shadows**: Consistent `0 8px 28px rgba(0,0,0,.45)` shadow

### Integration Points
- **Telegram booking**: Replace line 241-243 with actual Telegram link
- **Real navigation**: Replace toast demo (lines 249-253) with routing
- **Content pages**: Current navigation shows placeholder toasts

### Mobile Optimization
- **Viewport**: Configured for mobile with `viewport-fit=cover`
- **Touch targets**: 38px minimum touch targets with proper spacing
- **Performance**: CSS animations use `will-change` and efficient transforms