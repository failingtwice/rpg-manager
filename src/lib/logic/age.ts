import { Random } from './random';

export enum LifeStage {
	Youth = 15,
	Young = 22,
	Adult = 35,
	Mature = 50,
	Elderly = 70,
	Ancient = 80
}

export const lifeStages = [
	LifeStage.Youth,
	LifeStage.Young,
	LifeStage.Adult,
	LifeStage.Mature,
	LifeStage.Elderly,
	LifeStage.Ancient
];

export function getRandomLifeStage(): LifeStage {
	const lifeStage = lifeStages[Random.randomNumber(0, lifeStages.length - 1)];
	return lifeStage;
}

export function getRandomAge(lifeStage: LifeStage): number {
	const nextLifeStage = lifeStages[lifeStages.indexOf(lifeStage) + 1];
	const age = Random.randomNumber(lifeStage, nextLifeStage);

	return age;
}
