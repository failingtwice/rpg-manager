import { Character } from '$lib/logic/character';

const name = $state('No name');
const roster = $state<Character[]>([]);
const gold = $state(0);

export const player = $state({
	name,
	roster,
	gold
});

player.roster.push(Character.randomCharacter());
player.roster.push(Character.randomCharacter());
player.roster.push(Character.randomCharacter());
player.roster.push(Character.randomCharacter());
player.roster.push(Character.randomCharacter());
