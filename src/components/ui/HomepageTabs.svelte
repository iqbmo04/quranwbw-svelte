<script>
	import { Link } from 'svelte-routing';
	import { quranMetaData, mostRead } from '$data/quranMeta';
	import { fetchChapterData } from '$utils/fetchChapterData';
	import { __lastRead, __favouriteChapters } from '$utils/stores';

	import { inview } from 'svelte-inview';

	// chapter data fetch options
	const fetchOptions = {
		rootMargin: '10px',
		unobserveOnEnter: true
	};

	// chapter cards, tab styles
	const homepageTabsStyles = {
		cardGridStyle: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
		cardInnerStyle: `flex items-center justify-between text-sm border bg-${window.websiteColors[1].backgroundColorMain} hover:bg-${window.websiteColors[1].hoverBackgroundColor} hover:border-${window.websiteColors[1].hoverBorderColor} rounded-3xl p-5 hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-gray-${window.websiteColors[1].textColorMain}`,
		tabStyle: `py-2 px-4 text-xs cursor-pointer rounded-3xl hover:bg-${window.websiteColors[1].buttonBackgroundColor}`,
		activeTab: `bg-${window.websiteColors[1].buttonBackgroundColor}`
	};

	let activeTab = 1; // chapters tab
</script>

<div id="homepage-tabs" class="pt-0">
	<div class="mb-4 text-{window.websiteColors[1].textLightColor} dark:bg-{window.websiteColors[1].hoverBorderColor}">
		<ul class="flex flex-wrap text-sm font-medium text-center justify-center space-x-2 md:space-x-4">
			<li>
				<button on:click={() => (activeTab = 1)} class="{homepageTabsStyles.tabStyle} {activeTab === 1 ? `${homepageTabsStyles.activeTab}` : ''}" id="chapters-tab" data-tabs-target="#chapters-tab-panel" type="button" role="tab" aria-controls="chapters-tab-panel" aria-selected="false">Chapters</button>
			</li>
			<li>
				<button on:click={() => (activeTab = 2)} class="{homepageTabsStyles.tabStyle} {activeTab === 2 ? `${homepageTabsStyles.activeTab}` : ''}" id="most-read-tab" data-tabs-target="#most-read-tab-panel" type="button" role="tab" aria-controls="most-read-tab-panel" aria-selected="false">Most Read</button>
			</li>
			<li>
				<Link to="/{$__lastRead.split(':')[0]}/{$__lastRead.split(':')[1]}" class={homepageTabsStyles.tabStyle} id="last-read-tab" data-tabs-target="#most-read-tab-panel" type="button" role="tab" aria-controls="most-read-tab-panel" aria-selected="false">Last Read ({$__lastRead})</Link>
			</li>
		</ul>
	</div>

	<div id="content-tab" class="my-6 px-2">
		<!-- chapters tab -->
		<div class="homepage-tab-panels {activeTab === 1 ? 'block' : 'hidden'}" id="chapters-tab-panel" role="tabpanel" aria-labelledby="chapters-tab">
			<div class={homepageTabsStyles.cardGridStyle}>
				{#each { length: 114 } as _, chapter}
					<Link to="/{chapter + 1}" class={homepageTabsStyles.cardInnerStyle}>
						<div class="" use:inview={fetchOptions} on:inview_enter={(event) => fetchChapterData(+chapter + 1)}>
							<span class="text-sm">{chapter + 1}. {quranMetaData[chapter + 1].transliteration}</span>
							<div class="block text-xs text-{window.websiteColors[1].textLightColor}">
								{quranMetaData[chapter + 1].translation} <br />
								{quranMetaData[chapter + 1].verses} Verses &bull; {quranMetaData[chapter + 1].revelation === 1 ? 'Meccan' : 'Medinan'}
							</div>
						</div>
						<div class="chapter-icons justify-items-end text-{window.websiteColors[1].textLightColor} text-3xl mt-2">{@html `&#xE9${quranMetaData[chapter + 1].icon};`}</div>
					</Link>
				{/each}
			</div>
		</div>

		<!-- most read tab -->
		<div class="homepage-tab-panels space-y-12 {activeTab === 2 ? 'block' : 'hidden'}" id="most-read-tab-panel" role="tabpanel" aria-labelledby="most-read-tab">
			<!-- <div id="favourite-chapters" class="flex flex-col space-y-4">
        <div class="text-sm text-center font-medium">Your Favourites</div>
        <div class={homepageTabsStyles.cardGridStyle}>
          {#each $__favouriteChapters as chapter, index}
            <Link to="/{chapter}" class={homepageTabsStyles.cardInnerStyle}>
              <div class="">
                <span class="text-sm">{quranMetaData[chapter].transliteration}</span>
              </div>
            </Link>
          {/each}
        </div>
      </div> -->
			<div id="most-read-chapters" class="flex flex-col space-y-4">
				<!-- <div class="text-sm text-center font-medium">Recommended by QuranWBW</div> -->
				<div class={homepageTabsStyles.cardGridStyle}>
					{#each Object.entries(mostRead) as [id, item]}
						<Link to={item.url} class={homepageTabsStyles.cardInnerStyle}>
							<div class="">
								<span class="text-sm">{quranMetaData[item.chapter].transliteration} ({item.verses})</span>
								<div class="block text-xs text-{window.websiteColors[1].textColorMain}">{item.title}</div>
							</div>
						</Link>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
