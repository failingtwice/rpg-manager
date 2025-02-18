export default class Character {
	name: string;

	age: number;
	height: number;
	weight: number;

	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	luck: number;
	cooperation: number;

	constructor(
		name: string,
		age: number,
		height: number,
		weight: number,
		strength: number,
		dexterity: number,
		constitution: number,
		intelligence: number,
		wisdom: number,
		charisma: number,
		luck: number,
		cooperation: number
	) {
		this.name = name;
		this.age = age;
		this.height = height;
		this.weight = weight;

		this.strength = strength;
		this.dexterity = dexterity;
		this.constitution = constitution;
		this.intelligence = intelligence;
		this.wisdom = wisdom;
		this.charisma = charisma;
		this.luck = luck;
		this.cooperation = cooperation;
	}

	static randomCharacter(): Character {
		const names = ['Arin', 'Balin', 'Cerin', 'Dorin', 'Edrin', 'Farin', 'Gorin'];
		const name = names[Math.floor(Math.random() * names.length)];
		const age = Math.floor(Math.random() * (50 - 18 + 1)) + 18;
		const height = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
		const weight = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

		const generateStat = () => Math.floor(Math.random() * 10) + 1;

		return new Character(
			name,
			age,
			height,
			weight,
			generateStat(),
			generateStat(),
			generateStat(),
			generateStat(),
			generateStat(),
			generateStat(),
			generateStat(),
			generateStat()
		);
	}
}
