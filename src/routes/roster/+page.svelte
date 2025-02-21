<script lang="ts">
	import { player } from '$lib/state/player.svelte';
	import HeroCard from '$lib/components/HeroCard.svelte';
	import { Character } from '$lib/logic/character';

	function addCharacter() {
		player.roster.push(Character.randomCharacter());
	}

	function clearRoster() {
		player.roster = [];
	}
</script>

<p>Name: {player.name}</p>
<p>Roster size: {player.roster.length}</p>

<button on:click={addCharacter}>Add random character</button>

<button on:click={clearRoster}>Clear roster</button>

<div class="grid grid-cols-3 gap-4">
	{#each player.roster as character}
		<HeroCard {character} />
	{/each}
</div>
