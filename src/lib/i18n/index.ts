import es from './es.json';
import en from './en.json';

type TranslationKeys = keyof typeof es;

const translations: Record<string, Record<string, string>> = {
	es: es as Record<string, string>,
	en: en as Record<string, string>
};

export function t(key: TranslationKeys | string, locale?: string): string {
	const loc = locale || 'es';

	if (loc !== 'es' && translations.en[key]) {
		return translations.en[key];
	}

	if (translations.es[key]) {
		return translations.es[key];
	}

	return key;
}

export type { TranslationKeys };
