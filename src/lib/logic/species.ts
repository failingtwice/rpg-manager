export enum SpeciesName {
	Dragonborn = 'Dragonborn',
	Dwarf = 'Dwarf',
	Elf = 'Elf',
	Gnome = 'Gnome',
	Goliath = 'Goliath',
	Halfling = 'Halfling',
	Human = 'Human',
	Orc = 'Orc',
	Tiefling = 'Tiefling'
}

export function getRandomSpecies(): SpeciesName {
	const species =
		Object.values(SpeciesName)[Math.floor(Math.random() * Object.keys(SpeciesName).length)];
	return species;
}
