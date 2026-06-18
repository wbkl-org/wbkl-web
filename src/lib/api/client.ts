import type { StrapiResponse } from './types';
import { env } from '$env/dynamic/private';

class StrapiClientError extends Error {
	status: number;
	name: string;

	constructor(status: number, errorName: string, message: string) {
		super(`${errorName}: ${message}`);
		this.status = status;
		this.name = errorName;
	}
}

export async function fetchFromStrapi<T>(
	path: string,
	options: {
		populate?: string[];
		filters?: Record<string, unknown>;
		sort?: string | string[];
		locale?: string;
		page?: number;
		pageSize?: number;
	} = {}
): Promise<T | T[]> {
	const strapiUrl = (env.STRAPI_URL || '').replace(/\/+$/, '');
	const strapiToken = env.STRAPI_API_TOKEN || '';

	if (!strapiUrl) {
		console.warn('[Strapi] STRAPI_URL is not set. Returning empty data.');
		return [] as T[];
	}

	const params = new URLSearchParams();

	if (options.locale) {
		params.set('locale', options.locale);
	}

	if (options.populate) {
		options.populate.forEach((field, i) => {
			params.set(`populate[${i}]`, field);
		});
	}

	if (options.filters) {
		Object.entries(options.filters).forEach(([key, value]) => {
			if (typeof value === 'object' && value !== null) {
				Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
					params.set(`filters[${key}][${op}]`, String(val));
				});
			} else {
				params.set(`filters[${key}][$eq]`, String(value));
			}
		});
	}

	if (options.sort) {
		const sorts = Array.isArray(options.sort) ? options.sort : [options.sort];
		sorts.forEach((s, i) => {
			params.set(`sort[${i}]`, s);
		});
	}

	if (options.page !== undefined) {
		params.set('pagination[page]', String(options.page));
	}

	if (options.pageSize !== undefined) {
		params.set('pagination[pageSize]', String(options.pageSize));
	}

	const queryString = params.toString();
	const url = `${strapiUrl}/api/${path}${queryString ? `?${queryString}` : ''}`;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (strapiToken) {
		headers['Authorization'] = `Bearer ${strapiToken}`;
	}

	const response = await fetch(url, { headers });

	if (!response.ok) {
		let errorName = 'UnknownError';
		let errorMessage = `HTTP ${response.status}`;

		try {
			const errorData = (await response.json()) as { error?: { name?: string; message?: string } };
			if (errorData.error) {
				errorName = errorData.error.name || errorName;
				errorMessage = errorData.error.message || errorMessage;
			}
		} catch {
			// Response was not JSON, use default error message
		}

		throw new StrapiClientError(response.status, errorName, errorMessage);
	}

	const result: StrapiResponse<T> = await response.json();
	return Array.isArray(result.data) ? result.data : result.data;
}

export { StrapiClientError };
