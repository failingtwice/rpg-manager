import { Attributes, ATTRIBUTE_NAMES } from './attributes';
import { Random } from './random';

export enum Effect {
	Damage = 'damage', // lowers enemy health
	Heal = 'heal', // raises ally health
	Stun = 'stun', // enemy skips their turn
	Silence = 'silence', // enemy cannot cast spells
	Buff = 'buff', // raises ally stats
	Debuff = 'debuff' // lowers enemy stats
}

export enum Target {
	Self = 'self',
	SingleAlly = 'single ally',
	SingleEnemy = 'single enemy',
	MultipleAllies = 'multiple allies',
	MultipleEnemies = 'multiple enemies'
}

export enum Status {
	Taunted = 'taunted', // enemy is forced to attack the caster
	Stunned = 'stunned', // enemy skips their turn
	Silenced = 'silenced', // enemy cannot cast spells
	Buffed = 'buffed', // ally stats are increased
	Debuffed = 'debuffed' // enemy stats are decreased
}

export class Spell {
	public spellId: string;
	public manaCost: number;
	public effect: Effect;
	public value: number;
	public duration: number;
	public target: Target;
	public cooldown: number;
	public buffedOrDebuffedAttribute?: (typeof ATTRIBUTE_NAMES)[keyof typeof ATTRIBUTE_NAMES];

	constructor(
		spellId: string,
		manaCost: number, // how much mana the spell costs
		effect: Effect, // what the spell does
		value: number, // how much damage, health, or stat increase/decrease the spell does
		duration: number, // how many turns the spell lasts, for instant effects this is 0
		target: Target, // who the spell targets
		cooldown: number, // how many turns the spell takes to cast again
		buffedOrDebuffedAttribute?: (typeof ATTRIBUTE_NAMES)[keyof typeof ATTRIBUTE_NAMES]
	) {
		this.spellId = spellId;
		this.manaCost = manaCost;
		this.effect = effect;
		this.value = value;
		this.duration = duration;
		this.target = target;
		this.cooldown = cooldown;
		this.buffedOrDebuffedAttribute = buffedOrDebuffedAttribute;
	}
}

export class DamageSpell extends Spell {
	constructor(spellId: string, manaCost: number, value: number, target: Target) {
		super(spellId, manaCost, Effect.Damage, value, 0, target, 0);
	}

	static createRandomSpell(attributes: Attributes): DamageSpell {
		const spellId = 'damage-spell' + Random.randomNumber(1, 1000000);

		const value = Math.round(attributes.magicPower * Random.randomFloat(1.5, 3.5));
		const manaCost = Math.round(value * Random.randomFloat(0.2, 0.5));
		const target = Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);

		return new DamageSpell(spellId, manaCost, value, target);
	}
}

export class HealSpell extends Spell {
	constructor(spellId: string, manaCost: number, value: number, target: Target) {
		super(spellId, manaCost, Effect.Heal, value, 0, target, 0);
	}

	static createRandomSpell(attributes: Attributes): HealSpell {
		const spellId = 'heal-spell' + Random.randomNumber(1, 1000000);
		const value = Math.round(attributes.magicPower * Random.randomFloat(1.5, 3.5));
		const manaCost = Math.round(value * Random.randomFloat(0.2, 0.5));
		const target = Random.pick([Target.SingleAlly, Target.MultipleAllies]);

		return new HealSpell(spellId, manaCost, value, target);
	}
}

export class StunSpell extends Spell {
	constructor(spellId: string, manaCost: number, duration: number, target: Target) {
		super(spellId, manaCost, Effect.Stun, 0, duration, target, 0);
	}

	static createRandomSpell(attributes: Attributes): StunSpell {
		const spellId = 'stun-spell' + Random.randomNumber(1, 1000000);
		const duration = Random.randomNumber(1, 3);
		const manaCost = Math.round(duration * Random.randomFloat(10, 20));
		const target = Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);

		return new StunSpell(spellId, manaCost, duration, target);
	}
}

export class SilenceSpell extends Spell {
	constructor(spellId: string, manaCost: number, duration: number, target: Target) {
		super(spellId, manaCost, Effect.Silence, 0, duration, target, 0);
	}

	static createRandomSpell(attributes: Attributes): SilenceSpell {
		const spellId = 'silence-spell' + Random.randomNumber(1, 1000000);
		const duration = Random.randomNumber(1, 3);
		const manaCost = Math.round(duration * Random.randomFloat(10, 20));
		const target = Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);

		return new SilenceSpell(spellId, manaCost, duration, target);
	}
}

export class BuffSpell extends Spell {
	constructor(
		spellId: string,
		manaCost: number,
		value: number,
		target: Target,
		attribute: (typeof ATTRIBUTE_NAMES)[keyof typeof ATTRIBUTE_NAMES]
	) {
		super(spellId, manaCost, Effect.Buff, value, 0, target, 0, attribute);
	}

	static createRandomSpell(attributes: Attributes): BuffSpell {
		const spellId = 'buff-spell' + Random.randomNumber(1, 1000000);
		const value = Math.round(attributes.magicPower * Random.randomFloat(1.5, 3.5));
		const manaCost = Math.round(value * Random.randomFloat(0.2, 0.5));
		const target = Random.pick([Target.SingleAlly, Target.MultipleAllies]);
		const attribute = Random.pick(Object.values(ATTRIBUTE_NAMES));

		return new BuffSpell(spellId, manaCost, value, target, attribute);
	}
}

export class DebuffSpell extends Spell {
	constructor(
		spellId: string,
		manaCost: number,
		value: number,
		target: Target,
		attribute: (typeof ATTRIBUTE_NAMES)[keyof typeof ATTRIBUTE_NAMES]
	) {
		super(spellId, manaCost, Effect.Debuff, value, 0, target, 0, attribute);
	}

	static createRandomSpell(attributes: Attributes): DebuffSpell {
		const spellId = 'debuff-spell' + Random.randomNumber(1, 1000000);
		const value = Math.round(attributes.magicPower * Random.randomFloat(1.5, 3.5));
		const manaCost = Math.round(value * Random.randomFloat(0.2, 0.5));
		const target = Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);
		const attribute = Random.pick(Object.values(ATTRIBUTE_NAMES));

		return new DebuffSpell(spellId, manaCost, value, target, attribute);
	}
}

export const spells = [DamageSpell, HealSpell, StunSpell, SilenceSpell, BuffSpell, DebuffSpell];

export type SpellType =
	| DamageSpell
	| HealSpell
	| StunSpell
	| SilenceSpell
	| BuffSpell
	| DebuffSpell;
