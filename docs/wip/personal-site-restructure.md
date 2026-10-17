# Restructure echoalex.com Into a Personal Site With a Side-Project Catalog

## Status: IN PROGRESS (~40%)

Turn echoalex.com from a thin copy of LinkedIn into the place where someone who is about to hire or
partner with Alex finds out who Alex is as a person: what Alex makes for fun, rides and is
obsessed with right now. The structural fix is a **project** content type (one markdown file per
side project, rendered into a generated catalog and per-project pages) that stays separate from
**blog posts**, with posts able to point at the project they are about. Adding a newly remembered
project is "drop one file in `projects/`".

---

## Problem Statement

**Who visits.** Someone narrowing a shortlist (a founder, a hiring panel, a potential co-founder)
who has already seen the resume and LinkedIn. They come to the site to answer "what is this person
actually like, and would I enjoy working with this person?"

**What they found before this work.**

- `index.md` is a work history (Mr Albert "current", Ather, Postman, Makeystreet, IIT Madras). It
  repeats LinkedIn and is six years out of date.
- `projects.md` was a five-item list of names with no links.
- `now.md` is from April 2020.
- `blog.md` is a hand-maintained archive with mixed link styles (see [[blog-archive-cleanup]]).
- None of the personality showed: the electric unicycle, the Kerala cycling trip, RC cars, sim
  racing, Highly Reco.

**Structural gaps.** There was no notion of a project, so a project could only be a bullet or a
blog post, and every index was maintained by hand.

## Design Principles

1. **Person first, resume never.** The home page is about interests and things made, in Alex's own
   casual voice. Work gets one sentence and a LinkedIn link.
2. **Don't repeat LinkedIn.** Employers and client work (Ather, Postman, Cashflowy Inc,
   FinOpsBricks, IMGears, Vimana, AsyncAuto) are not projects.
3. **Projects and posts are different things.** A project page is a durable record. A post is a
   dated piece of writing that can declare `projects: [id]`.
4. **Plug-in, not rewrite.** Adding a project is creating one file; indexes are generated.
5. **Honest about status.** Dead projects are shown as dead.
6. **Obsidian-friendly.** Plain markdown with frontmatter; `[[wikilinks]]` keep working.

## Decisions

- **2026-10-17: Start with the basics.** No featured projects, themes or home-page sections yet.
  Revisit once the content is in.
- **2026-10-17: One list, newest first, with filters.** The catalog is a single list sorted by
  `started`, with client-side status and type filters. No grouped view.
- **2026-10-17: Dropped thin projects** (3D-printed business card, LED matrix, Self Employed
  Indian, arduinotweet, YouTube extractor, Bangalore Unicycle Club docs).
- **2026-10-17: Cashflowy (open source) and Mr Albert are dead.** Both are listed as projects
  with status `dead`.
- **2026-10-17: Sim racing gets a placeholder page.** Alex will share photos and videos.
- **2026-10-17: Crediting friends by name is OK.**
- **On hold:** how Time Aware is framed (ADHD). The project page currently has a neutral tagline.
- **Wikilink collisions.** A bare name shared by a post and a project (e.g. `time-aware`) now fails
  the build; link with a folder prefix (`[[projects/time-aware]]`).
- **Statuses** are `active | dormant | done | dead`. **Kinds** are
  `build | software | adventure | hobby | venture | talk`.

## What Was Built

- `projects/*.md`: one file per project; slug is the file name, URL is `/projects/<slug>/`.
  Required frontmatter: `title`, `tagline`, `kind`, `started`, `status`. Optional: `ended`,
  `videos` (YouTube ids), `links` (`{ label, url }`). An invalid file fails the build.
- `/projects/`: `projects.md` intro (the 2012 maker manifesto) plus the generated catalog: one
  list, newest first, with status and type filters and a YouTube thumbnail when there is a video.
- `/projects/<slug>/`: header (title, tagline, years, status), story, links, video thumbnails, and
  "Writing about this" (posts that declare the project).
- Posts with `projects:` show "Part of <project>".
- `templates/project.md` and a README section on adding a project.
- 28 projects (34 seeded, 6 dropped) from the research inventory, mostly as stubs (frontmatter plus a line or two).
  The "maker years" content moved into individual project pages.

## Implementation Phases

### Phase 1: Basic decisions ✅

- [x] Agree to start with the basic content type and no featured logic.
- [x] Decide the status of Cashflowy (open source) and Mr Albert.
- [x] Decide wikilink collision handling.

### Phase 2: Project content type and generated pages ✅

- [x] Project discovery, validation and query helpers in `src/lib/content.js`.
- [x] Catalog and project pages rendered through the catch-all route.
- [x] `projects:` on posts, with "Part of" and "Writing about this".
- [x] `templates/project.md`, README.
- [x] Tests: structural page counts, project schema, post→project references, ambiguous wikilinks.

### Phase 3: Migrate existing project content ✅

- [x] Split the "maker years" section of `projects.md` into project pages.
- [x] Link the Time Aware, bulkrun and Cashflowy posts to their projects.

### Phase 4: Write the project stories 🔄

- [x] Stubs for every project in the inventory.
- [ ] Alex reviews the stubs: anything missing, wrong or to drop.
- [ ] Stories in Alex's voice for the projects that deserve one.
- [ ] Sim racing photos and videos (from Alex).
- [ ] Photos for older builds where they exist.
- [ ] Decide on the Time Aware framing.

### Phase 5: Home and Now ❌

- [ ] Rewrite `index.md` as a personal page (intro, interests, one line on work, links elsewhere).
- [ ] Decide whether the home page shows selected projects and recent posts.
- [ ] Rewrite `now.md`.

### Phase 6: Generated blog archive ❌

- [ ] Generate `/blog/` from post frontmatter, grouped by year.
- [ ] Fix the issues in [[blog-archive-cleanup]] at the source, then delete that WIP.

### Phase 7: Verify and ship ❌

- [ ] `npm test` and `npm run build` pass; screenshots at desktop and mobile widths.
- [ ] All existing post URLs still resolve.
- [ ] Push to `master` and check the GitHub Pages deploy.

## Not Included as Projects

- Employer, client and company work (see principle 2).
- Forks of other people's software.
- Friends' projects on the YouTube channel (ornithopter, BEAM bot, surf video).
- Throwaway repos (scrapers, `woot`, `timelog`, `carb-content`, `business-stack`, `spacebook`,
  `time-travel`, `pensive`) and early experiments (`mochi-clone`, `self-mastery`, `agenticai`).
- Microlight (lives in the IMGears org; personal or work is undecided).

## Related Files

- `projects/` - One file per project
- `templates/project.md` - Template for a new project
- `src/lib/content.js` - Content discovery, project validation and queries
- `src/lib/obsidian-links.js` - Wikilink resolution, including ambiguous names
- `src/components/ProjectCatalog.jsx` - Client-side catalog with status and type filters
- `src/components/Projects.jsx` - Project header and details, "Part of"
- `src/components/project-meta.jsx` - Years, status label and thumbnail helpers shared by both
- `src/app/[...slug]/page.jsx` - Picks the layout for the catalog, projects and posts
- `projects.md` - Catalog intro
- `tests/content.test.js`, `tests/obsidian-links.test.js` - Content and link checks
- [[blog-archive-cleanup]] - Folded into Phase 6
- [WIP file standard](https://github.com/alexjv89/engineering-standards/blob/main/git-workflow/wip-files.md)
