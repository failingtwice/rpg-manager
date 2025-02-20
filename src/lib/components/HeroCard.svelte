<script lang="ts">
	import { Character } from '$lib/logic/character';
	const { character, portrait }: { character: Character; portrait: string } = $props();
</script>

<div class="rounded-lg bg-stone-200 p-4 pt-2">
	<div class="align-center flex justify-between">
		<h1>
			{character.name}
		</h1>
		<h2>{character.average}</h2>
	</div>
	<img class="mx-auto rounded-lg" src={portrait} alt={character.name} />

	<div class="mt-2 grid grid-cols-3 gap-2">
		<p class="text-center text-red-700">
			STR <br />
			<span class="font-bold">{character.attributes.strength}</span>
		</p>
		<p class="text-center text-green-700">
			DEX <br />
			<span class="font-bold">{character.attributes.dexterity}</span>
		</p>
		<p class="text-center text-slate-700">
			CON <br />
			<span class="font-bold">{character.attributes.constitution}</span>
		</p>
		<p class="text-center text-blue-700">
			INT <br />
			<span class="font-bold">{character.attributes.intelligence}</span>
		</p>
		<p class="text-center text-teal-700">
			WIS <br />
			<span class="font-bold">{character.attributes.wisdom}</span>
		</p>
		<p class="text-center text-purple-700">
			CHA <br />
			<span class="font-bold">{character.attributes.charisma}</span>
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
</style>
