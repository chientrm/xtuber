<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	let value = '';
	const load = () => {
		const tmp = value.trim();
		const id = tmp.startsWith('https://youtube.com/watch?v=')
			? tmp.replaceAll('https://youtube.com/watch?v=', '')
			: tmp;
		if (id.length) {
			goto(`/url?v=${id}`);
		}
	};
</script>

<Card.Root class="max-w-[480px]">
	<Card.Header>
		<Card.Title>Download</Card.Title>
		<Card.Description>Simple YouTube Downloader.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Label for="url">Url</Label>
		<Input id="url" placeholder="https://youtube.com/..." bind:value />
	</Card.Content>
	<Card.Footer class="justify-end">
		<Button on:click={load}>Load</Button>
	</Card.Footer>
</Card.Root>
