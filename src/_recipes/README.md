---
# This is the collection's schema doc, not a recipe. Keep it out of the build.
published: false
---
# _recipes — front matter schema

Every file in this collection is a Markdown file whose **front matter is the
recipe**. The `recipe` layout (set by default in `bridgetown.config.yml`)
renders it into the Claude Eats card design. Copy the template below for new
cards.

## Required

| Field      | Type   | Notes                                              |
|------------|--------|----------------------------------------------------|
| `title`    | string | Card title and listing name.                       |
| `servings` | number | Base servings. The scaler multiplies from here.    |
| `ingredients` | list | See structure below.                             |
| `steps`    | list   | See structure below.                               |

## Optional

| Field         | Type    | Notes                                          |
|---------------|---------|------------------------------------------------|
| `kicker`      | string  | Eyebrow label (e.g. "Beef · Reverse Sear").    |
| `dek`         | string  | Italic subtitle under the title.               |
| `scaler`      | bool    | Defaults to `true`. Set `false` to hide it.    |
| `time_active` | string  | e.g. "30 min".                                 |
| `time_total`  | string  | e.g. "2 hr".                                    |
| `equipment`   | string  | e.g. "GMG + Weber".                            |
| `tags`        | list    | Shown on the homepage listing.                 |

## Ingredient structure

Numeric amounts scale with the serving control. Use `amount` + `unit` for
anything quantified; use `note` for "to taste" style entries that shouldn't
scale.

```yaml
ingredients:
  - name: Kosher salt
    amount: 1
    unit: tbsp
  - name: Cayenne
    note: to taste
```

`unit` is free text — `g`, `tbsp`, `cup`, `lb`, etc. For gram-based baking
just use `unit: g`; the scaler handles it the same way.

## Step structure

```yaml
steps:
  - text: What to do.
    why: The technique rationale. Optional but encouraged — it's the house style.
```

## Body (after the `---`)

Anything below the front matter renders as a closing notes block — pairings,
leftovers, substitutions. Optional.

## House conventions

- Forced light mode is baked into the shared CSS; don't override per-card.
- Gram measurements preferred for baking; doneness cues over temps for grilling.
- Keep the `why` notes short — one or two sentences.
