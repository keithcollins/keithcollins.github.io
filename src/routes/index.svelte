<!-- 
Note from KC to KC: This page is cobbled together from /blog/index.svelte 
and /blog/[slug].svelte.
-->
<script context="module">
	export function preload() {
		return this.fetch(`index.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	export let posts;
</script>

<svelte:head><title>Keith Collins, Visual Journalist</title></svelte:head>

<div class='home-container'>
	{#each posts as post}
		
		<div class='post'>
			<h1>{post.title}</h1>
			<div class='date'>POSTED ON {post.date}</div>
			
			<div class="content">
				{@html post.html}
			</div>
		</div>

	{/each}
	</div>

<style>
	.home-container {
		max-width:600px;
		margin: 0 auto;
		font-family: sans-serif;
	}
	.home-container :global(img) {
		width:100%;
	}
	.home-container :global(h1) {
		font-weight: bold;
		margin-bottom: 10px;
	}
	.home-container :global(h1 > a) {
		text-decoration: none;
	}
	.home-container :global(h2) {
		font-size: 1.4em;
		color: #333;
    line-height: 1.3;
    letter-spacing: 0.2px;
	}
	.home-container :global(p) {
		font-size: 16px;
    color: #333;
    line-height: 1.5;
	}
	.home-container :global(p > a) {
		color:#0275d8;
	}

	.home-container > .post > .date {
		font-size:12px;
		color:#999;
		margin-bottom:10px;
	}

	.home-container > .post {
		padding-bottom:20px;
		margin-bottom: 20px;
		border-bottom: 1px solid #ddd;
	}
	/*
		FROM [slug].svelte:
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	/* .content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	} */

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>