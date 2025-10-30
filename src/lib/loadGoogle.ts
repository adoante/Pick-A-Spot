export async function loadGoogle(libraries: string[] = []) {
	if ((window as any).google?.maps) return;

	const res = await fetch('/api/key');
	const data = await res.json();

	if (!data.key) throw new Error('Missing API key');

	return new Promise<void>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&v=weekly&libraries=${libraries.join(',')}&loading=async`
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = (err) => reject(err);
		document.head.appendChild(script);
	});
}
