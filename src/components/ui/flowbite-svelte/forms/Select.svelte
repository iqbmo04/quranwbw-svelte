<script>
	import { twMerge } from 'tailwind-merge';
	export let items = [];
	export let value = undefined;
	export let placeholder = 'Choose option ...';
	export let underline = false;
	export let size = 'md';
	export let defaultClass = 'text-gray-900 disabled:text-gray-400 bg-gray-50 border border-black/10 rounded-lg focus:ring-gray-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-gray-500 dark:focus:border-primary-500';
	export let underlineClass = 'text-gray-500 disabled:text-gray-400 bg-transparent border-0 border-b-2 border-black/10 appearance-none dark:text-gray-400 dark:disabled:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-black/10 peer';
	const common = 'block w-full';
	const sizes = {
		sm: 'text-sm p-2',
		md: 'text-sm p-2.5',
		lg: 'text-base py-3 px-4'
	};
	let selectClass;
	$: selectClass = twMerge(common, underline ? underlineClass : defaultClass, sizes[size], underline && '!px-0', $$props.class);
</script>

<select {...$$restProps} bind:value class={selectClass} on:change on:contextmenu on:input>
	{#if placeholder}
		<option disabled selected value="">{placeholder}</option>
	{/if}

	{#each items as { value, name }}
		<option {value}>{name}</option>
	{:else}
		<slot />
	{/each}
</select>

<!--
@component
[Go to docs](https://flowbite-svelte.com/)
## Props
@prop export let items: SelectOptionType<any>[] = [];
@prop export let value: any = undefined;
@prop export let placeholder: string = 'Choose option ...';
@prop export let underline: boolean = false;
@prop export let size: 'sm' | 'md' | 'lg' = 'md';
@prop export let defaultClass: string = 'text-gray-900 disabled:text-gray-400 bg-gray-50 border border-black/10 rounded-lg focus:ring-gray-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-gray-500 dark:focus:border-primary-500';
@prop export let underlineClass: string = 'text-gray-500 disabled:text-gray-400 bg-transparent border-0 border-b-2 border-black/10 appearance-none dark:text-gray-400 dark:disabled:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-black/10 peer';
-->
