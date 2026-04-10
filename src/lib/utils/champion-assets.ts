import championData from '$lib/data/champion-icon-ids.json';

type ChampionIconIdsFile = {
	_meta?: { ddragonVersion: string; generated: string };
	ids: Record<string, string>;
};

const file = championData as ChampionIconIdsFile;
const { ids } = file;

/** Portraits carrés (plugin game-data, branche `latest` = patch courant côté CDragon) */
const CDRAGON_CHAMPION_ICON_BASE =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons';

const DDRAGON_FALLBACK_VERSION = file._meta?.ddragonVersion ?? '14.5.1';

/**
 * URL du carré champion : CommunityDragon (id numérique), sinon Data Dragon en secours.
 * `championKey` = clé Data Dragon (`Thresh`, `LeeSin`, …), comme dans `details.json`.
 */
export function championSquareSrc(championKey: string): string {
	const numericId = ids[championKey];
	if (numericId) {
		return `${CDRAGON_CHAMPION_ICON_BASE}/${numericId}.png`;
	}
	return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_FALLBACK_VERSION}/img/champion/${championKey}.png`;
}
