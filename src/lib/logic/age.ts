import { Random } from './random';

export function getRandomAge(): number {
	// Generate two random numbers between 15 and 60, then average them.
	const age = Math.round((Random.randomNumber(15, 60) + Random.randomNumber(15, 60)) / 2);
	return age;
}
