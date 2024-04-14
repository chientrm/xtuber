<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { downloads } from '$lib/downloads';
	import MaterialSymbolsRefresh from '~icons/material-symbols/refresh';
	import { invoke } from '@tauri-apps/api/tauri';
</script>

<Table.Root>
	<Table.Caption>Downloads.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Thumbnail</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head>Quality</Table.Head>
			<Table.Head class="text-right">Download</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each $downloads as { video, videoFormat, downloaded, folder, payload }}
			<Table.Row>
				<Table.Cell>
					<img src={video.thumbnail} class="h-16 w-16 object-contain" alt="Thumbnail" />
				</Table.Cell>
				<Table.Cell>
					{video.title}
					<br />
					{payload}
				</Table.Cell>
				<Table.Cell>
					{#if videoFormat}
						{videoFormat.format_note}
					{:else}
						Audio only
					{/if}
				</Table.Cell>
				<Table.Cell class="text-right">
					{#if downloaded}
						<Button variant="secondary" on:click={() => invoke('open_dir', { folder })}>
							Open folder
						</Button>
					{:else}
						<Button variant="secondary" disabled>
							<MaterialSymbolsRefresh class="mr-2 h-4 w-4 animate-spin" />
							Downloading...
						</Button>
					{/if}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
