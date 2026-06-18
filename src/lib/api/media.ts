import type { StrapiMedia, MediaFormat } from './types';
import { env } from '$env/dynamic/public';

export function getMediaUrl(media: StrapiMedia | null, format?: MediaFormat): string {
	if (!media) return '';

	const baseUrl = (env.PUBLIC_STRAPI_URL || '').replace(/\/+$/, '');

	if (format && media.formats && media.formats[format]) {
		return `${baseUrl}${media.formats[format].url}`;
	}

	return `${baseUrl}${media.url}`;
}
