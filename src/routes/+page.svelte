<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import MdiGithub from '~icons/mdi/github';
	import RiTwitterXFill from '~icons/ri/twitter-x-fill';
</script>

<Card.Root class="m-4 max-w-[480px]">
	<Card.Header>
		<Card.Title>XTuber</Card.Title>
		<Card.Description>Simple YouTube Downloader.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Button variant="secondary" href="https://x.com/realchientrm" target="_blank">
			<span>Profile</span>
			<RiTwitterXFill class="ml-2 h-4 w-4" />
		</Button>
		<Button variant="secondary" href="https://github.com/chientrm/xtuber" target="_blank">
			<span>GitHub</span>
			<MdiGithub class="ml-2 h-4 w-4" />
		</Button>
	</Card.Content>
	<Card.Footer class="justify-end"></Card.Footer>
</Card.Root>
