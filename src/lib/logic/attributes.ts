import { LifeStage } from './age';
import { Random } from './random';
import { Rarity } from './rarity';

export class Attributes {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	rarity: Rarity;

	constructor(
		strength: number,
		dexterity: number,
		constitution: number,
		intelligence: number,
		wisdom: number,
		charisma: number,
		rarity: Rarity
	) {
		this.strength = strength;
		this.dexterity = dexterity;
		this.constitution = constitution;
		this.intelligence = intelligence;
		this.wisdom = wisdom;
		this.charisma = charisma;
		this.rarity = rarity;
	}

	static createRandomAttributes(age: number, lifeStage: LifeStage, rarity: Rarity) {
		// Ensure minimum age is 15
		if (age < 15) {
			throw new Error('Age must be at least 15');
		}

		// Define bell curve function (normal distribution approximation)
		const normalRoll = (mean: number, stdDev: number) => {
			let sum = 0;
			for (let i = 0; i < 3; i++) {
				sum += Random.randomNumber(mean - stdDev, mean + stdDev);
			}
			return Math.round(sum / 3);
		};

		// Define base stat ranges for different rarities
		const rarityModifiers = {
			[Rarity.Common]: { meanBoost: 0, stdDevBoost: 0 }, // Normal bell curve
			[Rarity.Uncommon]: { meanBoost: 7, stdDevBoost: 5 }, // Slightly higher stats
			[Rarity.Rare]: { meanBoost: 12, stdDevBoost: 7 }, // Much better stats
			[Rarity.Legendary]: { meanBoost: 15, stdDevBoost: 10 } // Legendary stats
		};

		const { meanBoost, stdDevBoost } = rarityModifiers[rarity];

		// Define base stat ranges for different life stages
		let strength, dexterity, constitution, intelligence, wisdom, charisma;

		switch (lifeStage) {
			case LifeStage.Youth:
				strength = normalRoll(40 + meanBoost, 10 + stdDevBoost);
				dexterity = normalRoll(45 + meanBoost, 10 + stdDevBoost);
				constitution = normalRoll(40 + meanBoost, 10 + stdDevBoost);
				intelligence = normalRoll(45 + meanBoost, 10 + stdDevBoost);
				wisdom = normalRoll(35 + meanBoost, 10 + stdDevBoost);
				charisma = normalRoll(45 + meanBoost, 10 + stdDevBoost);
				break;

			case LifeStage.Young:
				strength = normalRoll(50 + meanBoost, 15 + stdDevBoost);
				dexterity = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				constitution = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				intelligence = normalRoll(50 + meanBoost, 15 + stdDevBoost);
				wisdom = normalRoll(45 + meanBoost, 15 + stdDevBoost);
				charisma = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				break;

			case LifeStage.Adult:
				strength = normalRoll(60 + meanBoost, 15 + stdDevBoost);
				dexterity = normalRoll(60 + meanBoost, 15 + stdDevBoost);
				constitution = normalRoll(60 + meanBoost, 15 + stdDevBoost);
				intelligence = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				wisdom = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				charisma = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				break;

			case LifeStage.Mature:
				strength = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				dexterity = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				constitution = normalRoll(55 + meanBoost, 15 + stdDevBoost);
				intelligence = normalRoll(65 + meanBoost, 15 + stdDevBoost);
				wisdom = normalRoll(70 + meanBoost, 15 + stdDevBoost);
				charisma = normalRoll(65 + meanBoost, 15 + stdDevBoost);
				break;

			case LifeStage.Elderly:
				strength = normalRoll(40 + meanBoost, 15 + stdDevBoost);
				dexterity = normalRoll(40 + meanBoost, 15 + stdDevBoost);
				constitution = normalRoll(40 + meanBoost, 15 + stdDevBoost);
				intelligence = normalRoll(75 + meanBoost, 15 + stdDevBoost);
				wisdom = normalRoll(85 + meanBoost, 15 + stdDevBoost);
				charisma = normalRoll(75 + meanBoost, 15 + stdDevBoost);
				break;

			case LifeStage.Ancient:
				strength = normalRoll(30 + meanBoost, 10 + stdDevBoost);
				dexterity = normalRoll(30 + meanBoost, 10 + stdDevBoost);
				constitution = normalRoll(30 + meanBoost, 10 + stdDevBoost);
				intelligence = normalRoll(80 + meanBoost, 15 + stdDevBoost);
				wisdom = normalRoll(90 + meanBoost, 15 + stdDevBoost);
				charisma = normalRoll(80 + meanBoost, 15 + stdDevBoost);
				break;
		}

		// Ensure attributes remain within 1-99 range
		strength = Math.min(99, Math.max(1, Math.round(strength)));
		dexterity = Math.min(99, Math.max(1, Math.round(dexterity)));
		constitution = Math.min(99, Math.max(1, Math.round(constitution)));
		intelligence = Math.min(99, Math.max(1, Math.round(intelligence)));
		wisdom = Math.min(99, Math.max(1, Math.round(wisdom)));
		charisma = Math.min(99, Math.max(1, Math.round(charisma)));

		return new Attributes(
			strength,
			dexterity,
			constitution,
			intelligence,
			wisdom,
			charisma,
			rarity
		);
	}
}
