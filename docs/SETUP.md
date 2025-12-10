# Documentation Setup

## GitHub Pages Configuration

To enable GitHub Pages for this documentation:

1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy when you push to `main` branch

## Base Path

The documentation is configured to use `/yakt/` as the base path. If your repository has a different name:

1. Update `.vitepress/config.js`:
   ```js
   const base = '/your-repo-name/'
   ```

2. Update `.github/workflows/docs.yml`:
   ```yaml
   env:
     BASE_PATH: /your-repo-name/
   ```

## Local Development

```bash
cd docs
npm install
npm run dev
```

Visit the local development server (usually http://localhost:5173)

## Building

```bash
cd docs
npm run build
```

Output is in `docs/.vitepress/dist`

