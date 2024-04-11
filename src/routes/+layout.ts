import { invoke } from '@tauri-apps/api/tauri';

export const prerender = true;
export const ssr = false;

export const load = () => invoke<string>('setup').then((ytdlp) => ({ ytdlp }));
