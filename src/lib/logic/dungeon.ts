import Character from './character';

export type DungeonResult = {
	finished: boolean;
	success: boolean;
	loot: number;
	casualties: Character[];
};

export class Dungeon {
	combatDifficulty: number;
	puzzleDifficulty: number;
	stealthDifficulty: number;
	survivalDifficulty: number;
	socialDifficulty: number;

	constructor(
		combatDifficulty: number,
		puzzleDifficulty: number,
		stealthDifficulty: number,
		survivalDifficulty: number,
		socialDifficulty: number
	) {
		this.combatDifficulty = combatDifficulty;
		this.puzzleDifficulty = puzzleDifficulty;
		this.stealthDifficulty = stealthDifficulty;
		this.survivalDifficulty = survivalDifficulty;
		this.socialDifficulty = socialDifficulty;
	}

	simulate(party: Character[]): DungeonResult {
		let combatPower = 0,
			puzzlePower = 0,
			stealthPower = 0,
			survivalPower = 0,
			socialPower = 0;
		let cooperationFactor = 0;

		// Calculate total party strength in each category
		for (const character of party) {
			combatPower +=
				character.strength * 1.5 +
				character.dexterity * 1.2 +
				character.constitution * 1.3 +
				character.luck * 1.1;
			puzzlePower += character.intelligence * 1.5 + character.wisdom * 1.2 + character.luck * 1.1;
			stealthPower +=
				character.dexterity * 1.8 + character.intelligence * 0.9 + character.luck * 1.2;
			survivalPower += character.constitution * 1.7 + character.wisdom * 1.3 + character.luck * 1.1;
			socialPower += character.charisma * 1.8 + character.wisdom * 1.2 + character.luck * 1.1;
			cooperationFactor += character.cooperation;
		}

		// Adjust difficulty based on party cooperation
		const cooperationBonus = cooperationFactor / party.length;
		const adjustedCombatDifficulty = this.combatDifficulty * (1 - cooperationBonus * 0.05);
		const adjustedPuzzleDifficulty = this.puzzleDifficulty * (1 - cooperationBonus * 0.05);
		const adjustedStealthDifficulty = this.stealthDifficulty * (1 - cooperationBonus * 0.05);
		const adjustedSurvivalDifficulty = this.survivalDifficulty * (1 - cooperationBonus * 0.05);
		const adjustedSocialDifficulty = this.socialDifficulty * (1 - cooperationBonus * 0.05);

		// Determine success in different areas
		const combatSuccess =
			(combatPower / (adjustedCombatDifficulty + 1)) * 0.8 + Math.random() * 0.2 > 0.5;
		const puzzleSuccess =
			(puzzlePower / (adjustedPuzzleDifficulty + 1)) * 0.8 + Math.random() * 0.2 > 0.5;
		const stealthSuccess =
			(stealthPower / (adjustedStealthDifficulty + 1)) * 0.8 + Math.random() * 0.2 > 0.5;
		const survivalSuccess =
			(survivalPower / (adjustedSurvivalDifficulty + 1)) * 0.8 + Math.random() * 0.2 > 0.5;
		const socialSuccess =
			(socialPower / (adjustedSocialDifficulty + 1)) * 0.8 + Math.random() * 0.2 > 0.5;

		// Overall dungeon success is based on majority of challenges passed
		const successes = [
			combatSuccess,
			puzzleSuccess,
			stealthSuccess,
			survivalSuccess,
			socialSuccess
		].filter(Boolean).length;
		const success = successes >= 3;

		// Calculate loot based on difficulty and success
		const loot = success
			? Math.round(
					(this.combatDifficulty +
						this.puzzleDifficulty +
						this.stealthDifficulty +
						this.survivalDifficulty +
						this.socialDifficulty) *
						(Math.random() * 1.5 + 0.5)
				)
			: 0;

		// Injury and casualty system based on failed areas
		const casualties: Character[] = [];
		for (const character of party) {
			let survivalChance =
				(character.constitution * 1.5 + character.luck) /
				((this.combatDifficulty + this.survivalDifficulty) * 1.2);
			if (!combatSuccess || !survivalSuccess) {
				if (Math.random() > survivalChance) {
					casualties.push(character);
				}
			}
		}

		return { finished: true, success, loot, casualties };
	}
}
