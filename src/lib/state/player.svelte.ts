import { Character } from '$lib/logic/character';
import { persistate } from '$lib/state/persistate.svelte';

type Player = {
	name: string,
	roster: Character[],
	gold: number
}

export const player = persistate<Player>('player', {
	name: "Player",
	roster: [],
	gold: 0
});
