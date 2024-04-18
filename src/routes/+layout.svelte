<script>
	import '../app.css';
	import ThemeToggler from '../lib/themeToggler/index.svelte';
	import { theme } from '../stores';
</script>

<header class={$theme ? 'dark' : ''}>
	<nav
		class="text-md flex w-full transform justify-between p-1 py-2 duration-300 dark:bg-gray-800 dark:text-slate-50"
	>
		<a href="/">
			<h1>handlelista.no</h1>
		</a>
		<ThemeToggler />
	</nav>
</header>

<main class={($theme ? 'bg-gray-800 dark' : '') + ' transition duration-300 '}>
	<slot />
</main>
