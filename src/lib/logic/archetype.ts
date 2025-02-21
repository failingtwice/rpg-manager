import { ATTRIBUTE_NAMES } from './attributes';

export enum Archetype {
	Duelist = 'Duelist',
	Shadowblade = 'Shadowblade',
	Juggernaut = 'Juggernaut',
	Spellbreaker = 'Spellbreaker',
	Battlemage = 'Battlemage',
	Ranger = 'Ranger',
	Sorcerer = 'Sorcerer',
	Paladin = 'Paladin',
	Cleric = 'Cleric',
	Spellblade = 'Spellblade'
}

const archetypes = [
	Archetype.Duelist,
	Archetype.Shadowblade,
	Archetype.Juggernaut,
	Archetype.Spellbreaker,
	Archetype.Battlemage,
	Archetype.Ranger,
	Archetype.Sorcerer,
	Archetype.Paladin,
	Archetype.Cleric,
	Archetype.Spellblade
];

export const getRandomArchetype = (): Archetype => {
	return archetypes[Math.floor(Math.random() * archetypes.length)];
};

export const getArchetypeAttributes = (archetype: Archetype): string[] => {
	switch (archetype.toString()) {
		case Archetype.Duelist.toString():
			return [ATTRIBUTE_NAMES.ACCURACY, ATTRIBUTE_NAMES.EVASION, ATTRIBUTE_NAMES.ARMOR_PEN];
		case Archetype.Shadowblade.toString():
			return [ATTRIBUTE_NAMES.ACCURACY, ATTRIBUTE_NAMES.ATTACK_DAMAGE, ATTRIBUTE_NAMES.ARMOR_PEN];
		case Archetype.Juggernaut.toString():
			return [ATTRIBUTE_NAMES.HEALTH, ATTRIBUTE_NAMES.HEALTH_REGEN, ATTRIBUTE_NAMES.ARMOR];
		case Archetype.Spellbreaker.toString():
			return [ATTRIBUTE_NAMES.HEALTH, ATTRIBUTE_NAMES.MAGIC_RESIST, ATTRIBUTE_NAMES.STATUS_RESIST];
		case Archetype.Battlemage.toString():
			return [ATTRIBUTE_NAMES.MAGIC_POWER, ATTRIBUTE_NAMES.ATTACK_DAMAGE, ATTRIBUTE_NAMES.HEALTH];
		case Archetype.Ranger.toString():
			return [ATTRIBUTE_NAMES.ACCURACY, ATTRIBUTE_NAMES.CRIT_CHANCE, ATTRIBUTE_NAMES.ARMOR_PEN];
		case Archetype.Sorcerer.toString():
			return [ATTRIBUTE_NAMES.MAGIC_POWER, ATTRIBUTE_NAMES.MAGIC_PEN];
		case Archetype.Paladin.toString():
			return [ATTRIBUTE_NAMES.HEALTH, ATTRIBUTE_NAMES.ATTACK_DAMAGE, ATTRIBUTE_NAMES.MAGIC_RESIST];
		case Archetype.Cleric.toString():
			return [ATTRIBUTE_NAMES.HEALTH, ATTRIBUTE_NAMES.MAGIC_POWER, ATTRIBUTE_NAMES.MAGIC_RESIST];
		case Archetype.Spellblade.toString():
			return [ATTRIBUTE_NAMES.MAGIC_POWER, ATTRIBUTE_NAMES.MAGIC_PEN, ATTRIBUTE_NAMES.CRIT_CHANCE];
		default:
			throw new Error(`Unknown archetype: ${archetype}`);
	}
};
