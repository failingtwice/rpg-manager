import { Random } from './random';

export enum Rarity {
	Common = 'Common',
	Uncommon = 'Uncommon',
	Rare = 'Rare',
	Legendary = 'Legendary'
}

export const rarityChance = {
	[Rarity.Common]: 100,
	[Rarity.Uncommon]: 30,
	[Rarity.Rare]: 10,
	[Rarity.Legendary]: 5
};

export function getRandomRarity(): Rarity {
	const value = Random.randomNumber(0, 100);

	if (value <= rarityChance[Rarity.Legendary]) return Rarity.Legendary;
	if (value <= rarityChance[Rarity.Rare]) return Rarity.Rare;
	if (value <= rarityChance[Rarity.Uncommon]) return Rarity.Uncommon;
	return Rarity.Common;
}
