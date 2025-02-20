import { LifeStage } from './age';
import { Random } from './random';

export class Attributes {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;

	constructor(
		strength: number,
		dexterity: number,
		constitution: number,
		intelligence: number,
		wisdom: number,
		charisma: number
	) {
		this.strength = strength;
		this.dexterity = dexterity;
		this.constitution = constitution;
		this.intelligence = intelligence;
		this.wisdom = wisdom;
		this.charisma = charisma;
	}

	static createRandomAttributes(age: number, lifeStage: LifeStage) {
		// Ensure minimum age is 15
		if (age < 15) {
			throw new Error('Age must be at least 15');
		}

		// Bell curve function (normal distribution approximation)
		const normalRoll = (mean: number, stdDev: number) => {
			let sum = 0;
			for (let i = 0; i < 3; i++) {
				sum += Random.randomNumber(mean - stdDev, mean + stdDev);
			}
			return Math.round(sum / 3);
		};

		// Define base stat ranges for different life stages
		let strength, dexterity, constitution, intelligence, wisdom, charisma;

		switch (lifeStage) {
			case LifeStage.Youth:
				strength = normalRoll(40, 10);
				dexterity = normalRoll(45, 10);
				constitution = normalRoll(40, 10);
				intelligence = normalRoll(45, 10);
				wisdom = normalRoll(35, 10);
				charisma = normalRoll(45, 10);
				break;

			case LifeStage.Young:
				strength = normalRoll(50, 15);
				dexterity = normalRoll(55, 15);
				constitution = normalRoll(55, 15);
				intelligence = normalRoll(50, 15);
				wisdom = normalRoll(45, 15);
				charisma = normalRoll(55, 15);
				break;

			case LifeStage.Adult:
				strength = normalRoll(60, 15);
				dexterity = normalRoll(60, 15);
				constitution = normalRoll(60, 15);
				intelligence = normalRoll(55, 15);
				wisdom = normalRoll(55, 15);
				charisma = normalRoll(55, 15);
				break;

			case LifeStage.Mature:
				strength = normalRoll(55, 15);
				dexterity = normalRoll(55, 15);
				constitution = normalRoll(55, 15);
				intelligence = normalRoll(65, 15);
				wisdom = normalRoll(70, 15);
				charisma = normalRoll(65, 15);
				break;

			case LifeStage.Elderly:
				strength = normalRoll(40, 15);
				dexterity = normalRoll(40, 15);
				constitution = normalRoll(40, 15);
				intelligence = normalRoll(75, 15);
				wisdom = normalRoll(85, 15);
				charisma = normalRoll(75, 15);
				break;

			case LifeStage.Ancient:
				strength = normalRoll(30, 10);
				dexterity = normalRoll(30, 10);
				constitution = normalRoll(30, 10);
				intelligence = normalRoll(80, 15);
				wisdom = normalRoll(90, 15);
				charisma = normalRoll(80, 15);
				break;
		}

		// **BLACK SWAN EVENTS (10% Chance Each)**
		const blackSwanChance = 10;

		if (Random.randomNumber(1, 100) <= blackSwanChance) {
			if (lifeStage === LifeStage.Youth || lifeStage === LifeStage.Young) {
				// **Child Prodigy: Gains +20% to Intelligence/Wisdom**
				intelligence *= 1.2;
				wisdom *= 1.2;
			} else if (lifeStage === LifeStage.Elderly || lifeStage === LifeStage.Ancient) {
				// **Old but Athletic: Retains Adult-Level Physical Stats**
				strength = normalRoll(60, 15);
				dexterity = normalRoll(60, 15);
				constitution = normalRoll(60, 15);
			} else if (lifeStage === LifeStage.Adult) {
				// **Deteriorated Adult: Physical Decline Happens Early**
				strength *= 0.75;
				dexterity *= 0.75;
				constitution *= 0.75;
			}

			if (Random.randomNumber(1, 100) <= blackSwanChance) {
				// **Genius/Idiot (10% chance)**
				if (Random.randomNumber(1, 2) === 1) {
					// Genius: Gains +30% to Intelligence/Wisdom
					intelligence *= 1.3;
					wisdom *= 1.3;
				} else {
					// Idiot: -30% Intelligence/Wisdom
					intelligence *= 0.7;
					wisdom *= 0.7;
				}
			}
		}

		// **Ensure No Attribute Exceeds 99 or Falls Below 1**
		strength = Math.min(99, Math.max(1, Math.round(strength)));
		dexterity = Math.min(99, Math.max(1, Math.round(dexterity)));
		constitution = Math.min(99, Math.max(1, Math.round(constitution)));
		intelligence = Math.min(99, Math.max(1, Math.round(intelligence)));
		wisdom = Math.min(99, Math.max(1, Math.round(wisdom)));
		charisma = Math.min(99, Math.max(1, Math.round(charisma)));

		// Return Final Attributes
		return new Attributes(strength, dexterity, constitution, intelligence, wisdom, charisma);
	}
}
