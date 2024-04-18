<script>
	import { LucideMoon, LucideSun } from 'lucide-svelte';
	import { theme } from '../../stores';
	function toggleTheme() {
		// Update the store by using $ to access its value
		$theme = !$theme; // This toggles the boolean value
	}
</script>

<button
	class="relative flex h-4 w-9 items-center rounded-full outline outline-1 transition duration-300 dark:text-slate-50 dark:outline dark:outline-1 lg:mx-0 lg:my-0"
	on:click={() => {
		toggleTheme();
	}}
>
	<LucideMoon
		size="16"
		class=" absolute right-0 transform opacity-0 transition duration-300 dark:left-auto dark:-translate-x-5 dark:opacity-100"
	/>
	<LucideSun
		size="16"
		class="absolute right-0 transform transition duration-300   dark:-translate-x-5  dark:opacity-0"
	/>
</button>

<style lang="postcss">
	button {
		border-radius: 3px;
		border: 1px solid black;
		padding: 0;
		height: 1rem;
	}
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply inline-block cursor-pointer h-12 w-12 absolute top-6 right-24 rounded-full duration-300 content-[''];
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-400;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -18px -16px 1px 1px #ddd;
	}
</style>
