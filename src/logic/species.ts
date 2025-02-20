import dragonbornPortrait from '$lib/images/portraits/dragonborn_portrait_pa.png';
import dwarfPortrait from '$lib/images/portraits/dwarf_portrait_pa.png';
import elfPortrait from '$lib/images/portraits/elf_portrait_pa.png';
import gnomePortrait from '$lib/images/portraits/gnome_portrait_pa.png';
import goliathPortrait from '$lib/images/portraits/goliath_portrait_pa.png';
import halflingPortrait from '$lib/images/portraits/halfling_portrait_pa.png';
import humanPortrait from '$lib/images/portraits/human_portrait_pa.png';
import orcPortrait from '$lib/images/portraits/orc_portrait_pa.png';
import tieflingPortrait from '$lib/images/portraits/tiefling_portrait_pa.png';

export class Species {
	name: string;
	portraitPath: string;

	constructor(name: string, portraitPath: string) {
		this.name = name;
		this.portraitPath = portraitPath;
	}

	static readonly speciesData = [
		{
			name: 'Dragonborn',
			portraitPath: dragonbornPortrait
		},
		{
			name: 'Dwarf',
			portraitPath: dwarfPortrait
		},
		{
			name: 'Elf',
			portraitPath: elfPortrait
		},
		{
			name: 'Gnome',
			portraitPath: gnomePortrait
		},
		{
			name: 'Goliath',
			portraitPath: goliathPortrait
		},
		{
			name: 'Halfling',
			portraitPath: halflingPortrait
		},
		{
			name: 'Human',
			portraitPath: humanPortrait
		},
		{
			name: 'Orc',
			portraitPath: orcPortrait
		},
		{
			name: 'Tiefling',
			portraitPath: tieflingPortrait
		}
	];

	// Get a random species
	static getRandomSpecies(): Species {
		const randomIndex = Math.floor(Math.random() * this.speciesData.length);
		const randomSpecies = this.speciesData[randomIndex];
		return new Species(randomSpecies.name, randomSpecies.portraitPath);
	}
}
