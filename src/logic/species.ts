export class Species {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	// List of all available species
	static readonly speciesList = [
		'Human',
		'Orc',
		'Elf',
		'Dwarf',
		'Halfling',
		'Gnome',
		'Dragonborn',
		'Goliath',
		'Tiefling'
	];

	// Create a random species
	static getRandomSpecies(): Species {
		const randomIndex = Math.floor(Math.random() * this.speciesList.length);
		return new Species(this.speciesList[randomIndex]);
	}
}
