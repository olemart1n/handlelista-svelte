<script>
	import { LucideInfo, LucideCheck, LucideCheckCheck } from 'lucide-svelte';
	/**
	 * @type HTMLDivElement
	 */
	let divRef;
	/**
	 * @type any
	 */
	export let name;
	/**
	 * @type any
	 */
	export let isPurchased;
	/**
	 * @type any
	 */
	export let id;

	/**
	 * A callback function triggered when the "purchase" button is clicked in the ListItem component.
	 *
	 * This function should be invoked when the "purchase" button is clicked within the ListItem component.
	 * It typically triggers an action in the parent component, such as toggling the purchase status of an item.
	 *
	 * @type {Function} onToggle
	 * @param {number} itemId - The ID of the item whose purchase status is being toggled.
	 * @returns {void}
	 */
	export let onToggle;

	/**
	 *
	 * @param itemId {string}
	 */
	let updateItem = async (itemId) => {
		const res = await fetch('/item', {
			method: 'PUT',
			body: JSON.stringify({ itemId }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			onToggle(itemId);
			isPurchased = true;
		}
	};
</script>

<div
	bind:this={divRef}
	class=" mx-auto my-2 flex h-10 w-11/12 rounded-lg border text-gray-800 shadow-[0_2px_15px_-3px_rgba(d,f,d,f.2),0_10px_20px_-2px_rgba(0,0,0,0.9)] dark:bg-slate-200"
>
	<div class="flex w-full justify-between">
		<div class=" mx-auto my-1">
			<h5 class="lg:text-xxl relative text-xl font-bold leading-tight">
				{name}
			</h5>
		</div>
		{#if isPurchased}
			<button class="m-auto mx-5 aspect-square h-6 w-6 rounded-sm bg-green-200 shadow-md" disabled>
				<LucideCheckCheck class="m-auto" />
			</button>
		{:else}
			<button
				class="m-auto mx-5 aspect-square h-6 w-6 rounded-sm shadow-md shadow-gray-200 outline outline-1"
				on:click={() => updateItem(id)}
			>
				<LucideCheck class="m-auto text-gray-400" />
			</button>
		{/if}
	</div>
</div>
