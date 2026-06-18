import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
	const strapiUrl = env.STRAPI_URL || '';
	const strapiToken = env.STRAPI_API_TOKEN || '';

	let strapiTest: { status: number; body: unknown } | { error: string } = { error: 'not attempted' };

	if (strapiUrl) {
		try {
			const res = await fetch(`${strapiUrl}/api/events?locale=es&pagination[pageSize]=1`, {
				headers: {
					'Content-Type': 'application/json',
					...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {})
				}
			});
			strapiTest = {
				status: res.status,
				body: await res.json().catch(() => 'non-JSON response')
			};
		} catch (e) {
			strapiTest = { error: String(e) };
		}
	}

	return json({
		hasStrapiUrl: !!strapiUrl,
		strapiUrlLength: strapiUrl.length,
		hasStrapiToken: !!strapiToken,
		strapiTokenLength: strapiToken.length,
		strapiTest
	});
}
