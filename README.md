this is deployed on http://echoalex.com

Built with Next.js (static export) and deployed to GitHub Pages.

### How to write a blog
- in `blog` -> `2024` -> create a markdown file and write the blog
- in `blog.md` -> add the file to the index so that it is findable
- commit the code
- github will auto deploy the blog

### Local development
- `npm install`
- `npm run dev` -> serves the site at http://localhost:3000
- `npm run build` -> produces the static site in `out/`
- `npm test` -> runs content discovery and Obsidian-link checks

### Deployment
- GitHub Actions builds with `next build` and publishes `out/` to GitHub Pages on every push to `master`
- `CNAME` (`www.echoalex.com`) is included in the export
