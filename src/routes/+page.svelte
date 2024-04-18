<script>
	import InputCreateList from '../lib/inputCreateList/index.svelte';
	import LinkToList from '../lib/linkToList/index.svelte';
	export let data;

	/**
	 * @param {Object} newList - The new list object to add to the lists.
	 * @param {number} newList.id - The unique identifier of the new list.
	 * @param {string} newList.title - The title of the new list.
	 */
	function addToLists(newList) {
		data.lists = [...data.lists, newList];
	}
</script>

<svelte:head>
	<title>Handlelista/svelte</title>
	<meta name="description" content="finn besøkte handlelista eller opprett en ny" />
</svelte:head>

<InputCreateList onAdd={addToLists} />
<div class="mx-auto my-3 w-11/12 lg:w-2/3">
	{#each data.lists as list}
		<LinkToList id={list.id} title={list.title} />
	{/each}
</div>
