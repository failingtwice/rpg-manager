import { Attributes } from './attributes';
import Dice from './dice';
import { names } from './names';
import { Species } from './species';

export class Character {
	name: string;
	species: Species;
	age: number;
	height: number;
	weight: number;

	luck: number;
	cooperation: number;

	attributes: Attributes;

	average: number;

	constructor(
		name: string,
		species: Species,
		age: number,
		height: number,
		weight: number,

		luck: number,
		cooperation: number,

		attributes: Attributes
	) {
		this.name = name;
		this.species = species;
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
		const name = names[Math.floor(Math.random() * names.length)];
		const species = Species.getRandomSpecies();
		const age = Dice.d(90);
		const height = Dice.d(200);
		const weight = Dice.d(100);
		const luck = Dice.d100();
		const cooperation = Dice.d100();

		return new Character(
			name,
			species,
			age,
			height,
			weight,
			luck,
			cooperation,
			Attributes.createRandomAttributes()
		);
	}
}
