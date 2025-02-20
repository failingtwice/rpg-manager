import { CharacterClass } from './characterClass';
import { Random } from './random';
import { Rarity } from './rarity';

export enum Attribute {
	Strength = 'strength',
	Dexterity = 'dexterity',
	Constitution = 'constitution',
	Intelligence = 'intelligence',
	Wisdom = 'wisdom',
	Charisma = 'charisma'
}

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

	static createRandomAttributes(rarity: Rarity, characterClass: CharacterClass, age: number) {
		// **1. Bell Curve Distribution Function**
		const normalRoll = (mean: number, stdDev: number) => {
			let sum = 0;
			for (let i = 0; i < 3; i++) {
				sum += Random.randomNumber(mean - stdDev, mean + stdDev);
			}
			return Math.round(sum / 3);
		};

		// **2. Rarity Influence (Biggest Factor)**
		const rarityModifiers = {
			[Rarity.Common]: { meanBoost: 0, stdDevBoost: 0 },
			[Rarity.Uncommon]: { meanBoost: 8, stdDevBoost: 5 },
			[Rarity.Rare]: { meanBoost: 15, stdDevBoost: 10 },
			[Rarity.Legendary]: { meanBoost: 20, stdDevBoost: 12 }
		};

		const { meanBoost, stdDevBoost } = rarityModifiers[rarity];

		// **3. Base Stats Before Age Influence**
		let strength = normalRoll(50 + meanBoost, 12 + stdDevBoost);
		let dexterity = normalRoll(50 + meanBoost, 12 + stdDevBoost);
		let constitution = normalRoll(50 + meanBoost, 12 + stdDevBoost);
		let intelligence = normalRoll(50 + meanBoost, 12 + stdDevBoost);
		let wisdom = normalRoll(50 + meanBoost, 12 + stdDevBoost);
		let charisma = normalRoll(50 + meanBoost, 12 + stdDevBoost);

		// **4. Apply Age-Based Modifiers**
		// Physical stats peak at 35, plateau until 45, and then decline.
		// Wisdom keeps increasing.
		const ageFactor = (age - 35) / 25; // Starts declining past 35, but subtly.

		if (age < 35) {
			// **Younger than 35 → Increasing Physical Stats**
			strength *= 1 + (age - 15) * 0.015; // Gradually increases from 15 to 35
			dexterity *= 1 + (age - 15) * 0.015;
			constitution *= 1 + (age - 15) * 0.012;
			intelligence *= 1 + (age - 15) * 0.005; // Small boost
			wisdom *= 1 + (age - 15) * 0.01; // Small boost
			charisma *= 1 + (age - 15) * 0.007; // Small boost
		} else if (age > 45) {
			// **Older than 45 → Subtle Physical Decline, but Wisdom Grows**
			strength *= 1 - Math.min(0.15, (ageFactor - 0.4) * 0.5);
			dexterity *= 1 - Math.min(0.12, (ageFactor - 0.4) * 0.4);
			constitution *= 1 - Math.min(0.1, (ageFactor - 0.4) * 0.3);
			intelligence *= 1 + (ageFactor - 0.4) * 0.2;
			wisdom *= 1 + (ageFactor - 0.4) * 0.5; // Grows faster
			charisma *= 1 + (ageFactor - 0.4) * 0.1;
		}

		// **5. Class Influence (Weighted Primary Stats)**
		const primaryWeight = 1.4; // 40% boost to main attribute
		const secondaryWeight = 1.15; // 15% boost to secondary attribute

		switch (characterClass) {
			case CharacterClass.Barbarian:
				strength = strength * primaryWeight;
				break;
			case CharacterClass.Bard:
				charisma = charisma * primaryWeight;
				break;
			case CharacterClass.Cleric:
				wisdom = wisdom * primaryWeight;
				break;
			case CharacterClass.Druid:
				wisdom = wisdom * primaryWeight;
				break;
			case CharacterClass.Fighter:
				strength = strength * primaryWeight;
				dexterity = dexterity * secondaryWeight;
				break;
			case CharacterClass.Monk:
				dexterity = dexterity * primaryWeight;
				wisdom = wisdom * secondaryWeight;
				break;
			case CharacterClass.Paladin:
				strength = strength * primaryWeight;
				charisma = charisma * secondaryWeight;
				break;
			case CharacterClass.Ranger:
				dexterity = dexterity * primaryWeight;
				wisdom = wisdom * secondaryWeight;
				break;
			case CharacterClass.Rogue:
				dexterity = dexterity * primaryWeight;
				break;
			case CharacterClass.Sorcerer:
				charisma = charisma * primaryWeight;
				break;
			case CharacterClass.Warlock:
				charisma = charisma * primaryWeight;
				break;
			case CharacterClass.Wizard:
				intelligence = intelligence * primaryWeight;
				break;
			default:
				throw new Error(`Unknown character class: ${characterClass}`);
		}

		// **6. Ensure Stats Stay Between 1 and 99**
		const clamp = (value: number) => Math.round(Math.min(99, Math.max(1, value)));

		strength = clamp(strength);
		dexterity = clamp(dexterity);
		constitution = clamp(constitution);
		intelligence = clamp(intelligence);
		wisdom = clamp(wisdom);
		charisma = clamp(charisma);

		// **7. Return Attributes**
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
