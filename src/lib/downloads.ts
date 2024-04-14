import { goto } from '$app/navigation';
import { invoke } from '@tauri-apps/api/tauri';
import { toast } from 'svelte-sonner';
import { writable } from 'svelte/store';

interface Download {
	video: YouTube.Video;
	videoFormat?: YouTube.Format;
	downloaded: boolean;
	folder: string;
}

export const downloads = writable<Download[]>([]);

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
	const fid = videoFormat?.format_id ? `${videoFormat.format_id}+bestaudio` : 'bestaudio';
	toast.info(`${video.title} downloading`, {
		action: { label: 'See downloads', onClick: () => goto('/') }
	});
	await invoke<string>('download', { id, fid, folder });
	download.downloaded = true;
	downloads.update((items) => items);
	toast.success(`${video.title} downloaded`, {
		action: { label: 'Open folder', onClick: () => invoke('open_dir', { folder }) }
	});
};
