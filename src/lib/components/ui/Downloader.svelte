<script lang="ts">
	import { download } from '$lib/downloads';
	import { open } from '@tauri-apps/api/dialog';
	import { fade } from 'svelte/transition';
	import MaterialSymbolsDownload from '~icons/material-symbols/download';
	import { Button } from './button';

	export let video: YouTube.Video;

	$: audioFormat = video.formats
		.filter(
			(format) =>
				format.protocol === 'https' && format.ext === 'm4a' && !format.vcodec && format.abr
		)
		.sort((a, b) => b.abr! - a.abr!)[0];
	$: formats = Array.from(
		video.formats
			.filter((format) => format.protocol === 'https' && format.ext === 'mp4' && !format.acodec)
			.reduce((a, b) => {
				const quality = b.format_note!;
				const c = a.get(quality);
				if (!c || c.filesize! > b.filesize!) {
					a.set(quality, b);
				}
				return a;
			}, new Map<string, YouTube.Format>())
			.values()
	).sort((a, b) => b.filesize! - a.filesize!);
	const down = async (videoFormat?: YouTube.Format) => {
		const f = await open({ multiple: false, directory: true });
		if (f) {
			const folder = f as string;
			download(folder, video, audioFormat, videoFormat);
		}
	};
</script>

<div class="p-4" transition:fade>
	<h4 class="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">Downloads</h4>
	<div class="space-x-2 space-y-2">
		{#each formats as format}
			<Button variant="secondary" on:click={() => down(format)}>
				<MaterialSymbolsDownload class="mr-2 h-4 w-4" />
				{format.format_note}
			</Button>
		{/each}
		<div>
			<Button variant="outline" on:click={() => down()}>
				<MaterialSymbolsDownload class="mr-2 h-4 w-4" />
				Audio only
			</Button>
		</div>
	</div>
	<h4 class="mt-4 text-xl font-semibold tracking-tight">{video.title}</h4>
	<img src={video.thumbnail} alt="thumbnail" class="rounded-md" />
</div>
