<script>
	import PageMeta from '$components/PageMeta.svelte';
	import { Link } from 'svelte-routing';
	import { websiteTagline } from '$data/websiteSettings';
	import { __currentPage, __lastRead } from '$utils/stores';
	import Logo from '$svgs/Logo.svelte';

	import HomepageTabs from '$ui/HomepageTabs.svelte';

	const linkStyles = 'py-2 px-2 text-xs cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-{window.websiteColors[1].textColorMain} rounded-3xl hover:bg-{window.websiteColors[1].buttonBackgroundColor} dark:hover:bg-slate-700';

	__currentPage.set('home');
</script>

<PageMeta title={`Quran ${websiteTagline}`} />

<div class="max-w-4xl mx-auto flex flex-col space-y-8 md:px-4">
	<div class="flex flex-col mt-4">
		<Link to="/" class="flex justify-center text-{window.websiteColors[1].websiteLogoColor}">
			<Logo width="52" />
		</Link>
		<div class="text-xs text-center text-{window.websiteColors[1].textLightColor}">{websiteTagline}</div>
	</div>

	<div class="flex flex-wrap flex-col md:flex-col mt-12 justify-center text-xs font-bold text-{window.websiteColors[1].textLightColor} space-y-4">
		<!-- last read link -->
		<!-- <div id="last-read-block" class="flex justify-center items-center block">
      <Link to="/{$__lastRead.split(':')[0]}/{$__lastRead.split(':')[1]}" id="last-read-link" class={linkStyles}>Last Read ({$__lastRead})</Link>
    </div> -->

		<div class="flex flex-row flex-wrap space-x-1 md:space-x-2 justify-center">
			<!-- Supplications from Quran page -->
			<div id="supplications-link" class="flex justify-center items-center block">
				<Link to="/supplications" class={linkStyles}>Supplications</Link>
			</div>

			<!-- bookmarks page -->
			<div id="bookmarks-link" class="flex justify-center items-center block">
				<Link to="/bookmarks" class={linkStyles}>Bookmarks</Link>
			</div>

			<!-- morphology page -->
			<div id="morphology-link" class="flex justify-center items-center block">
				<Link to="/morphology/1:1" class={linkStyles}>Morphology</Link>
			</div>

			<!-- search page -->
			<div id="search-link" class="flex justify-center items-center block">
				<Link to="/search" class={linkStyles}>Search</Link>
			</div>
		</div>
	</div>

	<!-- chapter and most read tabs -->
	<HomepageTabs />
</div>
