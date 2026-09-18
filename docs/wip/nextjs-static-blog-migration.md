# Replace Eleventy with a Next.js Static Blog

## Status: EVALUATION

Replace Eleventy with Next.js while preserving the published content, URLs, appearance, custom
domain, and GitHub Pages deployment. Reuse the shape of the FinOpsBricks documentation pipeline,
but keep this site as a static export with no application server.

---

## Problem Statement

This blog uses a separate Eleventy stack while the other applications use Next.js. Maintaining a
second publishing stack adds setup and deployment knowledge without providing a site-specific
benefit.

The migration must not require rewriting historical posts or moving the site to a server-backed
deployment. The current Markdown includes Obsidian links and image embeds, raw HTML, an iframe, and
one post without frontmatter. A direct copy of the MDX pipeline would not preserve all of this
content without compatibility work.

## Current-State Survey

- 22 posts under `blog/`
- Four published root pages: `/`, `/blog/`, `/projects/`, and `/now/`
- 40 Obsidian-style links or image embeds
- 33 lines beginning with raw HTML across the Markdown content
- 27 files under `files/`
- Two EJS layouts
- Semantic UI, jQuery, and static assets served from `/assets/`
- GitHub Pages deployment from `_site/` with `www.echoalex.com` in `CNAME`
- One post, `blog/2021/value-vs-quality.md`, without frontmatter

## Proposed Solution

Use the Next.js App Router and static export:

```text
Markdown files
  -> content loader and frontmatter parser
  -> React Markdown renderer with Obsidian compatibility
  -> statically generated Next.js routes
  -> out/
  -> GitHub Pages
```

Key decisions:

- Set `output: "export"` and `trailingSlash: true`.
- Keep the existing Markdown files as the content source.
- Use `react-markdown` because the posts do not need JSX components. Add focused plugins or a
  preprocessing step for Obsidian links, Obsidian image embeds, and trusted raw HTML.
- Use `gray-matter` for optional frontmatter.
- Generate all content routes at build time. Do not add API routes, server actions, middleware, or
  runtime content loading.
- Recreate the existing EJS shell as React components while retaining the Semantic UI classes and
  CSS.
- Keep `/assets/` and `/files/` public URLs stable.
- Publish `out/` through the existing GitHub Pages workflow and include `CNAME` in the export.
- Treat MDX as a later, separate decision. It is not required for this migration.

## Scope Boundaries

### In scope

- Replace the Eleventy build with Next.js static export.
- Preserve published content and route paths.
- Preserve the current visual design and responsive navigation behavior.
- Preserve the GitHub Pages and custom-domain deployment.
- Add automated checks for content discovery, route generation, and special Markdown constructs.
- Update the authoring instructions.

### Out of scope

- Redesign the site.
- Rewrite old posts or convert them to MDX.
- Add a CMS, search, comments, feeds, analytics, or dynamic server features.
- Replace GitHub Pages with EC2, Vercel, or another hosting provider.
- Automatically generate the blog archive unless required to preserve current links.

## Implementation Phases

### Phase 1: Confirm migration decisions 🔄

- [x] Inventory pages, posts, assets, layouts, Markdown extensions, and deployment files.
- [x] Compare the site with the FinOpsBricks Next.js documentation pipeline.
- [x] Confirm that Next.js static export can retain static hosting.
- [ ] Build a small renderer spike covering a normal post, Obsidian image embed, raw HTML post, and
  Loom iframe.
- [ ] Confirm whether Semantic UI's mobile sidebar should retain jQuery or use a small React client
  component.
- [ ] Record whether accidental layout output such as the visible `TEST` text should be preserved.

### Phase 2: Add the Next.js publishing pipeline ❌

- [ ] Add the minimal Next.js, React, frontmatter, Markdown, and compatibility dependencies.
- [ ] Add static-export configuration with trailing slashes.
- [ ] Add a content loader that discovers root pages and posts without requiring frontmatter.
- [ ] Add deterministic slug generation for every published Markdown file.
- [ ] Add static route generation and page metadata.
- [ ] Add the Markdown renderer and Obsidian compatibility layer.
- [ ] Exclude `README.md`, WIP documents, and other repository Markdown from published routes.

### Phase 3: Recreate the existing presentation ❌

- [ ] Convert the base and post EJS layouts to React components.
- [ ] Preserve desktop and mobile navigation behavior.
- [ ] Preserve the Semantic UI stylesheet, fonts, images, and content width.
- [ ] Serve existing `assets/` and `files/` URLs unchanged.
- [ ] Verify code blocks, lists, images, raw HTML, and the Loom embed.

### Phase 4: Preserve deployment ❌

- [ ] Replace the Eleventy build command with `next build`.
- [ ] Publish `out/` instead of `_site/` in GitHub Actions.
- [ ] Ensure `out/CNAME` contains `www.echoalex.com`.
- [ ] Keep deployment on pushes to `master` unless branch policy changes separately.
- [ ] Remove the obsolete Eleventy dependency and configuration after parity checks pass.

### Phase 5: Verify parity ❌

- [ ] Compare the complete old and new route lists.
- [ ] Verify that internal links resolve in the exported site.
- [ ] Verify that every referenced local image exists in the export.
- [ ] Compare representative desktop and mobile pages against the Eleventy output.
- [ ] Test the post without frontmatter and posts containing raw HTML.
- [ ] Run the production build from a clean dependency install.
- [ ] Deploy and smoke-test the custom domain before removing rollback artifacts.
- [ ] Update `README.md` with the Next.js authoring and deployment workflow.

## Acceptance Criteria

- `npm run build` produces a deployable static site in `out/`.
- The new export contains every currently published route with the same path.
- Existing article files render without content edits.
- Obsidian links and image embeds resolve to the same public targets.
- Existing `/assets/` and `/files/` URLs return the same files.
- Navigation and representative posts match the current desktop and mobile appearance.
- GitHub Pages serves the export at `www.echoalex.com` without a Node.js server.
- The repository no longer needs Eleventy to build or deploy the site.

## Risks and Controls

| Risk | Control |
|---|---|
| Obsidian syntax renders differently | Add fixture-based renderer tests before migrating all routes |
| Raw HTML breaks React rendering | Enable trusted raw HTML only for repository-owned content and test affected posts |
| Static export changes URLs | Enable trailing slashes and compare generated route inventories |
| Assets move or disappear | Keep public URLs stable and check every local reference after build |
| Mobile menu behavior regresses | Test at desktop and narrow viewports |
| GitHub Pages loses the custom domain | Include `CNAME` in `out/` and verify it before deployment |
| Framework standardization adds excess complexity | Keep the app static and avoid server-only Next.js features |

## Rollback

Keep the Eleventy configuration and the last known-good `_site/` deployment path until the Next.js
export passes parity checks. If production verification fails, restore the previous GitHub Pages
workflow and redeploy the Eleventy output.

## Related Files

- `.eleventy.js` - Current Markdown configuration and passthrough assets
- `_includes/layouts/base.ejs` - Current site shell and navigation
- `_includes/layouts/post.ejs` - Current content layout
- `.github/workflows/build.yml` - Current GitHub Pages build and deployment
- `package.json` - Current Eleventy build and dependencies
- `blog.md` - Current manual blog archive
- `CNAME` - Current custom domain
- [FinOpsBricks content loader](https://github.com/finopsbricks/app-template/blob/main/src/lib/docs.js)
- [FinOpsBricks dynamic docs route](https://github.com/finopsbricks/app-template/blob/main/src/app/docs/%5B...slug%5D/page.jsx)
- [WIP file standard](https://github.com/alexjv89/engineering-standards/blob/main/git-workflow/wip-files.md)
- [Markdown library choice](https://github.com/alexjv89/engineering-standards/blob/main/architecture/mdx-library-choice.md)
