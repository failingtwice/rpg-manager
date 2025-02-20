import dragonbornPortrait from '$lib/images/portraits/dragonborn_portrait_pa.png';
import dwarfPortrait from '$lib/images/portraits/dwarf_portrait_pa.png';
import elfPortrait from '$lib/images/portraits/elf_portrait_pa.png';
import gnomePortrait from '$lib/images/portraits/gnome_portrait_pa.png';
import goliathPortrait from '$lib/images/portraits/goliath_portrait_pa.png';
import halflingPortrait from '$lib/images/portraits/halfling_portrait_pa.png';
import humanPortrait from '$lib/images/portraits/human_portrait_pa.png';
import orcPortrait from '$lib/images/portraits/orc_portrait_pa.png';
import tieflingPortrait from '$lib/images/portraits/tiefling_portrait_pa.png';
import { SpeciesName } from './species';

export function getPortrait(species: SpeciesName): string {
	switch (species) {
		case SpeciesName.Dragonborn:
			return dragonbornPortrait;
		case SpeciesName.Dwarf:
			return dwarfPortrait;
		case SpeciesName.Elf:
			return elfPortrait;
		case SpeciesName.Gnome:
			return gnomePortrait;
		case SpeciesName.Goliath:
			return goliathPortrait;
		case SpeciesName.Halfling:
			return halflingPortrait;
		case SpeciesName.Human:
			return humanPortrait;
		case SpeciesName.Orc:
			return orcPortrait;
		case SpeciesName.Tiefling:
			return tieflingPortrait;
		default:
			throw new Error('Invalid species');
	}
}
