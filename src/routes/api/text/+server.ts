import { GOOGLE_MAPS_API_KEY } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
	const { input, radius, lat, lng } = await request.json();

	const url = "https://places.googleapis.com/v1/places:searchText"

	const body = {
		textQuery: input,
		locationBias: {
			circle: {
				center: {
					latitude: lat,
					longitude: lng
				},
				radius: radius
			}
		},
		//openNow: true,
		pageSize: 2
	}

	const headers = {
		'Content-Type': 'application/json',
		'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
		'X-Goog-FieldMask': 'places.id,nextPageToken'
	}

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(body)
		})

		if (!res.ok) {
			const errorText = await res.text()
			return json({ error: `Google API error: ${errorText}` }, { status: res.status })
		}

		const data = await res.json()
		return json(data)
	} catch (err) {
		console.error('Request failed', err)
		return json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
