# cdn-fundamentals
This helps understanding how assets are stored and retrieved in prod

## Basic React App with Image Asset

This is a basic React application that demonstrates rendering an image asset on screen.

### Features
- React 19 with Vite as build tool
- Custom SVG image asset representing a CDN network
- Styled UI with gradient background
- Image loaded from local assets folder

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Project Structure
- `src/App.jsx` - Main React component
- `src/main.jsx` - Application entry point
- `src/App.css` - Styles
- `src/assets/sample-image.svg` - Image asset
- `index.html` - HTML template
- `vite.config.js` - Vite configuration
