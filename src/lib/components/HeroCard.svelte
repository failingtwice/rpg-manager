<script lang="ts">
	import { Character, getChracterStatByName, getAttributeDisplayName } from '$lib/logic/character';
	import { Rarity } from '$lib/logic/rarity';
	import { STAT_RANGES } from '$lib/logic/attributes';

	const { character }: { character: Character } = $props();

	const getStatColor = (statName: string, value: number): string => {
		const [min, max] = STAT_RANGES[statName];

		// Normalize the value between 0 and 1
		const normalized = (value - min) / (max - min);

		let className = 'text-left text-white p-1 rounded-lg mb-1 ';

		if (normalized < 0.2) {
			className += 'bg-red-700'; // Very Low (🔥 Deep Red)
		} else if (normalized < 0.4) {
			className += 'bg-orange-700'; // Low (🟠 Orange)
		} else if (normalized < 0.6) {
			className += 'bg-yellow-700'; // Medium (🟡 Yellow)
		} else if (normalized < 0.8) {
			className += 'bg-lime-700'; // High (💚 Lime Green)
		} else {
			className += 'bg-green-700'; // Very High (🟢 Deep Green)
		}

		return className;
	};
</script>

<div
	class="w-156px rounded-lg p-4 pt-2"
	class:bg-stone-200={character.rarity === Rarity.Common}
	class:bg-sky-200={character.rarity === Rarity.Uncommon}
	class:bg-orange-200={character.rarity === Rarity.Rare}
	class:bg-purple-200={character.rarity === Rarity.Legendary}
>
	<div class="align-center flex justify-between">
		<h1 class="whitespace-nowrap">
			{character.name}
		</h1>
	</div>
	<img class="mx-auto rounded-lg" src={character.portrait} alt={character.name} />

	<div>
		<p>
			Species: {character.species.toString()}
		</p>
		<p>
			Age: {character.age}
		</p>
		<p>
			Archetype: {character.archetype.toString()}
		</p>
	</div>

	<div class="mt-2">
		{#each Object.keys(character.attributes) as stat}
			<div>
				<p class={getStatColor(stat, getChracterStatByName(character, stat))}>
					{getAttributeDisplayName(stat)}: {getChracterStatByName(character, stat)}
				</p>
			</div>
		{/each}
	</div>
	<hr class="my-2 bg-stone-400" />
	<div class="flex justify-between">
		<p class="text-center text-yellow-700">
			LCK <span class="font-bold">{character.luck}</span>
		</p>
		<p class="text-center text-sky-700">
			COOP <span class="font-bold">{character.cooperation}</span>
		</p>
	</div>
</div>

<style>
	p span {
		font-size: 20px;
	}
</style>
