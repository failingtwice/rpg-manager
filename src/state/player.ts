import { writable } from 'svelte/store';
import { Character } from '../lib/logic/character';

const roster = $state<Character[]>([]);
const gold = $state(0);

export const player = $state({
	roster,
	gold
});
