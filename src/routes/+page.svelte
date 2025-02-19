<script lang="ts">
	import Character from '../logic/character';
	import { Dungeon, type DungeonResult } from '../logic/dungeon';
	import portrait from '../lib/images/portrait.jpeg';
	import dungeonImage from '../lib/images/dungeon.jpg';

	let results: DungeonResult = {
		finished: false,
		success: false,
		loot: 0,
		casualties: []
	};

	const party = [
		Character.randomCharacter(),
		Character.randomCharacter(),
		Character.randomCharacter(),
		Character.randomCharacter(),
		Character.randomCharacter()
	];
	const dungeon = new Dungeon(
		Math.floor(Math.random() * 100),
		Math.floor(Math.random() * 100),
		Math.floor(Math.random() * 100),
		Math.floor(Math.random() * 100),
		Math.floor(Math.random() * 100)
	);

	function handleClick() {
		results = dungeon.simulate(party);
	}
</script>

<section class="container">
	<div class="party-container">
		{#each party as character}
			<div class="character-card">
				<img class="character-image" src={portrait} alt={character.name} />
				<h1><b>{character.name}</b></h1>
				<p>Age: {character.age}</p>
				<p>Height: {character.height}</p>
				<p>Weight: {character.weight}</p>
				<p>Strength: {character.attributes.strength}</p>
				<p>Dexterity: {character.attributes.dexterity}</p>
				<p>Constitution: {character.attributes.constitution}</p>
				<p>Intelligence: {character.attributes.intelligence}</p>
				<p>Wisdom: {character.attributes.wisdom}</p>
				<p>Charisma: {character.attributes.charisma}</p>
			</div>
		{/each}
	</div>
	<div class="dungeon-card">
		<h1>Dungeon</h1>
		<img class="dungeon-image" src={dungeonImage} alt="Dungeon" />
		<div class="dungeon-details">
			<p>Combat Difficulty: {dungeon.combatDifficulty}</p>
			<p>Puzzle Difficulty: {dungeon.puzzleDifficulty}</p>
			<p>Stealth Difficulty: {dungeon.stealthDifficulty}</p>
			<p>Survival Difficulty: {dungeon.survivalDifficulty}</p>
			<p>Social Difficulty: {dungeon.socialDifficulty}</p>
		</div>
		<div class="dungeon-actions">
			<button class="dungeon-button" disabled={results.finished} onclick={handleClick}>
				{results.finished ? 'Finished' : 'Enter'}
			</button>
		</div>
	</div>
	{#if results.finished}
		<div class="dungeon-results">
			<p>Results</p>
			<p>Success: {results.success ? 'Yes' : 'No'}</p>
			<p>Loot: {results.loot}</p>
			<p>Casualties: {results.casualties.length}</p>
		</div>
	{/if}
</section>

<style>
	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}

	.party-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}

	.dungeon-card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		align-items: center;
		background-color: #232323;
		color: #fff;
		padding: 10px 20px;
		border-radius: 10px;
		margin: 10px;
		max-width: 360px;
	}

	.dungeon-image {
		width: 320px;
		height: 240px;
		border-radius: 12px;
		object-fit: cover;
	}

	.dungeon-details {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.dungeon-actions {
		display: flex;
		flex-direction: row;
		gap: 10px;
		background-color: #232323;
	}

	.dungeon-button {
		background-color: #cecece;
		color: #232323;
		padding: 10px 20px;
		border-radius: 10px;
		margin: 10px;
		cursor: pointer;
	}

	.dungeon-button:disabled {
		background-color: #808080;
		cursor: not-allowed;
	}

	.dungeon-button:hover {
		background-color: #f2f2f2;
	}

	.dungeon-button:active {
		background-color: #cecece;
	}

	.dungeon-results {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		background-color: #232323;
		color: #fff;
		padding: 10px 20px;
		border-radius: 10px;
		margin: 10px;
	}

	.character-card {
		background-color: #232323;
		color: #fff;
		padding: 10px 20px;
		border-radius: 10px;
		margin: 10px;
	}
	.character-card p {
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
	}

	.character-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
