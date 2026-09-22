# Clean Up the Blog Archive Index

## Status: NOT STARTED

The manual blog archive in `blog.md` renders inconsistently: some entries show a human title while
others show a raw slug, one year header is duplicated, and at least one link points at a path that
is not a published route. Normalize the archive so every entry shows a proper title and links to a
real route, without changing the migration itself.

---

## Problem Statement

`blog.md` is a hand-maintained index. It mixes two link styles:

- Markdown links `[Human Title](/blog/2026/some-slug)` — render with a readable title.
- Obsidian wikilinks `[[some-slug]]` — render with the slug as the visible text (`bulk_run`,
  `value-vs-quality`, `projects`, etc.).

Because of this, the rendered archive is visually inconsistent. The migration faithfully reproduces
the source, so this is a content problem in `blog.md`, not a renderer bug. Discovered while
verifying visual parity during the Next.js migration (see
[[nextjs-static-blog-migration]]).

## Observed Issues

- Wikilink entries display slugs instead of titles: `bulk_run`, `i-dont-have-time`,
  `value-vs-quality`, `end-is-very-far-away`, and every 2019/2020 entry, plus the 2018 entries.
- Duplicate `## 2024` header — "Modal messages vs UI messages" and "Time aware" sit under two
  separate 2024 blocks instead of one.
- "Modal messages vs UI messages" links to `/blog/2025/modelmessages-vs-uimessages`, which is not a
  published route (the post is under a different path). Verify the correct target.
- A `[[projects]]` entry appears at the end of 2018; confirm whether it should be in the archive at
  all.
- `blog/2021/value-vs-quality.md` has no frontmatter `title`, so even a corrected link has no title
  to pull from automatically.

## Proposed Solution

Treat `blog.md` as the single source of truth for the archive and normalize it by hand:

- Convert every `[[wikilink]]` entry to `[Human Title](/blog/<year>/<slug>)`.
- Merge the duplicate 2024 header into one block in the correct order.
- Fix the "Modal messages vs UI messages" link to its real published route.
- Decide whether `[[projects]]` belongs in the archive; remove it if not.
- For posts missing a frontmatter `title` (e.g. `value-vs-quality.md`), either add a `title` to the
  post frontmatter or spell the title out in the archive link text.
- Confirm every archive link resolves against the generated route list from the export.

Do not automate archive generation as part of this task; that is a separate, larger decision that
the migration explicitly deferred.

## Scope Boundaries

### In scope

- Edit `blog.md` link text, titles, headers, and targets.
- Add missing frontmatter `title` values to referenced posts where it helps.
- Verify each archive link against the exported route inventory.

### Out of scope

- Auto-generating the archive from post frontmatter.
- Redesigning the archive layout.
- Editing post body content beyond frontmatter titles.
- Any change to the Next.js pipeline or renderer.

## Implementation Phases

### Phase 1: Audit ❌

- [ ] List every archive entry with its current link style, visible text, and target.
- [ ] Generate the exported route list and mark which entries resolve and which do not.
- [ ] Note which referenced posts lack a frontmatter `title`.

### Phase 2: Normalize `blog.md` ❌

- [ ] Convert all wikilink entries to titled Markdown links.
- [ ] Merge the duplicate 2024 header.
- [ ] Fix the "Modal messages vs UI messages" target.
- [ ] Resolve the `[[projects]]` entry.

### Phase 3: Verify ❌

- [ ] Rebuild and confirm every archive link resolves to a real route.
- [ ] Confirm every entry shows a readable title.
- [ ] Spot-check the rendered `/blog/` page at desktop and mobile widths.

## Acceptance Criteria

- Every entry in the rendered `/blog/` archive shows a human-readable title.
- Every archive link resolves to a published route in the export.
- Years appear once each, in order.
- No change to the Next.js pipeline or to post body content.

## Related Files

- `blog.md` - The manual archive index
- `blog/2021/value-vs-quality.md` - Post missing a frontmatter title
- `src/lib/obsidian-links.js` - How wikilinks resolve to routes (reference only)
- [[nextjs-static-blog-migration]] - Migration WIP where this was discovered
- [WIP file standard](https://github.com/alexjv89/engineering-standards/blob/main/git-workflow/wip-files.md)
