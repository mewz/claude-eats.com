---
layout: default
title: ""
---
<main class="wrap">
  <section class="lede">
    <div class="kicker" style="display:flex;align-items:center;gap:14px;">Claude Eats</div>
    <h1>Cooking from what's on hand.</h1>
    <p class="dek">
      This is a working cook's library — not a magazine. It begins in a Claude
      project: the spice rack, the condiments, the whole pantry photographed and
      uploaded, so Claude already knows what's on the shelf. Then a photo of the
      farmers market haul — or just a dish worth chasing — goes in, and Claude
      plans the meal around what's already here, handing back a short list of
      only what's missing: fresh herbs, a protein, the one or two things the
      pantry can't cover. What survives that pass gets written up as cards you
      can cook from and print.
    </p>
    <p style="margin-top:24px;max-width:60ch;">
      The cards favor technique over fuss. Every method step carries a short
      <em>why</em> — the reason behind the move, so the recipe teaches as it
      goes, and quantities scale to your serving count. Smoke, sear, and char
      lean on a GMG pellet smoker, a Weber, and a Cuisinart pizza oven; Calabrian
      chili turns up more than it has any right to.
    </p>
  </section>

  <section>
    <div class="section-label" style="margin-top:48px;">The library</div>
    <ul class="recipe-list">
      <% site.collections.recipes.resources.sort_by { |r| r.data.title.to_s }.each do |recipe| %>
        <li>
          <a href="<%= recipe.relative_url %>"><%= recipe.data.title %></a>
          <% if recipe.data.dek %><div class="card-dek"><%= recipe.data.dek %></div><% end %>
          <% if recipe.data.tags %><div class="tags"><%= Array(recipe.data.tags).join(" · ") %></div><% end %>
        </li>
      <% end %>
    </ul>
  </section>
</main>
