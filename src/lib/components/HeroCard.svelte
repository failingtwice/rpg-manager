<script lang="ts">
	import { Character, getChracterStatByName, getAttributeDisplayName } from '$lib/logic/character';
	import { STAT_RANGES } from '$lib/logic/attributes';

	const { character }: { character: Character } = $props();

	console.log(character);

	const getStatColor = (statName: string, value: number): string => {
		const [min, max] = STAT_RANGES[statName];

		// Normalize the value between 0 and 1
		const normalized = (value - min) / (max - min);

		// Compute the Red & Green channels dynamically
		const red = Math.round(255 * (1 - normalized)); // Red decreases as stat increases
		const green = Math.round(255 * normalized); // Green increases as stat increases

		// Return RGB color
		return `rgb(${red}, ${green}, 0)`;
	};

	const getStatDivisions = (statName: string, value: number, maxDivisions: number = 20): number => {
		const [min, max] = STAT_RANGES[statName];

		// Normalize the value between 0 and 1
		const normalized = (value - min) / (max - min);

		// Calculate the number of divisions, rounded to an integer
		return Math.min(maxDivisions, Math.max(1, Math.round(normalized * maxDivisions)));
	};
</script>

<div class={`hero-card ${character.rarity}`}>
	<img src={character.portrait} alt={character.name} />
	<div class="hero-card-info">
		<h1>
			{character.name}
		</h1>

		<div class="hero-card-info-item">
			<p>{character.species.toString()}</p>
			<p>{character.archetype.toString()}</p>
		</div>

		<hr class="hero-card-divider" />

		<div class="hero-card-info-item">
			<p>{character.age} y/o</p>
			<p>{character.height}cm</p>
			<p>{character.weight}kg</p>
		</div>

		<hr class="hero-card-divider" />

		<div>
			{#each Object.keys(character.attributes)
				.sort((a, b) => {
					const normalizedA = (getChracterStatByName(character, a) - STAT_RANGES[a][0]) / (STAT_RANGES[a][1] - STAT_RANGES[a][0]);
					const normalizedB = (getChracterStatByName(character, b) - STAT_RANGES[b][0]) / (STAT_RANGES[b][1] - STAT_RANGES[b][0]);
					return normalizedB - normalizedA; // Sort by highest normalized value
				})
				.slice(0, 5) as stat}
				<div>
					<p>
						{getAttributeDisplayName(stat)}: {getChracterStatByName(character, stat)}
					</p>

					<div class="progress-block-container">
						{#each Array.from({ length: getStatDivisions(stat, getChracterStatByName(character, stat), 20) }, (_, i) => i) as block}
							<div
								class="progress-block"
								style="background-color: {getStatColor(
									stat,
									getChracterStatByName(character, stat)
								)}"
							>
								&nbsp;
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.hero-card {
		width: 220px;
		overflow: hidden;
		background-color: rgb(203, 206, 208);
	}

	.hero-card-info {
		padding: 6px;
	}

	.hero-card-divider {
		margin: 6px 0;
		border-color: #808080;
		border-width: 1px;
	}

	.hero-card-info-item {
		display: flex;
		justify-content: space-between;
	}

	.hero-card p {
		font-size: 12px;
		color: #1a1a1a;
	}

	.hero-card h1 {
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 600;
		color: #1a1a1a;
		margin-bottom: 6px;
	}

	.hero-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		height: 220px;
	}

	.progress-block {
		width: auto;
		height: 12px;
		background-color: #1a1a1a;
	}

	.progress-block-container {
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		gap: 2px;
	}
</style>
