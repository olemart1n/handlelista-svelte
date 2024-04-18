<script>
	/**
	 *  @type string
	 */
	export let id;
	/**
	 *  @type string
	 */
	export let title;
</script>

<div
	class="border-1 mx-auto my-2 flex h-12 w-full justify-between dark:text-gray-800 rounded-lg bg-slate-200 align-middle shadow-gray-400"
>
	<a href={`/liste/${id}`} class="my-auto w-full p-2 text-lg">{title}</a>
</div>
