# Deploying Documentation

The Yakt documentation is built with VitePress and can be deployed to various platforms.

## GitHub Pages

1. Update `.vitepress/config.js` with your repository name:
   ```js
   base: '/yakt/',  // Change 'yakt' to your repo name
   ```

2. Create a GitHub Actions workflow (`.github/workflows/docs.yml`):
   ```yaml
   name: Deploy Docs
   
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 18
         - run: cd docs && npm ci && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: docs/.vitepress/dist
   ```

3. Push to main branch - docs will auto-deploy

## Netlify

1. Connect your repository to Netlify
2. Set build settings:
   - Build command: `cd docs && npm install && npm run build`
   - Publish directory: `docs/.vitepress/dist`
3. Deploy!

## Vercel

1. Import your repository to Vercel
2. Set root directory to `docs`
3. Build command: `npm run build`
4. Output directory: `.vitepress/dist`

## Local Preview

```bash
cd docs
npm install
npm run dev
```

Visit the local development server (usually http://localhost:5173)

