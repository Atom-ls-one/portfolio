/**
 * Extracts the YouTube video ID from various YouTube URL formats.
 * @param url The YouTube URL (shortened, embed, or standard)
 * @returns The 11-character video ID or null if not found
 */
export function getYoutubeId(url: string | undefined): string | null {
	if (!url) return null;
	const regex =
		// eslint-disable-next-line no-useless-escape
		/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
	const match = url.match(regex);
	return match ? match[1] : null;
}
