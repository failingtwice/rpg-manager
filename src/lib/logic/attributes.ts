import { Archetype } from './archetype';
import { Rarity } from './rarity';

export const ATTRIBUTE_NAMES = {
	INITIATIVE: 'initiative',
	HEALTH: 'health',
	HEALTH_REGEN: 'healthRegen',
	MANA: 'mana',
	MANA_REGEN: 'manaRegen',
	ATTACK_DAMAGE: 'attackDamage',
	CRIT_MULT: 'critMult',
	CRIT_CHANCE: 'critChance',
	ARMOR: 'armor',
	ARMOR_PEN: 'armorPen',
	ACCURACY: 'accuracy',
	EVASION: 'evasion',
	MAGIC_POWER: 'magicPower',
	MAGIC_PEN: 'magicPen',
	MAGIC_RESIST: 'magicResist',
	STATUS_RESIST: 'statusResist'
};

export const STAT_RANGES = {
	[ATTRIBUTE_NAMES.INITIATIVE]: [1, 20],
	[ATTRIBUTE_NAMES.HEALTH]: [200, 500],
	[ATTRIBUTE_NAMES.HEALTH_REGEN]: [0, 20],
	[ATTRIBUTE_NAMES.MANA]: [100, 200],
	[ATTRIBUTE_NAMES.MANA_REGEN]: [0, 20],
	[ATTRIBUTE_NAMES.ATTACK_DAMAGE]: [20, 100],
	[ATTRIBUTE_NAMES.CRIT_MULT]: [1.5, 5.0],
	[ATTRIBUTE_NAMES.CRIT_CHANCE]: [0, 50],
	[ATTRIBUTE_NAMES.ARMOR]: [5, 50],
	[ATTRIBUTE_NAMES.ARMOR_PEN]: [0, 30],
	[ATTRIBUTE_NAMES.ACCURACY]: [50, 99],
	[ATTRIBUTE_NAMES.EVASION]: [0, 40],
	[ATTRIBUTE_NAMES.MAGIC_POWER]: [20, 100],
	[ATTRIBUTE_NAMES.MAGIC_PEN]: [0, 30],
	[ATTRIBUTE_NAMES.MAGIC_RESIST]: [0, 50],
	[ATTRIBUTE_NAMES.STATUS_RESIST]: [0, 50]
};

export class Attributes {
	public initiative: number;
	public health: number;
	public healthRegen: number;
	public mana: number;
	public manaRegen: number;
	public attackDamage: number;
	public critMult: number;
	public critChance: number;
	public armor: number;
	public armorPen: number;
	public accuracy: number;
	public evasion: number;
	public magicPower: number;
	public magicPen: number;
	public magicResist: number;
	public statusResist: number;

	constructor(
		initiative: number,
		health: number,
		healthRegen: number,
		mana: number,
		manaRegen: number,
		attackDamage: number,
		critMult: number,
		critChance: number,
		armor: number,
		armorPen: number,
		accuracy: number,
		evasion: number,
		magicPower: number,
		magicPen: number,
		magicResist: number,
		statusResist: number
	) {
		this.initiative = initiative;
		this.health = health;
		this.healthRegen = healthRegen;
		this.mana = mana;
		this.manaRegen = manaRegen;
		this.attackDamage = attackDamage;
		this.critMult = critMult;
		this.critChance = critChance;
		this.armor = armor;
		this.armorPen = armorPen;
		this.accuracy = accuracy;
		this.evasion = evasion;
		this.magicPower = magicPower;
		this.magicPen = magicPen;
		this.magicResist = magicResist;
		this.statusResist = statusResist;
	}

	static createRandomAttributes(archetype: Archetype, rarity: Rarity, age: number): Attributes {
		// Aging curve (peaks at 35, slow decline after)
		const peakAge = 35;
		const decayRate = 0.0005;
		const ageFactor = Math.exp(-Math.pow(age - peakAge, 2) * decayRate);
		console.log('age', age);
		console.log('ageFactor', ageFactor);

		const attributes: Record<string, number> = {};

		// Function to generate a random stat value within a **bounded range**
		const randomStatWithBias = (min: number, max: number, bias: number): number => {
			return Math.floor(min + (max - min) * Math.pow(bias, 2));
		};

		const randomStat = (min: number, max: number): number => {
			let sum = 0;

			for (let i = 0; i < 3; i++) {
				const value = Math.floor(min + (max - min) * Math.random());
				if (value > min && value < max) {
					sum += value;
				}
			}

			sum + randomStatWithBias(min, max, ageFactor);

			return Math.floor(sum / 4);
		};

		for (const key in STAT_RANGES) {
			const [min, max] = STAT_RANGES[key];
			attributes[key] = randomStat(min, max);
		}

		return new Attributes(
			Math.floor(attributes.initiative),
			Math.floor(attributes.health),
			Math.floor(attributes.healthRegen),
			Math.floor(attributes.mana),
			Math.floor(attributes.manaRegen),
			Math.floor(attributes.attackDamage),
			Math.floor(attributes.critMult),
			Math.floor(attributes.critChance),
			Math.floor(attributes.armor),
			Math.floor(attributes.armorPen),
			Math.floor(attributes.accuracy),
			Math.floor(attributes.evasion),
			Math.floor(attributes.magicPower),
			Math.floor(attributes.magicPen),
			Math.floor(attributes.magicResist),
			Math.floor(attributes.statusResist)
		);
	}
}
