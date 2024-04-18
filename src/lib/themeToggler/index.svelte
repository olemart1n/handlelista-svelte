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
