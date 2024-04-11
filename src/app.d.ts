import 'unplugin-icons/types/svelte';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace YouTube {
		interface Video {
			abr: number;
			acodec: Acodec;
			age_limit: number;
			album: null;
			album_artist: null;
			album_type: null;
			alt_title: null;
			artist: null;
			asr: number;
			automatic_captions: { [key: string]: AutomaticCaption[] };
			average_rating: null;
			categories: string[];
			channel: string;
			channel_id: string;
			channel_url: string;
			chapter: null;
			chapter_id: null;
			chapter_number: null;
			chapters: Chapter[];
			comment_count: number;
			comments: null;
			container: null;
			creator: null;
			description: string;
			disc_number: null;
			dislike_count: null;
			display_id: string;
			downloader_options: null;
			duration: number;
			duration_string: string;
			end_time: null;
			episode: null;
			episode_id: null;
			episode_number: null;
			epoch: number;
			ext: VideoEXT;
			extractor: string;
			extractor_key: string;
			filesize: null;
			filesize_approx: number;
			format: string;
			format_id: string;
			format_note: string;
			formats: Format[];
			fps: number;
			fragment_base_url: null;
			fragments: null;
			genre: null;
			heatmap: null;
			height: number;
			http_headers: null;
			id: string;
			is_live: boolean;
			language: Language;
			language_preference: null;
			license: string;
			like_count: number;
			location: null;
			manifest_url: null;
			no_resume: null;
			player_url: null;
			playlist: null;
			playlist_id: null;
			playlist_index: null;
			playlist_title: null;
			playlist_uploader: null;
			playlist_uploader_id: null;
			preference: null;
			protocol: string;
			quality: null;
			release_date: null;
			release_year: null;
			repost_count: null;
			requested_subtitles: null;
			resolution: string;
			season: null;
			season_id: null;
			season_number: null;
			series: null;
			source_preference: null;
			start_time: null;
			stretched_ratio: null;
			subtitles: Subtitles;
			tags: string[];
			tbr: number;
			thumbnail: string;
			thumbnails: Thumbnail[];
			timestamp: null;
			title: string;
			track: null;
			track_id: null;
			track_number: null;
			upload_date: string;
			uploader: string;
			uploader_id: string;
			uploader_url: string;
			url: null;
			vbr: number;
			vcodec: string;
			view_count: number;
			webpage_url: string;
			width: number;
		}

		enum Acodec {
			Mp4A402 = 'mp4a.40.2',
			Mp4A405 = 'mp4a.40.5',
			Opus = 'opus'
		}

		interface AutomaticCaption {
			data: null;
			ext: AutomaticCaptionEXT;
			url: string;
		}

		enum AutomaticCaptionEXT {
			Json3 = 'json3',
			Srv1 = 'srv1',
			Srv2 = 'srv2',
			Srv3 = 'srv3',
			Ttml = 'ttml',
			Vtt = 'vtt'
		}

		interface Chapter {
			end_time: number;
			start_time: number;
			title: string;
		}

		enum VideoEXT {
			M4A = 'm4a',
			Mhtml = 'mhtml',
			Mp4 = 'mp4',
			Webm = 'webm'
		}

		interface Format {
			abr: number | null;
			acodec: Acodec | null;
			asr: number | null;
			container: Container | null;
			downloader_options: DownloaderOptions | null;
			ext: VideoEXT;
			filesize: number | null;
			filesize_approx: number | null;
			format: string;
			format_id: string;
			format_note: null | string;
			fps: number | null;
			fragment_base_url: null;
			fragments: Fragment[] | null;
			height: number | null;
			http_headers: HTTPHeaders;
			language: Language | null;
			language_preference: number | null;
			manifest_url: null | string;
			no_resume: null;
			player_url: null;
			preference: null;
			protocol: Protocol;
			quality: number | null;
			resolution: string;
			source_preference: number | null;
			stretched_ratio: null;
			tbr: number | null;
			url: string;
			vbr: number | null;
			vcodec: null | string;
			width: number | null;
		}

		enum Container {
			M4ADash = 'm4a_dash',
			Mp4Dash = 'mp4_dash',
			WebmDash = 'webm_dash'
		}

		interface DownloaderOptions {
			http_chunk_size: number;
		}

		interface Fragment {
			duration: number;
			filesize: null;
			path: null;
			url: string;
		}

		interface HTTPHeaders {
			Accept: Accept;
			'Accept-Language': AcceptLanguage;
			'Sec-Fetch-Mode': SECFetchMode;
			'User-Agent': string;
		}

		enum Accept {
			TextHTMLApplicationXHTMLXMLApplicationXMLQ09Q08 = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
		}

		enum AcceptLanguage {
			EnUsEnQ05 = 'en-us,en;q=0.5'
		}

		enum SECFetchMode {
			Navigate = 'navigate'
		}

		enum Language {
			Vi = 'vi'
		}

		enum Protocol {
			HTTPS = 'https',
			M3U8Native = 'm3u8_native',
			Mhtml = 'mhtml'
		}

		interface Subtitles {}

		interface Thumbnail {
			filesize: null;
			height: number | null;
			id: string;
			preference: number;
			url: string;
			width: number | null;
		}
	}
}

export {};
