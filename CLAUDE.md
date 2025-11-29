# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Alphanon is an interactive 3D visualization project exploring Walter Russell's alternative periodic table, which includes hypothetical elements prior to hydrogen. The first element in Russell's system is called "Alphanon."

## Development

This is a static HTML/JavaScript project using Three.js for 3D graphics. No build step is required.

**Dependencies:**
```bash
npm install
```

**Running locally:** Open any HTML file directly in a browser, or use a local server:
```bash
npx serve .
```

## Architecture

### HTML Entry Points
- `wave.html` - Main visualization with labeled elements along a 3D sine wave
- `index.html` - Landing page with links to visualizations
- `three.html`, `sine*.html`, `wave2.html` - Experimental wave visualizations

### Core JavaScript (`assets/js/`)
- `alphanon.js` - Main application object with Three.js scene setup, animation loop, and drawing functions for octave waves and element spheres
- `alphanon/canvas.js` - Canvas/renderer setup and the `periodicTableElements` data array containing Russell's extended periodic table (standard elements plus hypothetical pre-hydrogen elements)

### Key Concepts
- Elements are positioned along an expanding sine wave in 3D space
- The wave is divided into "octaves" (10 total) representing groups of elements
- Uses CSS2DRenderer for element labels overlaid on the 3D scene
- OrbitControls for camera interaction

### Dependencies
- Three.js (v0.176.0) - 3D rendering, loaded via ESM from esm.sh CDN
- dat.gui - GUI controls (currently commented out)

## Standard 3D Layout

All 3D visualizations use this coordinate system:
- **X** = horizontal (left/right) - red axis
- **Y** = vertical (up/down) - green axis
- **Z** = depth (front/back) - blue axis

Use `default_3d.html` as a template for new 3D pages.

## Code Style

- Render HTML with one attribute per line
