<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import icon from '$lib/icon.png';
	import MdiEmailNewsletter from '~icons/mdi/email-newsletter';
	import RiTwitterXFill from '~icons/ri/twitter-x-fill';
	import BxDonateBlood from '~icons/bx/donate-blood';
	import '../app.pcss';
</script>

<div class="p-4">
	<div class="mb-2 flex flex-row">
		<Button variant="ghost" href="/">
			<img src={icon} alt="" class="mr-2 h-8 w-8" /> XTuber
		</Button>
		<div class="grow" />
		<Button variant="outline" href="https://x.com/realchientrm" target="_blank">
			<RiTwitterXFill class="h-4 w-4" />
		</Button>
		<Button variant="outline" href="https://chientrm.com" target="_blank" class="ml-2">
			<MdiEmailNewsletter class="h-4 w-4" />
		</Button>
		<Button
			variant="outline"
			href="https://www.buymeacoffee.com/chientrm"
			target="_blank"
			class="ml-2"
		>
			<BxDonateBlood class="mr-2 h-4 w-4" />
			Donate
		</Button>
	</div>
	<slot />
</div>
