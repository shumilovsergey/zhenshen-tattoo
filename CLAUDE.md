# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a tattoo artist portfolio website (zhenshen-tattoo) - a multi-page application serving as a business card in Russian ("сайт визитка"). The application features a hero image with booking CTA and navigation menu, deployed using Docker and Nginx.

## Architecture

### Current Structure
- **Multi-page architecture**: Main landing page (`index.html`) with separate section pages
- **Static assets**: Images stored in `assets/` directory and section-specific folders
- **No build system**: Pure HTML/CSS/JS without frameworks or build tools
- **Docker deployment**: Nginx-based containerized deployment with optimized caching

### Section Pages Structure
- **Main page**: `index.html` with hero section and navigation
- **About page**: `pages/about/` directory with own HTML/CSS/JS
- **Portfolio page**: `pages/portfolio/` directory with image gallery
- **FAQ page**: `pages/faq/` directory with Q&A content
- **Self-care page**: `pages/selfcare/` directory with aftercare instructions

### Key Features
- **Responsive design**: Mobile-first approach across all pages
- **Navigation**: Card-based menu items with icons linking to pages/ sections
- **High-performance static serving**: Optimized nginx with aggressive caching
- **Portfolio optimization**: Special caching and serving rules for gallery images
- **Memory efficiency**: Tmpfs caching and optimized worker processes

## Development Workflow

### Common Commands
- **Local development**: `docker-compose up` (serves on port 10001)
- **Stop container**: `docker-compose down`
- **View locally**: http://localhost:10001
- **Rebuild**: `docker-compose up --build` (after nginx.conf changes)

### File Structure
```
├── index.html                 # Main landing page with navigation
├── docker-compose.yml         # Optimized Docker deployment configuration
├── nginx.conf                 # High-performance nginx configuration
├── css/styles.css             # Main stylesheet for homepage
├── js/app.js                  # Main JavaScript functionality for homepage
├── assets/                    # Shared static assets (logo, banners, profile images)
├── README.md                  # Performance documentation
├── CNAME                      # Domain configuration for GitHub Pages
└── pages/                     # All section pages (self-contained)
    ├── about/                 # About section (index.html, styles.css, script.js)
    ├── portfolio/             # Portfolio with image galleries
    │   ├── index.html         # Portfolio page
    │   ├── styles.css         # Portfolio-specific styles
    │   ├── script.js          # Portfolio gallery functionality
    │   └── photo/             # Portfolio images (30+ high-res photos)
    ├── faq/                   # FAQ section (index.html, styles.css, script.js)
    └── selfcare/              # Aftercare instructions (index.html, styles.css, script.js)
```

## Docker Deployment

### High-Performance Configuration
- **Port**: Container serves on port 10001 (optimized for OS-level nginx proxy)
- **Memory**: 256MB limit with tmpfs caching for maximum speed
- **Workers**: Auto-scaling worker processes (up to 2048 connections each)
- **File cache**: 10,000 files cached in memory for 60s with 2-use threshold

### Static Asset Optimization
- **Portfolio images**: 30-day cache with range request support for fast gallery browsing
- **CSS/JS**: 1-year cache with immutable headers for versioned assets
- **HTML**: 1-hour cache for dynamic content updates
- **Fonts**: 1-year cache with CORS headers

### Performance Features
- **Tmpfs caching**: 100MB in-memory cache for nginx operations
- **Sendfile**: Direct kernel-to-socket file transfers (zero-copy)
- **TCP optimizations**: tcp_nopush, tcp_nodelay for minimal latency
- **Gzip level 6**: Balanced compression for text assets
- **Open file cache**: Aggressive file descriptor caching
- **Connection pooling**: Keep-alive with 100 requests per connection

## Development Notes

### Making Changes
- **Main page**: Edit `index.html` and `css/styles.css`
- **Section pages**: Located in `pages/` - each has own HTML/CSS/JS files
- **Docker changes**: Container restart required for `nginx.conf` or `docker-compose.yml` changes
- **Portfolio images**: Add to `pages/portfolio/photo/` for optimized delivery

### Navigation System
- **Main navigation**: Links from `index.html` to `pages/[section]/`
- **Section structure**: Self-contained pages in `pages/` directory
- **URL structure**: All content pages use `/pages/[section]/` format

### Performance Considerations
- **Portfolio images**: Automatically cached for 30 days with range request support
- **Asset versioning**: CSS/JS changes may require cache-busting via filename changes
- **Memory usage**: Container limited to 256MB - monitor for large image galleries
- **Cache warming**: First visitor to portfolio may experience slight delay as cache populates

## Important Development Notes

### Architecture Patterns
- **Self-contained pages**: Each section in `pages/` has its own HTML, CSS, and JS files
- **No build process**: Direct file editing - changes are immediately visible after container restart
- **Static site**: No server-side processing, database, or dynamic content generation
- **Russian language**: All content and UI text is in Russian for the target audience

### Page Development
- **Individual styling**: Each page has its own `styles.css` for section-specific styling
- **Modular JavaScript**: Each page has its own `script.js` for page-specific functionality
- **Consistent structure**: All pages follow the same directory pattern (index.html, styles.css, script.js)

### Deployment Process
- **GitHub Pages**: CNAME file configures custom domain (zhenshen-tattoo.ru)
- **Docker for development**: Local development uses Docker with nginx optimization
- **No CI/CD**: Direct deployment - changes pushed to main branch are live