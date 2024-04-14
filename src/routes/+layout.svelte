<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { downloads, stopListen } from '$lib/downloads';
	import icon from '$lib/icon.png';
	import { getVersion } from '@tauri-apps/api/app';
	import { onDestroy } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import BxDonateBlood from '~icons/bx/donate-blood';
	import MaterialSymbolsFeedback from '~icons/material-symbols/feedback';
	import '../app.pcss';
	let value = '';
	const load = () => {
		const text = value.trim();
		if (text.length) {
			const url = new URL(text);
			const v = url.searchParams.get('v');
			if (v) {
				goto(`/url?v=${v}`);
			}
		}
	};
	onDestroy(stopListen);
</script>

<Toaster richColors />

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 w-full items-center gap-2">
		<a href="/" class="mr-6 flex items-center space-x-2">
			<img src={icon} alt="icon" class="h-6 w-6" />
			<span class="font-bold">XTuber</span>
			<span class="rounded-full bg-blue-400 px-2 text-center text-xs text-white hover:bg-blue-500">
				{$downloads.length}
			</span>
		</a>
		<Input type="url" placeholder="https://youtube.com/..." class="grow" bind:value />
		<Button on:click={load}>Load</Button>
		<Button variant="ghost" href="https://www.buymeacoffee.com/chientrm" target="_blank">
			<BxDonateBlood class="h-[1.2rem] w-[1.2rem]" />
			<span>Donate</span>
		</Button>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost">
					<MaterialSymbolsFeedback class="h-[1.2rem] w-[1.2rem]" />
					<span class="sr-only">About</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item href="https://x.com/realchientrm" target="_blank">X</DropdownMenu.Item>
				<DropdownMenu.Item href="https://github.com/chientrm/xtuber" target="_blank">
					GitHub
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Version:
					{#await getVersion()}
						...
					{:then version}
						{version}
					{/await}
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

<slot />
