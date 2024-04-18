<script>
	import { LucideCheck, LucidePlus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	/**
	 * @type HTMLButtonElement
	 */
	let buttonRef;
	let inputValue = '';

	/**
	 * @type {string} listId
	 */
	export let listId;

	/**
	 * @type {Function}
	 * @param {Object} item - The new item object to be added.
	 * @param {number} item.id - The unique identifier for the new item.
	 * @param {string} item.name - The title of the new item.
	 * @param {string} item.created_at
	 * @param {boolean} item.purchased
	 */
	export let onAdd;

	const addItem = async () => {
		const res = await fetch('/item', {
			method: 'POST',
			body: JSON.stringify({ name: inputValue, listId }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await res.json();
		const { id, name, created_at, purchased } = json;
		onAdd({ id, name, created_at, purchased });

		inputValue = '';
	};
</script>

<form class="flex h-full w-full" on:submit={async () => addItem()}>
	<input
		bind:value={inputValue}
		type="text"
		name="item"
		maxLength={20}
		id="item"
		class={'absolute z-10 m-auto h-full w-full border-gray-700 bg-transparent ps-3 text-center text-2xl '}
	/>
	<button bind:this={buttonRef} class="absolute -left-full" type="button"></button>
	<button
		class={'right-0 m-1 my-auto ms-auto h-14 w-14 rounded bg-green-200 ' +
			(inputValue.length > 2 && 'z-20 bg-green-300')}
	>
		{#if inputValue.length > 2}
			<LucideCheck class="m-auto h-12 w-12" aria-hidden="true" focusable="false" />
		{:else}
			<LucidePlus class="m-auto h-12 w-12" aria-hidden="true" focusable="false" />
		{/if}
	</button>
</form>
<!-- 
// onsubmit$={() => {
//   if (inputValue.value.length < 3) return;
//   insertItem.submit({ name: inputValue.value }).then((data) => {
//     list.push(data.value as unknown as ListItem);
//     inputValue.value = "";
//     buttonRef.value?.focus();
//   });
// }} -->
