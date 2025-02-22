import { Character } from '$lib/logic/character';
import { Random } from '$lib/logic/random';
import { Effect, Target, spells, type SpellType } from '$lib/logic/spell';
import { Archetype } from '$lib/logic/archetype';
import type { Attributes } from './attributes';

export class SpellFactory {
	static createRandomSpell(attributes: Attributes): SpellType {
		const spell = Random.pick(spells);
		return spell.createRandomSpell(attributes);
	}

	// **Determine Effect Based on Archetype**
	static getEffectByArchetype(archetype: Archetype): Effect {
		// random for now
		return Random.pick(Object.values(Effect));

		// switch (archetype) {
		// 	case Archetype.Duelist:
		//         return
		// 	case Archetype.Shadowblade:
		// 		return Random.pick([Effect.Damage, Effect.Debuff]);
		// 	case Archetype.Juggernaut:
		// 	case Archetype.Spellbreaker:
		// 		return Random.pick([Effect.Damage, Effect.Stun, Effect.Silence]);
		// 	case Archetype.Battlemage:
		// 	case Archetype.Sorcerer:
		// 	case Archetype.Paladin:
		// 		return Random.pick([Effect.Heal, Effect.Buff]);
		// 	case Archetype.Cleric:
		// 	case Archetype.Ranger:
		// 		return Random.pick([Effect.Heal, Effect.Buff]);
		// 	case Archetype.Spellblade:
		// 		return Random.pick([Effect.Damage, Effect.Buff]);
		// 	default:
		// 		return Random.pick(Object.values(Effect)); // If unknown, pick any effect
		// }
	}

	// **Assign Spell Target Based on Effect**
	static getTargetByEffect(effect: Effect): Target {
		switch (effect) {
			case Effect.Damage:
				return Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);
			case Effect.Debuff:
				return Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);
			case Effect.Stun:
				return Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);
			case Effect.Silence:
				return Random.pick([Target.SingleEnemy, Target.MultipleEnemies]);
			case Effect.Heal:
				return Random.pick([Target.SingleAlly, Target.MultipleAllies]);
			case Effect.Buff:
				return Random.pick([Target.SingleAlly, Target.MultipleAllies]);
			default:
				throw new Error(`Unknown effect: ${effect}`);
		}
	}

	// **Determine Spell Power Based on Character Attributes**
	static getSpellValue(effect: Effect, attributes: any): number {
		switch (effect) {
			case Effect.Damage:
				return Math.round(attributes.attackDamage * Random.randomFloat(0.5, 2));
			case Effect.Heal:
				return Math.round(attributes.magicPower * Random.randomFloat(0.5, 1.5));
			case Effect.Stun:
			case Effect.Silence:
				return Random.randomNumber(1, 3); // Short duration effects
			case Effect.Buff:
			case Effect.Debuff:
				return Random.randomNumber(5, 20); // % Increase or Decrease
			default:
				return 10;
		}
	}

	// **Set Effect Duration**
	static getEffectDuration(effect: Effect): number {
		switch (effect) {
			case Effect.Buff:
				return Random.randomNumber(1, 3);
			case Effect.Debuff:
				return Random.randomNumber(2, 5); // Buffs & debuffs last longer
			case Effect.Stun:
			case Effect.Silence:
				return Random.randomNumber(1, 2); // Short durations
			default:
				return 0; // Instant effect
		}
	}

	// **Generate Spell Name Based on Effect**
	static generateSpellName(effect: Effect): string {
		const names = {
			[Effect.Damage]: ['Fireball', 'Lightning Strike', 'Shadow Slash'],
			[Effect.Heal]: ['Holy Light', 'Divine Restoration', 'Healing Surge'],
			[Effect.Stun]: ['Thunder Shock', 'Frozen Prison', 'Earthquake'],
			[Effect.Silence]: ['Arcane Mute', 'Seal of Silence', 'Word of Stillness'],
			[Effect.Buff]: ['Battle Cry', 'Arcane Infusion', 'Divine Blessing'],
			[Effect.Debuff]: ['Curse of Weakness', 'Plague Touch', 'Hex of Frailty']
		};

		return Random.pick(names[effect]);
	}
}
