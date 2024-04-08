<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';

	let url = '';
	let loading = false;
	let result = '';
	let error = '';

	const download = async () => {
		loading = true;
		error = '';
		try {
			await invoke('download', { url });
		} catch (e: any) {
			error = e;
		}
		loading = false;
	};
</script>

<h1>XTuber</h1>
<p>Simple YouTube Downloader</p>

<div>
	<label>
		URL:
		<input name="url" placeholder="https://youtube.com/..." bind:value={url} disabled={loading} />
		<button on:click={download} disabled={loading}>
			{#if loading}
				Processing...
			{:else}
				Download
			{/if}
		</button>
	</label>
</div>

{#if error}
	<span style="color: red">{error}</span>
{/if}

<span>{result}</span>
<br />
&copy; 2024 <a href="https://chientrm.com" target="_blank">chientrm.com</a>

<style>
	h1,
	p,
	div,
	span {
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
	}
</style>
