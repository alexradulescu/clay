# GitHub Pages Setup Guide

This guide will help you set up automatic deployment of the Clay documentation to GitHub Pages.

## Prerequisites

- A GitHub repository for your Clay project
- Admin access to the repository

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar under "Code and automation")
4. Under **Source**, select **GitHub Actions**

### 2. Push the Code

Make sure you've committed all the files, especially:
- `.github/workflows/deploy.yml` - The GitHub Actions workflow
- `docs/` folder - The documentation site
- All library source files

```bash
git add .
git commit -m "Add documentation site with GitHub Pages deployment"
git push origin main
```

### 3. Monitor the Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy Documentation to GitHub Pages"
3. Click on it to monitor the progress
4. Once complete (green checkmark), your site will be live!

### 4. Access Your Documentation

Your documentation will be available at:
```
https://yourusername.github.io/clay/
```

Replace `yourusername` with your GitHub username and `clay` with your repository name.

## Automatic Deployments

The documentation will automatically rebuild and deploy whenever you:
- Push changes to the `main` branch
- Manually trigger the workflow from the Actions tab

## Configuration

### Change the Base URL

If your repository name is different from "clay", update `docs/vite.config.ts`:

```ts
export default defineConfig({
  base: "/your-repo-name/",  // Change this
  plugins: [clayPlugin(), ecsstatic(), react()],
});
```

### Change the Branch

If you want to deploy from a different branch, edit `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - your-branch-name  # Change this
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `docs/public/`:
   ```
   your-domain.com
   ```

2. Configure your DNS provider to point to GitHub Pages:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub's IPs

3. In GitHub Settings > Pages, enter your custom domain

## Troubleshooting

### Site Not Loading

1. Check that GitHub Pages is enabled and set to "GitHub Actions"
2. Verify the workflow completed successfully in the Actions tab
3. Wait a few minutes after the first deployment

### 404 Errors

1. Ensure the `base` in `vite.config.ts` matches your repository name
2. Check that the `.nojekyll` file exists in `docs/public/`

### Build Failures

1. Check the Actions tab for error messages
2. Verify all dependencies are listed in `package.json` files
3. Ensure the library builds successfully locally with `bun run build`

## Local Development

To test the documentation site locally:

```bash
# Install dependencies
cd docs
bun install

# Run dev server
bun run dev

# Build for production
bun run build
bun run preview
```

## Updating the Documentation

Simply edit files in `docs/src/` and push to trigger a new deployment:

```bash
# Make changes to docs/src/App.tsx or other files
git add docs/
git commit -m "Update documentation"
git push origin main
```

The site will automatically rebuild and deploy within a few minutes!
