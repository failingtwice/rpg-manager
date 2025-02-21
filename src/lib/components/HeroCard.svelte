<script lang="ts">
	import { Character } from '$lib/logic/character';
	import { Rarity } from '$lib/logic/rarity';
	import { STAT_RANGES } from '$lib/logic/attributes';

	const { character }: { character: Character } = $props();

	const getStatColor = (statName: string, value: number): string => {
		const [min, max] = STAT_RANGES[statName];

		// Normalize the value between 0 and 1
		const normalized = (value - min) / (max - min);

		if (normalized < 0.2) return 'text-red-600'; // Very Low (🔥 Deep Red)
		if (normalized < 0.4) return 'text-orange-500'; // Low (🟠 Orange)
		if (normalized < 0.6) return 'text-yellow-500'; // Medium (🟡 Yellow)
		if (normalized < 0.8) return 'text-lime-500'; // High (💚 Lime Green)
		return 'text-green-600'; // Very High (🟢 Deep Green)
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
		<p>
			Initiative: <span class={getStatColor('initiative', character.attributes.initiative)}
				>{character.attributes.initiative}</span
			>
		</p>
		<p>
			Health: <span class={getStatColor('health', character.attributes.health)}
				>{character.attributes.health}</span
			>
		</p>
		<p>
			Health Regen: <span class={getStatColor('healthRegen', character.attributes.healthRegen)}
				>{character.attributes.healthRegen}</span
			>
		</p>
		<p>
			Mana: <span class={getStatColor('mana', character.attributes.mana)}
				>{character.attributes.mana}</span
			>
		</p>
		<p>
			Mana Regen: <span class={getStatColor('manaRegen', character.attributes.manaRegen)}
				>{character.attributes.manaRegen}</span
			>
		</p>
		<p>
			Attack Damage: <span class={getStatColor('attackDamage', character.attributes.attackDamage)}
				>{character.attributes.attackDamage}</span
			>
		</p>
		<p>
			Crit Chance: <span class={getStatColor('critChance', character.attributes.critChance)}
				>{character.attributes.critChance}</span
			>
		</p>
		<p>
			Crit Mult: <span class={getStatColor('critMult', character.attributes.critMult)}
				>{character.attributes.critMult}</span
			>
		</p>
		<p>
			Armor: <span class={getStatColor('armor', character.attributes.armor)}
				>{character.attributes.armor}</span
			>
		</p>
		<p>
			Armor Pen: <span class={getStatColor('armorPen', character.attributes.armorPen)}
				>{character.attributes.armorPen}</span
			>
		</p>
		<p>
			Accuracy: <span class={getStatColor('accuracy', character.attributes.accuracy)}
				>{character.attributes.accuracy}</span
			>
		</p>
		<p>
			Evasion: <span class={getStatColor('evasion', character.attributes.evasion)}
				>{character.attributes.evasion}</span
			>
		</p>
		<p>
			Magic Power: <span class={getStatColor('magicPower', character.attributes.magicPower)}
				>{character.attributes.magicPower}</span
			>
		</p>
		<p>
			Magic Pen: <span class={getStatColor('magicPen', character.attributes.magicPen)}
				>{character.attributes.magicPen}</span
			>
		</p>
		<p>
			Magic Resist: <span class={getStatColor('magicResist', character.attributes.magicResist)}
				>{character.attributes.magicResist}</span
			>
		</p>
		<p>
			Status Resist: <span class={getStatColor('statusResist', character.attributes.statusResist)}
				>{character.attributes.statusResist}</span
			>
		</p>
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
