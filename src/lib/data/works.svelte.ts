export type WorkCategory = 'scouting-report' | 'reviews' | 'draft-simulations';

interface WorkLocale {
	title: string;
	role: string;
	type: string;
	duration: string;
	description: string;
}

export interface WorkEntry {
	id: string;
	category: WorkCategory;
	championId: string;
	championName: string;
	url: string;
	videoUrl?: string;
	date: string;
	en: WorkLocale;
	fr: WorkLocale;
	ko: WorkLocale;
}

const workFiles = import.meta.glob('../history/*/details.json', { eager: true });

const loadWorks = (): WorkEntry[] => {
	const items: WorkEntry[] = [];

	for (const path in workFiles) {
		const work =
			(workFiles[path] as Record<string, unknown>).default ||
			(workFiles[path] as Record<string, unknown>);
		const date = path.split('/').slice(-2, -1)[0];
		items.push({ ...(work as Omit<WorkEntry, 'date'>), date });
	}

	return items.sort((a, b) => b.date.localeCompare(a.date));
};

class WorkStore {
	list = $state<WorkEntry[]>(loadWorks());

	byCategory(category: WorkCategory): WorkEntry[] {
		return this.list.filter((w) => w.category === category);
	}
}

export const works = new WorkStore();
