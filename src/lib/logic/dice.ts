export default class Dice {
	private static roll(sides: number): number {
		return Math.floor(Math.random() * sides) + 1;
	}

	static d4(): number {
		return this.roll(4);
	}

	static d6(): number {
		return this.roll(6);
	}

	static d10(): number {
		return this.roll(10);
	}

	static d12(): number {
		return this.roll(12);
	}

	static d20(): number {
		return this.roll(20);
	}

	static d100(): number {
		return this.roll(100);
	}

	static d(sides: number): number {
		return this.roll(sides);
	}
}
