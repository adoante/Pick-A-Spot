import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET() {
	if (!GOOGLE_MAPS_API_KEY) {
		return json({ error: 'Missing API key' }, { status: 500 });
	}
	return json({ key: GOOGLE_MAPS_API_KEY });
}

