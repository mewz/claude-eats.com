# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Claude Eats is a **Bridgetown 2.2 static site** — a personal recipe library where each recipe's
front matter *is* the recipe (no Markdown body required). The house style is "technique over fuss":
every method step can carry a short `why` explaining the move. Source lives in `src/`; the build
output is `output/` (gitignored).

## Commands

Prereqs: Ruby `>= 3.3` (`.ruby-version` pins 3.3.7), Node `>= 22`. Install with `bundle install && npm install`.

```sh
bin/bridgetown start      # dev server with live reload at http://localhost:4000
bin/bridgetown console    # IRB with the site loaded (inspect resources, collections)
bin/bt <cmd>              # shorthand for bin/bridgetown
bundle exec rake          # full production build (clean → esbuild → bridgetown build) — the default task
bundle exec rake test     # build with BRIDGETOWN_ENV=test
npm run esbuild           # build frontend bundle (minified)
npm run esbuild-dev       # watch frontend bundle
```

There is **no test suite and no linter** configured. "Building" is the verification step — run
`bin/bridgetown start` or `bundle exec rake` and confirm the build succeeds with no errors.

After editing `config/initializers.rb` you must **restart** the dev server — that file is not reloaded automatically.

## Architecture

**Recipes are a Bridgetown collection, not pages.** Files in `src/_recipes/*.md` are configured in
`bridgetown.config.yml` (at the **project root** — Bridgetown does not read it from `src/`) to output at `/recipes/:slug/` with the `recipe` layout applied by
default. To add a recipe, create a Markdown file there — the front-matter schema is documented in
`src/_recipes/README.md` (required: `title`, `servings`, `ingredients`, `steps`). The homepage
(`src/index.md`) and recipe layout iterate over `site.collections.recipes.resources` and the
front-matter fields; there is no hardcoded list to maintain.

**Two separate asset pipelines — know which one you're touching:**
- `frontend/` (`javascript/index.js`, `styles/`) is the **esbuild** pipeline, built into
  `output/_bridgetown/static/` and referenced via Bridgetown asset helpers. `jsconfig.json` defines
  the `$styles`, `$javascript`, `$components` import aliases.
- `src/assets/css/site.css` and `src/assets/js/scaler.js` are **served as-is** from `/assets/...`.
  The layouts (`src/_layouts/default.erb`, `recipe.erb`) link these directly with absolute
  `/assets/...` paths — they do **not** go through esbuild. The actual site styling lives in
  `src/assets/css/site.css`, so edit there for visual changes.

**The serving scaler** (`src/assets/js/scaler.js`) is the one piece of interactivity. The recipe
layout renders each numeric ingredient amount with `data-base` / `data-unit` attributes and a
`data-base-servings` on the `[data-recipe]` root; the script rescales amounts proportionally when
the +/- buttons change the serving count. It's only injected when a recipe's `scaler` front-matter
flag is truthy (defaults to `true`).

**Templating is ERB** (`template_engine: erb`). Layouts compose via front-matter `layout:` chaining
(`recipe.erb` → `default.erb`). Access front matter through `resource.data.<field>` and site config
through `site.metadata.*` / `site.collections.*`.

**Roda backend** (`server/roda_app.rb`, booted by `config.ru` via Falcon) exists for dynamic
routing but is essentially unused — SSR and `bridgetown-routes` are commented out in
`config/initializers.rb`. The site is currently fully static. Custom build-time plugins would go in
`plugins/builders/` as subclasses of `SiteBuilder` (`plugins/site_builder.rb`).

## Conventions

- Forced light mode is baked into `site.css`; don't add per-recipe color overrides.
- Prefer gram measurements for baking; doneness cues over fixed temps for grilling.
- Keep `why` notes to one or two sentences.
- `note:` ingredients (e.g. "to taste") are excluded from scaling; `amount` + `unit` ingredients scale.
