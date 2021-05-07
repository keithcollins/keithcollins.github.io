# keithcollins.github.io

Some notes to self:

This is built using Svelte, Sapper, front-matter, marked and highlight.js. The starting point is the Svelte/Sapper template, using the instructions [here](https://newcurrent.se/blog/create-markdown-sapper-svelte-blog), with some small tweaks.

Mainly the markdown-based blog is setup to be the main and only page.

Most relevant folders and files:

src/routes/index.svelte
src/routes/blog/_posts.js
src/routes/blog/[slug].svelte (Individual blog posts)

[Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
