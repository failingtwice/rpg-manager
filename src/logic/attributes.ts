import Dice from './dice';

export class Attributes {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;

	constructor(
		strength: number,
		dexterity: number,
		constitution: number,
		intelligence: number,
		wisdom: number,
		charisma: number
	) {
		this.strength = strength;
		this.dexterity = dexterity;
		this.constitution = constitution;
		this.intelligence = intelligence;
		this.wisdom = wisdom;
		this.charisma = charisma;
	}

	static createRandomAttributes() {
		const strength = Dice.d100();
		const dexterity = Dice.d100();
		const constitution = Dice.d100();
		const intelligence = Dice.d100();
		const wisdom = Dice.d100();
		const charisma = Dice.d100();

		return new Attributes(strength, dexterity, constitution, intelligence, wisdom, charisma);
	}
}
