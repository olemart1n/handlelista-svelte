<script>
	import { LucideLoader2, LucideCheck, LucideStepForward } from 'lucide-svelte';

	let isLoading = false;
	let title = '';

	/**
	 * @type {Function}
	 * @param {Object} list - The new list object to be added.
	 * @param {number} list.id - The unique identifier for the new list.
	 * @param {string} list.title - The title of the new list.
	 */
	export let onAdd;

	const send = async () => {
		isLoading = true;
		const res = await fetch('/list/post', {
			method: 'POST',
			body: JSON.stringify({ title }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await res.json();
		onAdd({ id: json.list.id, title: json.list.title });
		isLoading = false;
		title = '';
	};
</script>

<form class={'my-2 flex h-10 lg:w-1/2 lg:mx-auto'} on:submit={async () => send()}>
	<input
		id="input-ref"
		bind:value={title}
		type="text"
		name="title"
		placeholder="tittel"
		class="w-full rounded border-2 border-slate-600 text-center text-xl"
	/>

	<button
		class={' mx-2 aspect-square rounded ' + (title.length > 2 ? 'bg-green-300' : 'bg-green-100')}
		disabled={title.length < 2}
	>
		{#if isLoading}
			<LucideLoader2 class="m-auto h-8 w-8 animate-spin text-white" />
		{:else}
			<LucideCheck class="m-auto h-8 w-8 " />
		{/if}
	</button>
</form>
