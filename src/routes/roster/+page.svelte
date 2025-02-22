<script lang="ts">
	import { player } from '$lib/state/player.svelte';
	import HeroCard from '$lib/components/HeroCard.svelte';
	import { Character } from '$lib/logic/character';
	import Button from '$lib/components/Button.svelte';

	function addCharacter() {
		player.roster.push(Character.randomCharacter());
	}

	function clearRoster() {
		player.roster = [];
	}
</script>

<p>Name: {player.name}</p>
<p>Roster size: {player.roster.length}</p>

<Button text="Add random character" onClick={addCharacter} />
<Button text="Clear roster" onClick={clearRoster} />

<div class="roster">
	{#each player.roster as character}
		<HeroCard {character} />
	{/each}
</div>

<style>
	.roster {
		margin-top: 12px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		column-gap: 12px;
		row-gap: 12px;
	}
</style>
