import posts from './_posts.js';

const contents = JSON.stringify(posts.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(post => {
	return {
		title: post.title,
		slug: post.slug,
		date: post.date,
		html: post.html // KC added this so it can be fetched from home page
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}