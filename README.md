# cdn-fundamentals
This helps understanding how assets are stored and retrieved in prod

## Basic React App with Azure CDN Integration

This project demonstrates how to use Azure CDN for delivering static assets in production. The React application serves as a demo environment, while a GitHub Action automatically uploads assets to Azure CDN.

### Features
- React 19 with Vite as build tool
- Automated asset upload to Azure CDN via GitHub Actions
- Azure Storage as CDN origin
- Optional CDN cache purging

### Project Structure
- `src/` - React application source code
- `assets/` - Static assets uploaded to Azure CDN
- `.github/workflows/upload-to-azure-cdn.yml` - GitHub Action for CDN upload

### Getting Started

#### Run the React App Locally

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

#### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Azure CDN Setup

To enable automatic asset upload to Azure CDN, see [AZURE_CDN_SETUP.md](./AZURE_CDN_SETUP.md) for detailed instructions on:

- Creating Azure Storage Account
- Configuring Azure CDN (optional)
- Setting up GitHub Secrets
- Running the deployment workflow

### How CDN Integration Works

1. Add or modify files in the `assets/` directory
2. Push changes to the repository
3. GitHub Action automatically uploads assets to Azure Storage (CDN origin)
4. Assets become available via Azure CDN endpoints
5. CDN cache is purged to ensure fresh content delivery
