# TaskNest — TypeTasks

A lightweight task tracker built with semantic HTML, responsive CSS, and strict TypeScript.

## Features
- Add tasks with a title
- Advance tasks from **todo** to **in-progress** to **done**
- Filter by all, todo, in-progress, and done
- Delete tasks
- Responsive layout for desktop and mobile

## Run locally
1. Install Node.js.
2. Run `npm ci`.
3. Run `npm run build` to compile TypeScript.
4. Serve the repository folder with any static HTTP server and open `index.html`.

The browser loads the compiled `app.js` and `model.js` modules.

## Deploy
The GitHub Actions workflow in `.github/workflows/pages.yml` compiles the project and deploys the site to GitHub Pages whenever changes are pushed to `main`. Enable GitHub Pages for the repository with **GitHub Actions** as the build and deployment source if it is not already enabled.

After the first successful deployment, the site URL is:
https://harshitavennam.github.io/project_typetasks/
