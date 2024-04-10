<script>
	import { Button } from '$lib/components/ui/button';
	import icon from '$lib/icon.png';
	import IcBaselineLaunch from '~icons/ic/baseline-launch';
	import '../app.pcss';
</script>

<div class="p-4">
	<div class="mb-4 flex flex-row items-center">
		<img src={icon} alt="" class="h-8 w-8" /> XTuber
	</div>
	<slot />
	<div>
		&copy; 2024 <Button variant="link" href="https://github.com/chientrm/xtuber" target="_blank">
			Github
			<IcBaselineLaunch class="ml-2 h-4 w-4" />
		</Button>
	</div>
</div>
