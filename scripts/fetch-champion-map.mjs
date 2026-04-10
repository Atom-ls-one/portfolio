/**
 * Régénère src/lib/data/champion-icon-ids.json (clé champion Data Dragon → id numérique)
 * pour les URLs CommunityDragon v1/champion-icons/{id}.png
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/lib/data/champion-icon-ids.json');

const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then((r) =>
	r.json()
);
const ver = versions[0];
const data = await fetch(
	`https://ddragon.leagueoflegends.com/cdn/${ver}/data/en_US/champion.json`
).then((r) => r.json());

const ids = {};
for (const [name, ch] of Object.entries(data.data)) {
	ids[name] = String(ch.key);
}

const payload = {
	_meta: {
		ddragonVersion: ver,
		generated: new Date().toISOString().slice(0, 10)
	},
	ids
};

writeFileSync(outPath, JSON.stringify(payload, null, '\t') + '\n', 'utf8');
console.log(`Wrote ${Object.keys(ids).length} champions (${ver}) → ${outPath}`);
