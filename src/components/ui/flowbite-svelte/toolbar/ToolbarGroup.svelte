<script>import { twMerge } from 'tailwind-merge';
import { getContext } from 'svelte';
export let divClass = 'flex items-center space-x-1 rtl:space-x-reverse sm:pe-4 sm:ps-4 first:sm:ps-0 last:sm:pe-0';
const options = getContext('toolbar');
if (options)
    $options = true;
</script>

<div class={twMerge(divClass, $$props.class)}>
  <slot />
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/)
## Props
@prop export let divClass: string = 'flex items-center space-x-1 rtl:space-x-reverse sm:pe-4 sm:ps-4 first:sm:ps-0 last:sm:pe-0';
-->
