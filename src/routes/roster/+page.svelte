<script lang="ts">
	import { player } from '$lib/state/player.svelte';
	import HeroCard from '$lib/components/HeroCard.svelte';
	import portrait from '$lib/images/portrait.jpeg';
</script>

<p>Name: {player.name}</p>
<p>Roster size: {player.roster.length}</p>

<div>
	{#each player.roster as character}
		<HeroCard {character} {portrait} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
</style>
