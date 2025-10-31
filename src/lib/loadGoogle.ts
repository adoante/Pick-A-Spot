import { PUBLIC_PLACES_UI_KIT_API_KEY } from "$env/static/public";

export async function loadGoogle(libraries: string[] = []) {
	if ((window as any).google?.maps) return;

	return new Promise<void>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_PLACES_UI_KIT_API_KEY}&v=weekly&libraries=${libraries.join(',')}&loading=async`
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = (err) => reject(err);
		document.head.appendChild(script);
	});
}
