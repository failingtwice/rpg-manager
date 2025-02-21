export const MIN_AGE = 15;
export const MAX_AGE = 60;

export function getRandomAge(): number {
	// Generate a biased age: Squaring the random number makes lower values more frequent
	let age = Math.floor(MIN_AGE + Math.pow(Math.random(), 2) * (MAX_AGE - MIN_AGE));

	return Math.max(MIN_AGE, age);
}

export function getRandomDevelopmentCurve(): number[] {
	// Random peak age between 25 and 45
	const peakAge = Math.floor(Math.random() * (45 - 25 + 1)) + 25;

	// Random decay rate to control how fast potential drops (varies per hero)
	const decayRate = Math.random() * 0.002 + 0.003; // 0.003 to 0.005 for variance

	// Random starting potential (ensures a non-zero start)
	const startPotential = Math.random() * 0.3 + 0.3; // Between 0.3 and 0.6

	// Random ending potential (ensures a non-zero end)
	const endPotential = Math.random() * 0.2 + 0.7; // Between 0.7 and 0.9

	// Random peak height (not all heroes reach a perfect 1.0 peak)
	const peakPotential = Math.random() * 0.2 + 0.9; // Between 0.9 and 1.1

	// Controls how long the peak lasts (some maintain peak power longer)
	const peakWidth = Math.random() * 10 + 5; // Peaks last between 5-15 years

	// Function to generate a smooth rise and fall
	return Array.from({ length: MAX_AGE }, (_, age) => {
		const normalizedAge = age + 1;

		// Gaussian-like curve with longer peaks
		let ageFactor = Math.exp(-Math.pow((normalizedAge - peakAge) / peakWidth, 2) * decayRate);

		// Scale to peak potential
		ageFactor *= peakPotential;

		// Adjust start and end to ensure smooth transitions
		const transitionFactor = (normalizedAge - 1) / (MAX_AGE - 1);
		ageFactor = startPotential * (1 - transitionFactor) + ageFactor * transitionFactor;
		ageFactor = endPotential * transitionFactor + ageFactor * (1 - transitionFactor);

		return parseFloat(ageFactor.toFixed(3)); // Keep values clean
	});
}
