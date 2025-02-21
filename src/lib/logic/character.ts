import { Attributes } from './attributes';
import { getRandomName } from './names';
import { SpeciesName, getRandomSpecies } from './species';
import { getPortrait } from './portrait';
import { getRandomAge } from './age';
import { Random } from './random';
import { Rarity, getRandomRarity } from './rarity';
import { Archetype, getRandomArchetype } from './archetype';

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

		attributes: Attributes
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
	}

	static deserialize(characterData: string): Character {
		const data = JSON.parse(characterData);

		return new Character(
			data.name,
			data.species,
			data.rarity,
			data.archetype,
			data.portrait,
			data.age,
			data.height,
			data.weight,
			data.luck,
			data.cooperation,
			Attributes.deserialize(data.attributes)
		);
	}

	static serialize(character: Character): string {
		return JSON.stringify({
			name: character.name,
			species: character.species,
			rarity: character.rarity,
			archetype: character.archetype,
			portrait: character.portrait,
			age: character.age,
			height: character.height,
			weight: character.weight,
			luck: character.luck,
			cooperation: character.cooperation,
			attributes: Attributes.serialize(character.attributes)
		});
	}

	static randomCharacter(): Character {
		const species = getRandomSpecies();
		const name = getRandomName(species);
		const archetype = getRandomArchetype();
		const portrait = getPortrait(species);
		const rarity = getRandomRarity();
		const age = getRandomAge();

		const height = Random.randomNumber(100, 200);
		const weight = Random.randomNumber(50, 100);
		const luck = Random.randomNumber(0, 100);
		const cooperation = Random.randomNumber(0, 100);

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
			Attributes.createRandomAttributes(archetype, rarity, age)
		);
	}
}
