<script>
	import { __currentPage, __chapterData, __chapterNumber, __wordType, __displayType, __websiteTheme, __wordTranslation, __wordTranslationEnabled, __wordTransliterationEnabled, __verseTranslations, __reciter, __playbackSpeed, __userSettings, __tajweedEnabled } from '$utils/stores';
	import { displayOptions, selectableFontTypes, selectableThemes, selectableVerseTranslations, verseTranslationsLanguages, selectableWordTranslations, selectableReciters, selectablePlaybackSpeeds } from '$data/options';
	import { updateSettings } from '$utils/updateSettings';
	import { resetSettings } from '$utils/resetSettings';
	import { disabledElement, buttonElement } from '$data/commonStyles';
	// import Spinner from '$svgs/Spinner.svelte';
	// import VersesWords from '$verses/VersesWords.svelte';
	// import { fetchVersesData } from '$utils/fetchChapterData';

	const settingsBlockClasses = 'space-y-2 py-6';

	const selectorClasses = `w-32 border bg-${window.websiteColors[1].primaryNormal} text-${window.websiteColors[1].textMain} border-${window.websiteColors[1].buttonBorder} text-left rounded-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 truncate`;

	$: fontSizeCodes = JSON.parse($__userSettings).displaySettings.fontSizes;

	// fetching verse 1:1 for text preview
	// $: verseData = fetchVersesData('1:1', $__wordType, $__wordTranslation, '');
</script>

<!-- drawer component -->
<div id="settings-drawer" class="fixed top-0 right-0 z-40 h-screen p-4 pt-0 pb-16 overflow-y-auto transition-transform md:rounded-tl-xl md:rounded-bl-xl translate-x-full bg-{window.websiteColors[1].backgroundMain} theme-grayscale w-full md:w-1/2 lg:w-[430px] dark:bg-{window.websiteColors[1].primaryDark}" tabindex="-1" aria-labelledby="settings-drawer-label">
	<div id="settings-head" class="z-30 top-0 sticky bg-{window.websiteColors[1].backgroundMain} border-b-2 py-4 mb-4">
		<h5 id="settings-drawer-label" class="inline-flex items-center mb-4 text-3xl space-x-2 font-semibold text-{window.websiteColors[1].textMain}">
			<span>Settings</span>
		</h5>

		<button
			id="settings-drawer-close-button"
			type="button"
			data-drawer-hide="settings-drawer"
			aria-controls="settings-drawer"
			class="text-{window.websiteColors[1].textMain} bg-transparent hover:bg-{window.websiteColors[1].primaryNormal} hover:text-{window.websiteColors[1].textMain} rounded-3xl text-sm w-8 h-8 absolute top-4 right-2.5 inline-flex items-center justify-center dark:hover:bg-{window.websiteColors[1].primaryDark} dark:hover:text-white"
		>
			<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
			</svg>
			<span class="sr-only">Close menu</span>
		</button>
	</div>

	<!-- Text Preview -->
	<!-- <div class="z-30 flex flex-col space-y-4 bg-{window.websiteColors[1].backgroundMain} border-b-2 pt-2 sticky top-[10%]">
		<span>Text Preview</span>
		<div id="verse" class="flex h-fit max-h-28 py-2 overflow-y-scroll direction-rtl">
			{#await verseData}
				<Spinner />
			{:then verseData}
				<div class="flex flex-wrap justify-center direction-rtl">
					{#each Object.entries(verseData) as [key, value]}
						<VersesWords {key} {value} />
					{/each}
				</div>
			{:catch error}
				<p>{error}</p>
			{/await}
		</div>
	</div> -->

	<!-- display-settings-block -->
	<div id="display-settings-block" class="py-5">
		<h3 class="block mb-2 font-medium text-xl text-{window.websiteColors[1].textMain}">Display</h3>

		<div class="flex flex-col flex-wrap text-base">
			<!-- website-theme-setting -->
			<div id="website-theme-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<label for="website-theme-list" class="block text-{window.websiteColors[1].textMain}">Theme</label>
					<select id="website-theme-list" on:change={(event) => updateSettings({ type: 'websiteTheme', value: +event.target.value })} bind:value={$__websiteTheme} class={selectorClasses}>
						{#each Object.entries(selectableThemes) as [id, theme]}
							<option value={theme.id}>{theme.name}</option>
						{/each}
					</select>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">An assortment of website themes to please your vision.</p>
			</div>

			<div class="border-b"></div>

			<!-- display-type-setting -->
			<div id="display-type-setting" class="{settingsBlockClasses} {$__currentPage === 'page' && disabledElement}">
				<div class="flex flex-row justify-between items-center">
					<label for="display-style-list" class="block text-{window.websiteColors[1].textMain}">Display Type</label>
					<select id="display-style-list" bind:value={$__displayType} on:change={(event) => updateSettings({ type: 'displayType', value: +event.target.selectedIndex + 1 })} class={selectorClasses}>
						{#each Object.entries(displayOptions) as [id, displayOption]}
							<option disabled={$__currentPage !== 'chapter' && displayOption.displayID > 2 && 'true'} value={displayOption.displayID}>{displayOption.displayName}</option>
						{/each}
					</select>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Different verse layouts that you can choose from.</p>
			</div>

			<div class="border-b"></div>

			<!-- word-translation-toggle-setting -->
			<div id="word-translation-toggle-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<span class="block text-{window.websiteColors[1].textMain}">Word Translation</span>

					<label class="inline-flex items-center cursor-pointer {$__wordTransliterationEnabled === false && disabledElement}">
						<input type="checkbox" value="" class="sr-only peer" checked={$__wordTranslationEnabled} on:click={(event) => updateSettings({ type: 'wordTranslationEnabled', value: event.target.checked })} />
						<div
							class="relative w-14 h-7 bg-{window.websiteColors[1].primaryDark} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-{window.websiteColors[1]
								.primaryDark} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-{window.websiteColors[1].backgroundMain} after:bg-{window.websiteColors[1].hoverBorder} after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:bg-{window
								.websiteColors[1].hoverBorder} peer-checked:bg-blue-600"
						></div>
					</label>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Toggle the word translation which is shown below the Arabic word.</p>
			</div>

			<div class="border-b"></div>

			<!-- word-transliteration-toggle-setting -->
			<div id="word-transliteration-toggle-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<span class="block text-{window.websiteColors[1].textMain}">Word Transliteration</span>

					<label class="inline-flex items-center cursor-pointer {$__wordTranslationEnabled === false && disabledElement}">
						<input type="checkbox" value="" class="sr-only peer" checked={$__wordTransliterationEnabled} on:click={(event) => updateSettings({ type: 'wordTransliterationEnabled', value: event.target.checked })} />
						<div
							class="relative w-14 h-7 bg-{window.websiteColors[1].primaryDark} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-{window.websiteColors[1]
								.primaryDark} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-{window.websiteColors[1].backgroundMain} after:bg-{window.websiteColors[1].hoverBorder} after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:bg-{window
								.websiteColors[1].hoverBorder} peer-checked:bg-blue-600"
						></div>
					</label>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Toggle the word transliteration which is shown below the Arabic word.</p>
			</div>
		</div>
	</div>

	<!-- font-settings-block -->
	<div id="font-settings-block" class="py-5 border-t-2">
		<h3 class="block mb-2 font-medium text-xl text-{window.websiteColors[1].textMain}">Font</h3>

		<div class="flex flex-col flex-wrap text-base">
			<!-- quran-font-setting -->
			<div id="quran-font-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<label for="quran-font-list" class="block text-{window.websiteColors[1].textMain}">Quran Font</label>
					<select id="quran-font-list" on:change={(event) => updateSettings({ type: 'wordType', value: +event.target.value })} bind:value={$__wordType} class={selectorClasses}>
						{#each Object.entries(selectableFontTypes) as [id, font]}
							<option value={font.id}>{font.font}</option>
						{/each}
					</select>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Multiple Quranic fonts to choose from depending on your Mushaf or region preference.</p>

				<!-- note for Uthmanic Hafs Mushaf -->
				{#if $__wordType === 2}
					<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}"><b>Note:</b> The Uthmanic Hafs Mushaf font type is still under development and may contain errors and we are aware of them. In case you find any issues, please use a different font type.</p>
				{/if}
			</div>

			<div class="border-b"></div>

			<!-- tajweed-toggle-setting -->
			<div id="tajweed-toggle-setting" class="{settingsBlockClasses} {$__wordType !== 2 && disabledElement}">
				<div class="flex flex-row justify-between items-center">
					<span class="block text-{window.websiteColors[1].textMain}">Colored Fonts</span>

					<label class="inline-flex items-center cursor-pointer">
						<input type="checkbox" value="" class="sr-only peer" checked={$__tajweedEnabled} on:click={(event) => updateSettings({ type: 'tajweedEnabled', value: event.target.checked })} />
						<div
							class="relative w-14 h-7 bg-{window.websiteColors[1].primaryDark} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-{window.websiteColors[1]
								.primaryDark} peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-{window.websiteColors[1].backgroundMain} after:bg-{window.websiteColors[1].hoverBorder} after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:bg-{window
								.websiteColors[1].hoverBorder} peer-checked:bg-blue-600"
						></div>
					</label>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Switch between the colored fonts with Tajweed rulings or the normal black & white.</p>
			</div>

			<div class="border-b"></div>

			<!-- arabic-word-size-setting -->
			<div id="arabic-word-size-setting" class="{settingsBlockClasses} {$__currentPage === 'page' && disabledElement}">
				<div class="flex flex-row justify-between items-center">
					<span class="block text-{window.websiteColors[1].textMain}">Arabic Word Size ({fontSizeCodes.arabicText.split('-')[1]})</span>
					<div class="inline-flex rounded-md shadow-sm" role="group">
						<button
							type="button"
							on:click={() => updateSettings({ type: 'arabicText', action: 'increase' })}
							class="w-16 border px-6 bg-{window.websiteColors[1].primaryNormal} text-{window.websiteColors[1].textMain} rounded-l-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-{window.websiteColors[1].primaryDark} dark:border-slate-700 dark:placeholder-gray-{window.websiteColors[1].textMain}"
						>
							<svg class="w-3 h-3 text-{window.websiteColors[1].textMain}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
							</svg>
						</button>
						<button
							type="button"
							on:click={() => updateSettings({ type: 'arabicText', action: 'decrease' })}
							class="w-16 border px-6 text-center bg-{window.websiteColors[1].primaryNormal} text-{window.websiteColors[1].textMain} rounded-r-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-{window.websiteColors[1].primaryDark} dark:border-slate-700 dark:placeholder-gray-{window.websiteColors[1].textMain}"
						>
							<svg class="w-3 h-3 text-{window.websiteColors[1].textMain}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
							</svg>
						</button>
					</div>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Font size for Arabic word text.</p>
			</div>

			<div class="border-b"></div>

			<!-- word-translation-size-setting -->
			<div id="word-translation-size-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<span class="block text-{window.websiteColors[1].textMain}">Word Tr/Tl Size ({fontSizeCodes.wordTranslationText.split('-')[1]})</span>
					<div class="inline-flex rounded-md shadow-sm" role="group">
						<button
							type="button"
							on:click={() => updateSettings({ type: 'wordTranslationText', action: 'increase' })}
							class="w-16 border px-6 bg-{window.websiteColors[1].primaryNormal} text-{window.websiteColors[1].textMain} rounded-l-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-{window.websiteColors[1].primaryDark} dark:border-slate-700 dark:placeholder-gray-{window.websiteColors[1].textMain}"
						>
							<svg class="w-3 h-3 text-{window.websiteColors[1].textMain}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
							</svg>
						</button>
						<button
							type="button"
							on:click={() => updateSettings({ type: 'wordTranslationText', action: 'decrease' })}
							class="w-16 border px-6 text-center bg-{window.websiteColors[1].primaryNormal} text-{window.websiteColors[1].textMain} rounded-r-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-{window.websiteColors[1].primaryDark} dark:border-slate-700 dark:placeholder-gray-{window.websiteColors[1].textMain}"
						>
							<svg class="w-3 h-3 text-{window.websiteColors[1].textMain}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
							</svg>
						</button>
					</div>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Font size for word translation and transliteration.</p>
			</div>

			<div class="border-b"></div>

			<!-- verse-translation-size-setting -->
			<div id="verse-translation-size-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<span class="block text-{window.websiteColors[1].textMain}">Verse Tr/Tl Size ({fontSizeCodes.verseTranslationText.split('-')[1]})</span>
					<div class="inline-flex rounded-md shadow-sm" role="group">
						<button
							type="button"
							on:click={() => updateSettings({ type: 'verseTranslationText', action: 'increase' })}
							class="w-16 border px-6 bg-{window.websiteColors[1].primaryNormal} text-{window.websiteColors[1].textMain} rounded-l-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-{window.websiteColors[1].primaryDark} dark:border-slate-700 dark:placeholder-gray-{window.websiteColors[1].textMain}"
						>
							<svg class="w-3 h-3 text-{window.websiteColors[1].textMain}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
							</svg>
						</button>
						<button
							type="button"
							on:click={() => updateSettings({ type: 'verseTranslationText', action: 'decrease' })}
							class="w-16 border px-6 text-center bg-{window.websiteColors[1].primaryNormal} text-{window.websiteColors[1].textMain} rounded-r-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-{window.websiteColors[1].primaryDark} dark:border-slate-700 dark:placeholder-gray-{window.websiteColors[1].textMain}"
						>
							<svg class="w-3 h-3 text-{window.websiteColors[1].textMain}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
							</svg>
						</button>
					</div>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Font size for verse translation and transliteration.</p>
			</div>
		</div>
	</div>

	<!-- translation-settings-block -->
	<div id="translation-settings-block" class="py-5 border-t-2">
		<h3 class="block mb-2 font-medium text-xl text-{window.websiteColors[1].textMain}">Translation</h3>

		<div class="flex flex-col flex-wrap text-base">
			<!-- word-translation-setting -->
			<div id="word-translation-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<label for="word-translations-list" class="block text-{window.websiteColors[1].textMain}">Word</label>
					<select id="word-translations-list" bind:value={$__wordTranslation} on:change={(event) => updateSettings({ type: 'wordTranslation', value: +event.target.value })} class={selectorClasses}>
						{#each Object.entries(selectableWordTranslations) as [id, translation]}
							<option value={translation.id}>{translation.language}</option>
						{/each}
					</select>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Word translation which will be displaced under the Arabic word text.</p>
			</div>

			<div class="border-b"></div>

			<!-- verse-translation-setting -->
			<div id="verse-translation-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<label for="verse-translations-list" class="block text-{window.websiteColors[1].textMain}">Verse</label>
					<button id="dropdownCheckboxButton" data-dropdown-toggle="verse-translation-checkbox" class={selectorClasses} type="button">
						{$__verseTranslations.length} selected
					</button>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Verse translations from multiple authors and languages.</p>

				<!-- verse-translation dropdown menu -->
				<div id="verse-translation-checkbox" class="z-10 hidden w-fit bg-{window.websiteColors[1].primaryNormal} shadow-md rounded-3xl border">
					<ul id="verse-translations-list" class="max-h-56 overflow-y-scroll p-3 space-y-4 text-sm text-{window.websiteColors[1].textMain}" aria-labelledby="dropdownCheckboxButton">
						{#each Object.entries(verseTranslationsLanguages) as [id, language]}
							<div class="space-y-2">
								<div id="translation-name" class="text-sm font-medium">{language.language}</div>
								<div id="translation-list" class="space-y-2">
									{#each Object.values(selectableVerseTranslations) as translation}
										{#if translation.language === language.language}
											<li>
												<div class="flex items-center">
													<!-- using else-if block to add the "checked" attribute because for some reason the inline check is not working in Svelte as compared to regular javascript -->
													{#if $__verseTranslations.includes(translation.id)}
														<input id="verseTranslationCheckbox-{translation.id}" on:click={() => updateSettings({ type: 'verseTranslation', value: translation.id })} checked type="checkbox" class="w-4 h-4 text-blue-600 bg-{window.websiteColors[1].primaryDark} bg-{window.websiteColors[1].hoverBorder} rounded focus:ring-blue-500" />
													{:else}
														<input id="verseTranslationCheckbox-{translation.id}" on:click={() => updateSettings({ type: 'verseTranslation', value: translation.id })} type="checkbox" class="w-4 h-4 text-blue-600 bg-{window.websiteColors[1].primaryDark} bg-{window.websiteColors[1].hoverBorder} rounded focus:ring-blue-500" />
													{/if}
													<label for="verseTranslationCheckbox-{translation.id}" class="ml-2 text-sm text-{window.websiteColors[1].textMain}">{translation.author}</label>
												</div>
											</li>
										{/if}
									{/each}
								</div>
							</div>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- audio-settings-block -->
	<div id="audio-settings-block" class="py-5 border-t-2">
		<h3 class="block mb-2 font-medium text-xl text-{window.websiteColors[1].textMain}">Audio</h3>

		<div class="flex flex-col flex-wrap text-base">
			<!-- verse-reciter-setting -->
			<div id="verse-reciter-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<label for="reciter-list" class="block text-{window.websiteColors[1].textMain}">Verse Reciter</label>
					<select id="reciter-list" bind:value={$__reciter} on:change={(event) => updateSettings({ type: 'reciter', value: +event.target.selectedIndex + 1 })} class={selectorClasses}>
						{#each Object.entries(selectableReciters) as [id, reciter]}
							<option value={reciter.id}>{reciter.reciter}</option>
						{/each}
					</select>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Desired reciter whose audio will be played when you choose to listen to a verse.</p>
			</div>

			<div class="border-b"></div>

			<!-- playback-speed-setting -->
			<div id="playback-speed-setting" class={settingsBlockClasses}>
				<div class="flex flex-row justify-between items-center">
					<label for="speed-list" class="block text-{window.websiteColors[1].textMain}">Playback Speed</label>
					<select id="speed-list" bind:value={$__playbackSpeed} on:change={(event) => updateSettings({ type: 'playbackSpeed', value: +event.target.selectedIndex + 1 })} class={selectorClasses}>
						{#each Object.entries(selectablePlaybackSpeeds) as [id, speed]}
							<option value={speed.id}>x{speed.speed}</option>
						{/each}
					</select>
				</div>
				<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">The playback speed at which the verse/word audio will be played.</p>
			</div>
		</div>
	</div>

	<!-- reset settings button -->
	<div class="flex flex-col justify-center border-t py-6 space-y-4">
		<button on:click={() => resetSettings()} class="text-sm {buttonElement}">Reset Settings</button>
		<p class="mb-6 text-sm text-{window.websiteColors[1].textMain}">Resetting the options will not affect your bookmarks or last read location.</p>
	</div>
</div>
