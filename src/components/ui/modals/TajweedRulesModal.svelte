<script>
	import { toggleModal } from '$utils/toggleModal';
	import { buttonElement, linkElement } from '$data/commonStyles';
	import { tajweedRulings } from '$data/quranMeta';
	import { __websiteTheme } from '$utils/stores';
</script>

<!-- Main modal -->
<div id="tajweed-rules-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
	<div class="relative w-full max-w-2xl max-h-full sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
		<!-- Modal content -->
		<div class="max-h-full overflow-hidden flex flex-col bg-{window.websiteColors[1].backgroundColorMain} rounded-3xl shadow dark:bg-{window.websiteColors[1].hoverBackgroundColor}">
			<!-- Modal header -->
			<div class="flex items-start justify-between p-4 border-b rounded-t dark:bg-{window.websiteColors[1].hoverBorderColor}">
				<h3 class="text-xl font-semibold text-{window.websiteColors[1].textColorMain} theme-grayscale">Tajweed Rules</h3>
				<button id="tajweed-modal-close-button" on:click={() => toggleModal('tajweed-rules-modal', 'hide')} type="button" class="text-{window.websiteColors[1].textColorMain} bg-transparent hover:bg-{window.websiteColors[1].buttonBackgroundColor} hover:text-{window.websiteColors[1].textColorMain} rounded-3xl text-sm w-8 h-8 ml-auto inline-flex justify-center items-center theme-grayscale">
					<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
					</svg>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<div class="p-6 space-y-6 overflow-y-auto">
				<p>The Tajweed rules allows the reciter to emphasize the accent, phonetics, rhythm and temper of the Quranic recitation. To get more information on Tajweed and importance of it <a href="https://www.getquranic.com/a-quick-guide-to-tajweed/" target="_blank" class={linkElement}>click here.</a></p>

				<div>
					<table class="w-full text-sm text-left rtl:text-right text-{window.websiteColors[1].textColorMain} dark:text-{window.websiteColors[1].textColorMain}">
						<thead class="text-xs text-{window.websiteColors[1].textColorMain} uppercase bg-{window.websiteColors[1].hoverBackgroundColor} theme-grayscale">
							<tr>
								<th scope="col" class="px-6 py-3"> Rule/Icon </th>
								<th scope="col" class="px-6 py-3"> Description </th>
							</tr>
						</thead>
						<tbody>
							{#each Object.entries(tajweedRulings) as [id, ruling]}
								<tr class="bg-{window.websiteColors[1].backgroundColorMain} border-b dark:bg-{window.websiteColors[1].hoverBackgroundColor} dark:bg-{window.websiteColors[1].hoverBorderColor} hover:bg-{window.websiteColors[1].hoverBackgroundColor} dark:hover:bg-{window.websiteColors[1].hoverBackgroundColor}">
									<td class="px-6 py-4 tajweed-rules text-2xl theme-palette-tajweed font-filter"> {ruling.code} </td>
									<td class="px-6 py-4 theme-grayscale"> {ruling.description} </td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<!-- Modal footer -->
			<div class="flex justify-end p-6 space-x-2 border-t bg-{window.websiteColors[1].hoverBorderColor} rounded-b dark:bg-{window.websiteColors[1].hoverBorderColor}">
				<button on:click={() => toggleModal('tajweed-rules-modal', 'hide')} type="button" class={buttonElement}>Close</button>
			</div>
		</div>
	</div>
</div>
