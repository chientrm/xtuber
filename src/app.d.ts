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
			dashManifestUrl: null;
			hlsManifestUrl: null;
			formats: Format[];
			relatedVideos: RelatedVideo[];
			videoDetails: VideoDetails;
		}

		interface Format {
			itag: number;
			mimeType: string;
			bitrate: number;
			width: number | null;
			height: number | null;
			initRange: Range | null;
			indexRange: Range | null;
			lastModified: string;
			contentLength: null | string;
			quality: Quality;
			fps: number | null;
			qualityLabel: null | string;
			projectionType: ProjectionType;
			averageBitrate: number | null;
			highReplication: boolean | null;
			audioQuality: null | string;
			colorInfo: ColorInfo | null;
			approxDurationMs: string;
			audioSampleRate: null | string;
			audioChannels: number | null;
			audioBitrate: null;
			loudnessDb: number | null;
			url: string;
			hasVideo: boolean;
			hasAudio: boolean;
			isLive: boolean;
			isHLS: boolean;
			isDashMPD: boolean;
		}

		interface ColorInfo {
			primaries: string;
			transferCharacteristics: string;
			matrixCoefficients: string;
		}

		interface Range {
			start: string;
			end: string;
		}

		enum ProjectionType {
			Rectangular = 'RECTANGULAR'
		}

		enum Quality {
			Large = 'large',
			Medium = 'medium',
			Small = 'small',
			Tiny = 'tiny'
		}

		interface RelatedVideo {
			id: string;
			url: string;
			title: string;
			published: string;
			author: Author;
			shortViewCountText: string;
			viewCount: string;
			lengthSeconds: string;
			thumbnails: Thumbnail[];
			is_live: boolean;
		}

		interface Author {
			id: string;
			name: string;
			user: string;
			channelUrl: string;
			externalChannelUrl: string;
			userUrl: string;
			thumbnails: Thumbnail[];
			verified: boolean;
			subscriberCount: number;
		}

		interface Thumbnail {
			width: number;
			height: number;
			url: string;
		}

		interface VideoDetails {
			author: Author;
			likes: number;
			dislikes: number;
			ageRestricted: boolean;
			videoUrl: string;
			storyboards: Storyboard[];
			chapters: any[];
			embed: Embed;
			title: string;
			description: string;
			lengthSeconds: string;
			ownerProfileUrl: string;
			externalChannelId: string;
			isFamilySafe: boolean;
			availableCountries: string[];
			isUnlisted: boolean;
			hasYpcMetadata: boolean;
			viewCount: string;
			category: string;
			publishDate: Date;
			ownerChannelName: string;
			uploadDate: Date;
			videoId: string;
			keywords: any[];
			channel_id: string;
			isOwnerViewing: boolean;
			isCrawlable: boolean;
			allowRatings: boolean;
			isPrivate: boolean;
			isUnpluggedCropus: boolean;
			isLiveContent: boolean;
			thumbnails: Thumbnail[];
		}

		interface Embed {
			flashSecureUrl: string;
			flashUrl: string;
			iframeUrl: string;
			height: number;
			width: number;
		}

		interface Storyboard {
			templateUrl: string;
			thumbnailWidth: number;
			thumbnailHeight: number;
			thumbnailCount: number;
			interval: number;
			columns: number;
			rows: number;
			storyboardCount: number;
		}
	}
}

export {};
