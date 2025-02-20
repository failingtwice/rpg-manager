<script lang="ts">
	import { player } from '$lib/state/player.svelte';
	import HeroCard from '$lib/components/HeroCard.svelte';
	import { Character } from '$lib/logic/character';
</script>		

<p>Name: {player.name}</p>
<p>Roster size: {player.roster.length}</p>

<button on:click={() => player.roster.push(Character.randomCharacter())}>Add random character</button>

<button on:click={() => player.roster = []}>Clear roster</button>
<div class="grid grid-cols-3 gap-4">
	{#each player.roster as character}
		<HeroCard {character} />
	{/each}
</div>

