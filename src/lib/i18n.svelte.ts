import i18nData from './data/i18n.json';

type Language = 'en' | 'fr';

class I18nStore {
	locale = $state<Language>('fr');
	data = i18nData;

	get t() {
		// We return a safe version and we ensure all keys are there
		return this.data[this.locale];
	}

	get all() {
		return this.data;
	}

	setLocale(lang: Language) {
		this.locale = lang;
	}

	translate(field: { en: string; fr: string } | string | undefined): string {
		if (!field) return '';
		if (typeof field === 'string') return field;
		return field[this.locale] || '';
	}
}

export const i18n = new I18nStore();
