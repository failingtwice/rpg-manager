import { Attributes } from './attributes';
import { getRandomName } from './names';
import { SpeciesName, getRandomSpecies } from './species';
import { getPortrait } from './portrait';
import { getRandomAge, getRandomDevelopmentCurve } from './age';
import { Random } from './random';
import { Rarity, getRandomRarity, getRarityFactor } from './rarity';
import { Archetype, getArchetypeAttributes, getRandomArchetype } from './archetype';

export class Character {
	name: string;
	species: SpeciesName;
	rarity: Rarity;
	archetype: Archetype;
	portrait: string;
	age: number;
	height: number;
	weight: number;

	luck: number;
	cooperation: number;

	attributes: Attributes;
	developmentCurve: number[];

	constructor(
		name: string,
		species: SpeciesName,
		rarity: Rarity,
		archetype: Archetype,
		portrait: string,
		age: number,
		height: number,
		weight: number,

		luck: number,
		cooperation: number,

		attributes: Attributes,
		developmentCurve: number[]
	) {
		this.name = name;
		this.species = species;
		this.rarity = rarity;
		this.archetype = archetype;
		this.portrait = portrait;
		this.age = age;
		this.height = height;
		this.weight = weight;

		this.luck = luck;
		this.cooperation = cooperation;
		this.attributes = attributes;
		this.developmentCurve = developmentCurve;
	}

	static randomCharacter(): Character {
		const species = getRandomSpecies();
		const name = getRandomName(species);
		const archetype = getRandomArchetype();
		const portrait = getPortrait(species);
		const rarity = getRandomRarity();
		const rarityFactor = getRarityFactor(rarity);
		const age = getRandomAge();

		const height = Random.randomNumber(100, 200);
		const weight = Random.randomNumber(50, 100);
		const luck = Random.randomNumber(0, 100);
		const cooperation = Random.randomNumber(0, 100);
		const developmentCurve = getRandomDevelopmentCurve();
		const ageFactor = developmentCurve[age];

		return new Character(
			name,
			species,
			rarity,
			archetype,
			portrait,
			age,
			height,
			weight,
			luck,
			cooperation,
			Attributes.createRandomAttributes(getArchetypeAttributes(archetype), rarityFactor, ageFactor),
			developmentCurve
		);
	}
}

export function getAttributeDisplayName(attributeName: string): string {
	switch (attributeName) {
		case 'initiative':
			return 'Initiative';
		case 'health':
			return 'Health';
		case 'healthRegen':
			return 'Health Regen';
		case 'mana':
			return 'Mana';
		case 'manaRegen':
			return 'Mana Regen';
		case 'attackDamage':
			return 'Attack Damage';
		case 'critMult':
			return 'Crit Mult';
		case 'critChance':
			return 'Crit Chance';
		case 'armor':
			return 'Armor';
		case 'armorPen':
			return 'Armor Pen';
		case 'accuracy':
			return 'Accuracy';
		case 'evasion':
			return 'Evasion';
		case 'magicPower':
			return 'Magic Power';
		case 'magicPen':
			return 'Magic Pen';
		case 'magicResist':
			return 'Magic Resist';
		case 'statusResist':
			return 'Status Resist';
		default:
			throw new Error(`Invalid attribute name: ${attributeName}`);
	}
}

export function getChracterStatByName(character: Character, attributeName: string): number {
	switch (attributeName) {
		case 'initiative':
			return character.attributes.initiative;
		case 'health':
			return character.attributes.health;
		case 'healthRegen':
			return character.attributes.healthRegen;
		case 'mana':
			return character.attributes.mana;
		case 'manaRegen':
			return character.attributes.manaRegen;
		case 'attackDamage':
			return character.attributes.attackDamage;
		case 'critMult':
			return character.attributes.critMult;
		case 'critChance':
			return character.attributes.critChance;
		case 'armor':
			return character.attributes.armor;
		case 'armorPen':
			return character.attributes.armorPen;
		case 'accuracy':
			return character.attributes.accuracy;
		case 'evasion':
			return character.attributes.evasion;
		case 'magicPower':
			return character.attributes.magicPower;
		case 'magicPen':
			return character.attributes.magicPen;
		case 'magicResist':
			return character.attributes.magicResist;
		case 'statusResist':
			return character.attributes.statusResist;
		default:
			throw new Error(`Invalid attribute name: ${attributeName}`);
	}
}
