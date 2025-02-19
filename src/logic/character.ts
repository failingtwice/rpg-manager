import { Attributes } from './attributes';
import Dice from './dice';
import { names } from './names';

export default class Character {
	name: string;

	age: number;
	height: number;
	weight: number;

	luck: number;
	cooperation: number;

	attributes: Attributes;

	constructor(
		name: string,
		age: number,
		height: number,
		weight: number,

		luck: number,
		cooperation: number,

		attributes: Attributes
	) {
		this.name = name;
		this.age = age;
		this.height = height;
		this.weight = weight;

		this.luck = luck;
		this.cooperation = cooperation;
		this.attributes = attributes;
	}

	static randomCharacter(): Character {
		const name = names[Math.floor(Math.random() * names.length)];
		const age = Dice.d(90);
		const height = Dice.d(200);
		const weight = Dice.d(100);
		const luck = Dice.d100();
		const cooperation = Dice.d100();

		return new Character(
			name,
			age,
			height,
			weight,
			luck,
			cooperation,
			Attributes.createRandomAttributes()
		);
	}
}
