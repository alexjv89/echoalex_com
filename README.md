this is deployed on http://echoalex.com

Built with Next.js (static export) and deployed to GitHub Pages.

### How to write a blog
- in `blog` -> `2024` -> create a markdown file and write the blog
- in `blog.md` -> add the file to the index so that it is findable
- commit the code
- github will auto deploy the blog
- if the post is about a side project, add `projects: [project-file-name]` to its frontmatter; it then shows up on that project's page

### How to add a side project
- copy `templates/project.md` to `projects/<name>.md` (the file name becomes the URL: `/projects/<name>/`)
- fill in the frontmatter: `title`, `tagline`, `kind`, `started` and `status` are required; `ended`, `videos` (YouTube ids) and `links` are optional
- write the story below the frontmatter, or leave it empty for now
- it appears on `/projects/` automatically, grouped by `kind`
- `npm test` catches a missing field, an unknown kind or status, and posts pointing at a project that doesn't exist
- if a project and a post share a file name, link them in Obsidian as `[[projects/name]]` or `[[blog/name]]`

### Local development
- `npm install`
- `npm run dev` -> serves the site at http://localhost:3000
- `npm run build` -> produces the static site in `out/`
- `npm test` -> runs content discovery and Obsidian-link checks

### Deployment
- GitHub Actions builds with `next build` and publishes `out/` to GitHub Pages on every push to `master`
- `CNAME` (`www.echoalex.com`) is included in the export
