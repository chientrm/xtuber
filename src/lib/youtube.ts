import { save } from '@tauri-apps/api/dialog';
import { invoke } from '@tauri-apps/api/tauri';
import { writable } from 'svelte/store';

interface Download {
	index: number;
	path: string;
	format: YouTube.Format;
	progress?: number;
}

export const downloads = writable(new Map<string, Download>());
export const updateProgress = (payload: string ) => {
	const {} = JSON.parse(payload)
	const key = `${id}-${index}`; 
	downloads.update((items) => {
		items.set(key, { ...items.get(key)!, progress });
		return items;
	});
};

export const download = async (id: string, index: number, format: YouTube.Format) => {
	const mime = format.mimeType;
	const ext = mime.includes('/mp4') ? 'mp4' : mime.includes('/webm') ? 'webm' : '';
	const path = await save({ filters: [{ name: 'Media', extensions: [ext] }] });
	if (path) {
		downloads.update((items) => {
			const key = `${id}-${index}`;
			items.set(key, { index, path, format });
			return items;
		});
		invoke('download_file', { id, index, path });
	}
};
