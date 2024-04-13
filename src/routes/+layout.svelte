<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import icon from '$lib/icon.png';
	import BxDonateBlood from '~icons/bx/donate-blood';
	import MdiGithub from '~icons/mdi/github';
	import RiTwitterXFill from '~icons/ri/twitter-x-fill';
	import '../app.pcss';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 w-full items-center">
		<a href="/" class="mr-6 flex items-center space-x-2">
			<img src={icon} alt="icon" class="h-6 w-6" />
			<span class="font-bold">XTuber</span>
		</a>
		<div class="grow" />
		<Button variant="ghost" class="mr-2 w-9 px-0" href="https://x.com/realchientrm" target="_blank">
			<RiTwitterXFill class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">X</span>
		</Button>
		<Button
			variant="ghost"
			class="mr-2 w-9 px-0"
			href="https://github.com/chientrm/xtuber"
			target="_blank"
		>
			<MdiGithub class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">GitHub Repo</span>
		</Button>
		<Button variant="ghost" href="https://www.buymeacoffee.com/chientrm" target="_blank">
			<BxDonateBlood class="h-[1.2rem] w-[1.2rem]" />
			<span>Donate</span>
		</Button>
	</div>
</header>

<div class="p-4">
	<slot />
</div>
