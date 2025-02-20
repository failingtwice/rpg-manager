import { Attributes } from './attributes';
import Dice from './dice';
import { getRandomName } from './names';
import { SpeciesName, getRandomSpecies } from './species';
import { getPortrait } from './portrait';
import { getRandomAge } from './age';
import { Random } from './random';
import { getRandomRarity } from './rarity';
import { CharacterClass, getRandomCharacterClass } from './characterClass';
export class Character {
	name: string;
	species: SpeciesName;
	characterClass: CharacterClass;
	portrait: string;
	age: number;
	height: number;
	weight: number;

	luck: number;
	cooperation: number;

	attributes: Attributes;

	average: number;

	constructor(
		name: string,
		species: SpeciesName,
		characterClass: CharacterClass,
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
		this.characterClass = characterClass;
		this.portrait = portrait;
		this.age = age;
		this.height = height;
		this.weight = weight;

		this.luck = luck;
		this.cooperation = cooperation;
		this.attributes = attributes;

		this.average = Math.floor(
			(this.attributes.strength +
				this.attributes.dexterity +
				this.attributes.constitution +
				this.attributes.intelligence +
				this.attributes.wisdom +
				this.attributes.charisma) /
				6
		);
	}

	static randomCharacter(): Character {
		const species = getRandomSpecies();
		const name = getRandomName(species);
		const characterClass = getRandomCharacterClass();
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
			characterClass,
			portrait,
			age,
			height,
			weight,
			luck,
			cooperation,
			Attributes.createRandomAttributes(rarity, characterClass, age)
		);
	}
}
