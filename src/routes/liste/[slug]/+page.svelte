<script>
	import AddItemInput from '../../../lib/addItemInput/index.svelte';
	import ListItem from '../../../lib/listItem/index.svelte';
	export let data;

	/**
	 * @param {Object} item - The new list object to add to the lists.
	 * @param {number} item.id - The unique identifier for the new item.
	 * @param {string} item.name - The title of the new item.
	 * @param {string} item.created_at
	 * @param {number} item.purchased
	 * @param {number} item.length
	 */
	function addItem(item) {
		data.items = [...data.items, item];
	}
	/**
	 *
	 * @param {string} itemId
	 * @returns {Promise<void>}
	 */
	async function togglePurchase(itemId) {
		const item = data.items.find((i) => i.id === itemId);
		if (item) {
			item.purchased = item.purchased === 0 ? 1 : 0;
			data.items = data.items.slice(); // reassign to trigger reactivity
		}
	}
</script>

<svelte:head>
	<title>svelte.handlelista.no</title>
	<meta name="description" content="finn besøkte handlelista eller opprett en ny" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="mx-auto my-1 flex w-11/12 flex-col justify-between">
	<h2 class="barlow my-auto w-full text-center dark:text-slate-50">
		liste: {data.list.title}
	</h2>
	<div
		class="relative mx-auto h-16 w-11/12 rounded-sm border shadow-md drop-shadow-sm dark:bg-slate-200 lg:w-1/2"
	>
		<AddItemInput listId={data.listId} onAdd={addItem} />
	</div>
	<div
		class="mx-auto w-full gap-4 mt-3 flex min-h-[400px] flex-col justify-between dark:text-slate-50 lg:w-1/2"
	>
		<div>
			{#each data.items as item}
				{#if item.purchased === 0}<ListItem
						name={item.name}
						isPurchased={item.purchased}
						id={item.id}
						onToggle={togglePurchase}
					/>
				{/if}
			{/each}
		</div>
		<div>
			{#each data.items as item}
				{#if item.purchased === 1}<ListItem
						name={item.name}
						isPurchased={item.purchased}
						id={item.id}
						onToggle={togglePurchase}
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>
