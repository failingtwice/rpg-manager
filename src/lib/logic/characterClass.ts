import { Attribute } from './attributes';

export enum CharacterClass {
	Barbarian = 'Barbarian',
	Bard = 'Bard',
	Cleric = 'Cleric',
	Druid = 'Druid',
	Fighter = 'Fighter',
	Monk = 'Monk',
	Paladin = 'Paladin',
	Ranger = 'Ranger',
	Rogue = 'Rogue',
	Sorcerer = 'Sorcerer',
	Warlock = 'Warlock',
	Wizard = 'Wizard'
}

const characterClasses = [
	CharacterClass.Barbarian,
	CharacterClass.Bard,
	CharacterClass.Cleric,
	CharacterClass.Druid,
	CharacterClass.Fighter,
	CharacterClass.Monk,
	CharacterClass.Paladin,
	CharacterClass.Ranger,
	CharacterClass.Rogue,
	CharacterClass.Sorcerer,
	CharacterClass.Warlock,
	CharacterClass.Wizard
];

export function getRandomCharacterClass(): CharacterClass {
	return characterClasses[Math.floor(Math.random() * characterClasses.length)];
}
