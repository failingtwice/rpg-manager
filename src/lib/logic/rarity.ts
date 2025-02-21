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

export function getRarityFactor(rarity: Rarity): number {
	const randomVariance = (base: number, variance: number) =>
		base + (Math.random() * 2 - 1) * variance; // Adds a small randomized offset

	switch (rarity) {
		case Rarity.Legendary:
			return randomVariance(2.5, 0.2); // 1.4 - 1.6
		case Rarity.Rare:
			return randomVariance(2, 0.2); // 1.1 - 1.3
		case Rarity.Uncommon:
			return randomVariance(1.5, 0.2); // 0.95 - 1.05
		case Rarity.Common:
			return randomVariance(1, 0.2); // 0.75 - 0.85
	}
}
