/**
 * Télécharge les assets LoL (CommunityDragon RAW) réellement utilisés dans le site.
 * Contenu © Riot Games — usage conforme à leur politique pour projets fans / portfolio.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/lib/assets/lol-ui');

const RAW = 'https://raw.communitydragon.org/latest';

/** [chemin sur RAW, nom local] */
const ASSETS = [
	['plugins/rcp-fe-lol-static-assets/global/default/images/border-unranked.png', 'border-unranked.png'],
	['plugins/rcp-fe-lol-static-assets/global/default/svg/circle-lines-gold.svg', 'circle-lines-gold.svg']
];

mkdirSync(OUT, { recursive: true });

const manifest = { base: RAW, files: [] };

for (const [path, filename] of ASSETS) {
	const url = `${RAW}/${path}`;
	const res = await fetch(url);
	if (!res.ok) {
		console.error(`Skip (${res.status}): ${url}`);
		continue;
	}
	const buf = Buffer.from(await res.arrayBuffer());
	const dest = join(OUT, filename);
	writeFileSync(dest, buf);
	manifest.files.push({ source: path, file: filename, bytes: buf.length });
	console.log(`OK ${filename} (${buf.length} B)`);
}

writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, '\t') + '\n', 'utf8');
console.log(`\n→ ${manifest.files.length} fichiers dans ${OUT}`);
