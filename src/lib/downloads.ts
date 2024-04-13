import { invoke } from '@tauri-apps/api/tauri';
import { writable } from 'svelte/store';

interface Download {
	video: YouTube.Video;
	audioFormat: YouTube.Format;
	videoFormat?: YouTube.Format;
	downloaded: boolean;
	folder: string;
}

export const downloads = writable<Download[]>([]);

export const download = async (
	folder: string,
	video: YouTube.Video,
	audioFormat: YouTube.Format,
	videoFormat?: YouTube.Format
) => {
	const download: Download = {
		video,
		audioFormat,
		videoFormat,
		downloaded: false,
		folder
	};
	downloads.update((items) => [...items, download]);
	const { id } = video;
	const fid = videoFormat?.format_id
		? `${audioFormat.format_id}+${videoFormat.format_id}`
		: audioFormat.format_id;
	await invoke<string>('download', { id, fid, folder });
	download.downloaded = true;
	downloads.update((items) => items);
};
