import { goto } from '$app/navigation';
import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/tauri';
import { toast } from 'svelte-sonner';
import { writable } from 'svelte/store';

let index = 0;

interface Download {
	video: YouTube.Video;
	videoFormat?: YouTube.Format;
	downloaded: boolean;
	folder: string;
	payload?: string;
}

export const downloads = writable<Download[]>([]);

const unlistenFns: UnlistenFn[] = [];

export const download = async (
	folder: string,
	video: YouTube.Video,
	videoFormat?: YouTube.Format
) => {
	const download: Download = {
		video,
		videoFormat,
		downloaded: false,
		folder
	};
	downloads.update((items) => [download, ...items]);
	const { id } = video;
	const fid = videoFormat?.format_id
		? `${videoFormat.format_id}+bestaudio[ext=m4a]`
		: 'bestaudio[ext=m4a]';
	toast.info(`${video.title} downloading`, {
		action: { label: 'See downloads', onClick: () => goto('/') }
	});
	const key = index.toString();
	const unlistenFn = await listen<string>(key, ({ payload }) => {
		if (payload === 'done') {
			download.downloaded = true;
			downloads.update((items) => items);
			toast.success(`${video.title} downloaded`, {
				action: { label: 'Open folder', onClick: () => invoke('open_dir', { folder }) }
			});
		} else {
			download.payload = payload;
			downloads.update((items) => items);
		}
	});
	await invoke<string>('download', { id, fid, folder, key });
	index++;
	unlistenFns.push(unlistenFn);
};

export const stopListen = () => unlistenFns.map((f) => f());
