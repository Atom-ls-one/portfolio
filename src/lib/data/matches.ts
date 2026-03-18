import { fetchRemoteMatches } from '../firebase/data';

export interface MatchEntry {
	id?: string;
	championId: string;
	championName: string;
	win: boolean;
	kda: string;
	url: string;
	// Localized fields
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

class MatchStore {
	list = $state<MatchEntry[]>([]);
	loading = $state(true);

	constructor() {
		this.refresh();
	}

	async refresh() {
		if (typeof window === 'undefined') return;
		try {
			this.loading = true;
			const remote = await fetchRemoteMatches();
			if (remote && remote.length > 0) {
				this.list = remote as MatchEntry[];
			}
		} catch (err) {
			console.error('Failed to fetch matches:', err);
		} finally {
			this.loading = false;
		}
	}
}

export const matches = new MatchStore();
