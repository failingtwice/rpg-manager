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
	private _initiative: number;
	private _health: number;
	private _healthRegen: number;
	private _mana: number;
	private _manaRegen: number;
	private _attackDamage: number;
	private _critMult: number;
	private _critChance: number;
	private _armor: number;
	private _armorPen: number;
	private _accuracy: number;
	private _evasion: number;
	private _magicPower: number;
	private _magicPen: number;
	private _magicResist: number;
	private _statusResist: number;

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
		this._initiative = initiative;
		this._health = health;
		this._healthRegen = healthRegen;
		this._mana = mana;
		this._manaRegen = manaRegen;
		this._attackDamage = attackDamage;
		this._critMult = critMult;
		this._critChance = critChance;
		this._armor = armor;
		this._armorPen = armorPen;
		this._accuracy = accuracy;
		this._evasion = evasion;
		this._magicPower = magicPower;
		this._magicPen = magicPen;
		this._magicResist = magicResist;
		this._statusResist = statusResist;
	}

	public get initiative() {
		return this._initiative;
	}

	public get health() {
		return this._health;
	}

	public get healthRegen() {
		return this._healthRegen;
	}

	public get mana() {
		return this._mana;
	}

	public get manaRegen() {
		return this._manaRegen;
	}

	public get attackDamage() {
		return this._attackDamage;
	}

	public get critMult() {
		return this._critMult;
	}

	public get critChance() {
		return this._critChance;
	}

	public get armor() {
		return this._armor;
	}

	public get armorPen() {
		return this._armorPen;
	}

	public get accuracy() {
		return this._accuracy;
	}

	public get evasion() {
		return this._evasion;
	}

	public get magicPower() {
		return this._magicPower;
	}

	public get magicPen() {
		return this._magicPen;
	}

	public get magicResist() {
		return this._magicResist;
	}

	public get statusResist() {
		return this._statusResist;
	}

	static serialize(attributes: Attributes): string {
		return JSON.stringify({
			initiative: attributes.initiative,
			health: attributes.health,
			healthRegen: attributes.healthRegen,
			mana: attributes.mana,
			manaRegen: attributes.manaRegen,
			attackDamage: attributes.attackDamage,
			critMult: attributes.critMult,
			critChance: attributes.critChance,
			armor: attributes.armor,
			armorPen: attributes.armorPen,
			accuracy: attributes.accuracy,
			evasion: attributes.evasion,
			magicPower: attributes.magicPower,
			magicPen: attributes.magicPen,
			magicResist: attributes.magicResist,
			statusResist: attributes.statusResist
		});
	}

	static deserialize(attributesData: string): Attributes {
		const data = JSON.parse(attributesData);

		return new Attributes(
			data.initiative,
			data.health,
			data.healthRegen,
			data.mana,
			data.manaRegen,
			data.attackDamage,
			data.critMult,
			data.critChance,
			data.armor,
			data.armorPen,
			data.accuracy,
			data.evasion,
			data.magicPower,
			data.magicPen,
			data.magicResist,
			data.statusResist
		);
	}

	static createRandomAttributes(archetype: Archetype, rarity: Rarity, age: number): Attributes {
		// Aging curve (peaks at 35, slow decline after)
		const peakAge = 35;
		const decayRate = 0.03;
		const ageFactor = Math.exp(-((age - peakAge) ** 2) * decayRate);

		const attributes: Record<string, number> = {};

		// Function to generate a random stat value within a **bounded range**
		const randomStat = (min: number, max: number): number => {
			return Math.random() * (max - min + 1) + min;
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
