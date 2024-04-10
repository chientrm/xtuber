<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { download } from '$lib/youtube';
	import { save } from '@tauri-apps/api/dialog';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onMount } from 'svelte';
	import MaterialSymbolsDownload from '~icons/material-symbols/download';
	import MaterialSymbolsRefresh from '~icons/material-symbols/refresh';

	let invoking: Promise<YouTube.Video>;

	onMount(() => {
		const id = $page.url.searchParams.get('v')!;
		invoking = invoke<YouTube.Video>('load', { id });
	});
</script>

{#await invoking}
	<MaterialSymbolsRefresh class="mr-2 h-4 w-4 animate-spin" />
{:then video}
	{#if video}
		<Table.Root>
			<Table.Caption>{video.videoDetails.title}.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[200px]">Mimetype</Table.Head>
					<Table.Head>Video</Table.Head>
					<Table.Head>Audio</Table.Head>
					<Table.Head class="text-right">Download</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each video.formats as format, i}
					<Table.Row>
						<Table.Cell class="font-medium">{format.mimeType}</Table.Cell>
						<Table.Cell>
							{#if format.hasVideo}
								{format.width} x {format.height}
							{:else}
								None
							{/if}
						</Table.Cell>
						<Table.Cell>
							{#if format.hasAudio}
								{format.audioQuality}
							{:else}
								None
							{/if}
						</Table.Cell>
						<Table.Cell class="text-right">
							<Button
								variant="secondary"
								on:click={() => download(video.videoDetails.videoId, i, format)}
							>
								<MaterialSymbolsDownload class="mr-2 h-4 w-4" />
								Download
							</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
{:catch e}
	<div class="text-red-400">{e}</div>
{/await}
