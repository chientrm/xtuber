<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { save } from '@tauri-apps/api/dialog';
	import { listen } from '@tauri-apps/api/event';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onMount } from 'svelte';
	import MaterialSymbolsDownload from '~icons/material-symbols/download';

	export let videoId: string;
	export let format: YouTube.Format;
	export let index: number;

	let status: 'Idle' | 'Downloading' | 'Downloaded' = 'Idle';
	let progress = 0;
	let path: string | null = null;

	async function download() {
		const mime = format.mimeType;
		const ext = mime.includes('/mp4') ? 'mp4' : mime.includes('/webm') ? 'webm' : '';
		path = await save({ filters: [{ name: 'Media', extensions: [ext] }] });
		if (path) {
			status = 'Downloading';
			invoke('download', { id: videoId, index, path });
		}
	}

	function open() {
		invoke('open', { path });
	}

	onMount(() => {
		const promise = listen(`progress-${videoId}-${index}`, ({ payload }) => {
			if (payload === 'downloaded') {
				status = 'Downloaded';
			} else {
				progress = payload as number;
			}
		});
		return () => promise.then((unlisten) => unlisten());
	});
</script>

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
		{#if status === 'Downloaded'}
			<Button on:click={open}>Open</Button>
		{:else if status === 'Downloading'}
			Downloading: {progress}%
		{:else}
			<Button variant="secondary" on:click={download}>
				<MaterialSymbolsDownload class="mr-2 h-4 w-4" />
				Download
			</Button>
		{/if}
	</Table.Cell>
</Table.Row>
