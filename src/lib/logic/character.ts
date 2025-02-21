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
