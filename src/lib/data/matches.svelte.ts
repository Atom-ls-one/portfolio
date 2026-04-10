export interface MatchEntry {
	championId: string;
	championName: string;
	win: boolean;
	kda: string;
	url: string;
	videoUrl?: string;
	date: string;
	en: {
		title: string;
		role: string;
		result: string;
		type: string;
		duration: string;
		description: string;
	};
	fr: {
		title: string;
		role: string;
		result: string;
		type: string;
		duration: string;
		description: string;
	};
}

// Automatically discover all details.json files in the history directory
const matchFiles = import.meta.glob('../history/*/details.json', { eager: true });

const loadMatches = (): MatchEntry[] => {
	const items: MatchEntry[] = [];

	for (const path in matchFiles) {
		const match = (matchFiles[path] as any).default || (matchFiles[path] as any);
		// Extract date from the path (e.g., ../history/2026-03-20/details.json -> 2026-03-20)
		const date = path.split('/').slice(-2, -1)[0];
		items.push({ ...match, date });
	}

	// Sort by date (newest first)
	return items.sort((a, b) => b.date.localeCompare(a.date));
};

class MatchStore {
	list = $state<MatchEntry[]>(loadMatches());
}

export const matches = new MatchStore();
