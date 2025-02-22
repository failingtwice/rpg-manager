import { SpeciesName } from './species';
import { Random } from './random';

// Define type for module imports
type ModuleType = {
	default: string;
};

// Create portrait maps for each species with proper typing
const portraitMap: Record<SpeciesName, string[]> = {
	[SpeciesName.Dragonborn]: [],
	[SpeciesName.Dwarf]: [],
	[SpeciesName.Elf]: [],
	[SpeciesName.Gnome]: [],
	[SpeciesName.Goliath]: [],
	[SpeciesName.Halfling]: [],
	[SpeciesName.Human]: [],
	[SpeciesName.Orc]: [],
	[SpeciesName.Tiefling]: []
};

// Use Vite's import.meta.glob with type annotation
const portraitFiles: Record<string, ModuleType> = import.meta.glob(
	'$lib/images/portraits/**/*.png',
	{ eager: true }
) as Record<string, ModuleType>;

// Sort portraits into their respective arrays
for (const path in portraitFiles) {
	const portrait = portraitFiles[path].default;

	if (path.includes('Dragonborn_Portraits')) {
		portraitMap[SpeciesName.Dragonborn].push(portrait);
	} else if (path.includes('Dwarf_Portraits')) {
		portraitMap[SpeciesName.Dwarf].push(portrait);
	} else if (path.includes('Elf_Portraits')) {
		portraitMap[SpeciesName.Elf].push(portrait);
	} else if (path.includes('Gnome_Portraits')) {
		portraitMap[SpeciesName.Gnome].push(portrait);
	} else if (path.includes('Goliath_Portraits')) {
		portraitMap[SpeciesName.Goliath].push(portrait);
	} else if (path.includes('Halfling_Portraits')) {
		portraitMap[SpeciesName.Halfling].push(portrait);
	} else if (path.includes('Human_Portraits')) {
		portraitMap[SpeciesName.Human].push(portrait);
	} else if (path.includes('Orc_Portraits')) {
		portraitMap[SpeciesName.Orc].push(portrait);
	} else if (path.includes('Tiefling_Portraits')) {
		portraitMap[SpeciesName.Tiefling].push(portrait);
	}
}

export function getRandomPortrait(species: SpeciesName): string {
	const portraits = portraitMap[species];
	if (!portraits || portraits.length === 0) {
		throw new Error(`No portraits found for species: ${species}`);
	}
	return Random.pick(portraits);
}

export function getDefaultPortrait(species: SpeciesName): string {
	const portraits = portraitMap[species];
	if (!portraits || portraits.length === 0) {
		throw new Error(`No portraits found for species: ${species}`);
	}
	return portraits[0];
}
