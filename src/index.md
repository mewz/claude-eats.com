---
layout: default
title: ""
---
<main class="wrap">
  <section class="lede">
    <div class="kicker" style="display:flex;align-items:center;gap:14px;">Claude Eats</div>
    <h1>Cooking from what's on hand.</h1>
    <p class="dek">
      This is a working cook's library — not a magazine. Every card starts the
      same way: a farmers market haul, a few proteins from Wild Fork, and a
      pantry photographed down to the back row. The week's meals get planned
      around what's actually here, then written up as cards you can cook from
      and print.
    </p>
    <p style="margin-top:24px;max-width:60ch;">
      The cards favor technique over fuss. Each method step carries a short
      <em>why</em> — the reason behind the move, so the recipe teaches as it
      goes. Quantities scale to your serving count. Smoke, sear, and char lean
      on a GMG pellet smoker, a Weber, and a Cuisinart pizza oven; Calabrian
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
