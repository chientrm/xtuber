<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import icon from '$lib/icon.png';
	import { onMount } from 'svelte';
	import IcBaselineLaunch from '~icons/ic/baseline-launch';
	import { listen } from '@tauri-apps/api/event';
	import '../app.pcss';

	onMount(() => {
		const unlisten = listen<string >('download_progress', ({ payload }) => {
			updateProgress(payload )
		});
		return () => unlisten.then((f) => f());
	});
</script>

<div class="p-4">
	<Button variant="ghost" href="/">
		<img src={icon} alt="" class="h-8 w-8" /> XTuber
	</Button>
	<slot />
	<div>
		&copy; 2024 <Button variant="link" href="https://github.com/chientrm/xtuber" target="_blank">
			Github
			<IcBaselineLaunch class="ml-2 h-4 w-4" />
		</Button>
	</div>
</div>
