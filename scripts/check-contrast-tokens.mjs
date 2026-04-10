/**
 * Vérifie les paires premier plan / fond définies dans src/app.css (:root).
 *
 * - WCAG 2.2 §1.4.3 / §1.4.6 : ratios de contraste relatifs (sRGB).
 * - APCA (W3 Silver / WCAG 3 en travaux) : |Lc| via apca-w3 (texte clair sur fond sombre → Lc négatif).
 *
 * Réf. juridique / conformité actuelle : WCAG 2.2. APCA sert de garde-fou « future-proof », pas de substitut légal.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { calcAPCA } from 'apca-w3';
import { converter, formatHex, parse } from 'culori';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, '../src/app.css');

/** @typedef {{ fg: string; bg: string; wcagMin: number; apcaMin: number; label: string; largeText?: boolean }} Check */

/** Paires à valider : ajuster seuils selon usage (corps, gros texte, métadonnées). */
const CHECKS = /** @type {Check[]} */ ([
	{
		fg: '--fg-default',
		bg: '--color-bg-base',
		wcagMin: 4.5,
		apcaMin: 60,
		label: 'Corps / UI principal sur fond page'
	},
	{
		fg: '--fg-prose',
		bg: '--color-bg-base',
		wcagMin: 4.5,
		apcaMin: 58,
		label: 'Prose (bio, analyses) sur fond page'
	},
	{
		fg: '--fg-ui',
		bg: '--color-bg-base',
		wcagMin: 4.5,
		apcaMin: 55,
		label: 'Lignes FAQ / UI dense sur fond page'
	},
	{
		fg: '--fg-muted',
		bg: '--color-bg-base',
		wcagMin: 4.5,
		apcaMin: 55,
		label: 'Secondaire sur fond page'
	},
	{
		fg: '--fg-muted',
		bg: '--color-bg-surface',
		wcagMin: 4.5,
		apcaMin: 50,
		label: 'Secondaire sur carte / surface'
	},
	{
		fg: '--fg-subtle',
		bg: '--color-bg-base',
		wcagMin: 4.5,
		apcaMin: 48,
		label: 'Métadonnées sur fond page'
	},
	{
		fg: '--fg-subtle',
		bg: '--color-bg-surface',
		wcagMin: 4.5,
		apcaMin: 45,
		label: 'Overlines / labels sur surface'
	},
	{
		fg: '--fg-link',
		bg: '--color-bg-base',
		wcagMin: 4.5,
		apcaMin: 52,
		label: 'Liens (or) sur fond page'
	},
	{
		fg: '--color-gold-light',
		bg: '--color-bg-base',
		wcagMin: 3,
		apcaMin: 40,
		largeText: true,
		label: 'Titres display (or), gros texte WCAG'
	}
]);

function extractRootBlock(css) {
	const start = css.indexOf(':root');
	if (start < 0) throw new Error('Bloc :root introuvable dans src/app.css');
	let i = css.indexOf('{', start);
	if (i < 0) throw new Error(':root sans {');
	let depth = 1;
	i++;
	const from = i;
	while (i < css.length && depth > 0) {
		const c = css[i];
		// Ignorer chaînes (évite } dans url() si un jour ajouté)
		if (c === '{') depth++;
		else if (c === '}') depth--;
		i++;
	}
	return css.slice(from, i - 1);
}

function parseDeclarations(rootBody) {
	const stripped = rootBody.replace(/\/\*[\s\S]*?\*\//g, '');
	const map = new Map();
	const re = /^\s*(--[\w-]+)\s*:\s*([^;]+);/gm;
	let m;
	while ((m = re.exec(stripped)) !== null) {
		map.set(m[1], m[2].trim());
	}
	return map;
}

/**
 * @param {string} raw
 * @param {Map<string, string>} map
 * @param {Set<string>} [seen]
 */
function resolveToken(raw, map, seen = new Set()) {
	const v = raw.trim();
	const varMatch = /^var\(\s*(--[\w-]+)\s*\)$/.exec(v);
	if (varMatch) {
		const ref = varMatch[1];
		if (seen.has(ref)) throw new Error(`Référence circulaire : ${ref}`);
		seen.add(ref);
		const next = map.get(ref);
		if (next === undefined) throw new Error(`Variable CSS inconnue : ${ref}`);
		return resolveToken(next, map, seen);
	}
	return v;
}

function wcagContrastRatio(rgbFg, rgbBg) {
	const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
	const lum = (rgb) => 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
	const L1 = lum(rgbFg);
	const L2 = lum(rgbBg);
	const lighter = Math.max(L1, L2);
	const darker = Math.min(L1, L2);
	return (lighter + 0.05) / (darker + 0.05);
}

const toRgb = converter('rgb');

function colorFromResolved(cssColor) {
	const p = parse(cssColor);
	if (!p) throw new Error(`Couleur invalide : ${cssColor}`);
	return toRgb(p);
}

function main() {
	const css = readFileSync(cssPath, 'utf8');
	const map = parseDeclarations(extractRootBlock(css));

	const errors = [];
	const warnings = [];

	for (const check of CHECKS) {
		let fgCss;
		let bgCss;
		try {
			fgCss = resolveToken(map.get(check.fg) ?? '', map);
			bgCss = resolveToken(map.get(check.bg) ?? '', map);
		} catch (e) {
			errors.push(`${check.label}: ${/** @type {Error} */ (e).message}`);
			continue;
		}

		const rgbFg = colorFromResolved(fgCss);
		const rgbBg = colorFromResolved(bgCss);
		const ratio = wcagContrastRatio(rgbFg, rgbBg);

		const hexFg = formatHex(rgbFg);
		const hexBg = formatHex(rgbBg);
		const lcRaw = calcAPCA(hexFg, hexBg, -1);
		const lcAbs = Math.abs(typeof lcRaw === 'number' ? lcRaw : Number.NaN);

		const wcagOk = ratio + 1e-6 >= check.wcagMin;
		const apcaOk = lcAbs + 1e-6 >= check.apcaMin;

		const line = [
			check.label,
			`(${check.fg} / ${check.bg})`,
			`WCAG ${ratio.toFixed(2)}:1 (min ${check.wcagMin})`,
			`APCA |Lc| ${lcAbs.toFixed(1)} (min ${check.apcaMin})${check.largeText ? ' [gros texte]' : ''}`
		].join(' | ');

		if (!wcagOk) errors.push(`WCAG: ${line}`);
		else if (!apcaOk) warnings.push(`APCA: ${line}`);
		else console.log(`OK  ${line}`);
	}

	for (const w of warnings) console.warn(`⚠ ${w}`);

	if (errors.length) {
		console.error('\nÉchec contraste (WCAG ou token manquant) :\n');
		for (const e of errors) console.error(`  • ${e}`);
		process.exit(1);
	}

	if (warnings.length) {
		console.error(
			`\n${warnings.length} avertissement(s) APCA (WCAG OK). Ajuster les seuils ou les couleurs si tu veux du zéro warning.`
		);
	}

	console.log(
		'\nContraste tokens : WCAG 2.2 respecté pour les paires listées ; APCA en contrôle complémentaire.'
	);
}

main();
