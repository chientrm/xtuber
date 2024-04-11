<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { open } from '@tauri-apps/api/dialog';
	import { invoke } from '@tauri-apps/api/tauri';
	import MaterialSymbolsDownload from '~icons/material-symbols/download';
	import MaterialSymbolsRefresh from '~icons/material-symbols/refresh';

	export let id: string;
	export let format: YouTube.Format;

	let folder: string | string[] | null = null;
	let status: 'idle' | 'downloading' | 'downloaded' = 'idle';

	const download = async () => {
		folder = await open({ multiple: false, directory: true });
		if (folder) {
			status = 'downloading';
			const fid = format.format_id;
			invoke('download', { id, fid, folder }).then(() => {
				status = 'downloaded';
			});
		}
	};
</script>

<Table.Row>
	<Table.Cell class="font-medium">{format.ext}</Table.Cell>
	<Table.Cell>
		{format.filesize ?? 0} bytes
	</Table.Cell>
	<Table.Cell>
		{format.resolution}
	</Table.Cell>
	<Table.Cell>
		{Math.floor(format.tbr ?? 0)} kbps
	</Table.Cell>
	<Table.Cell class="text-right">
		{#if status === 'idle'}
			<Button variant="secondary" on:click={download}>
				<MaterialSymbolsDownload class="mr-2 h-4 w-4" />
				Download
			</Button>
		{:else if status === 'downloading'}
			<Button variant="secondary" disabled>
				<MaterialSymbolsRefresh class="mr-2 h-4 w-4 animate-spin" />
				Downloading...
			</Button>
		{:else}
			<Button on:click={() => invoke('open_dir', { folder })}>
				<MaterialSymbolsDownload class="mr-2 h-4 w-4" />
				Open
			</Button>
		{/if}
	</Table.Cell>
</Table.Row>
