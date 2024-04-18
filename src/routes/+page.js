/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge'
};

// DATA IS DYNAMIC (DEPENDENT ON LISTS STORED IN COOKIE) SO IT CAN NOT BE PRERENDERED
export const prerender = false;
