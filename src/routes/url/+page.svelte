<script lang="ts">
	import { page } from '$app/stores';
	import Format from '$lib/components/ui/Format.svelte';
	import * as Table from '$lib/components/ui/table';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import MaterialSymbolsRefresh from '~icons/material-symbols/refresh';

	export let data;
	$: ytdlp = data.ytdlp;
	let invoking: Promise<YouTube.Video>;

	onMount(() => {
		const id = $page.url.searchParams.get('v')!;
		invoking = invoke<YouTube.Video>('get_info', { ytdlp, id });
	});
</script>

{#await invoking}
	<div class="flex justify-center" transition:slide>
		<MaterialSymbolsRefresh class="h-8 w-8 animate-spin" />
	</div>
{:then video}
	{#if video}
		<Table.Root>
			<Table.Caption>{video.title}.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Mimetype</Table.Head>
					<Table.Head>File size</Table.Head>
					<Table.Head>Video</Table.Head>
					<Table.Head>Audio</Table.Head>
					<Table.Head class="text-right">Download</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each video.formats as format}
					<Format id={video.id} {format} {ytdlp} />
				{/each}
			</Table.Body>
		</Table.Root>
	{/if}
{:catch e}
	<div class="text-red-400">{e}</div>
{/await}
