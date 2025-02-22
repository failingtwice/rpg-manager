export class Random {
	static randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	static randomFloat(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	static pick<T>(array: T[]): T {
		return array[Random.randomNumber(0, array.length - 1)];
	}
}
