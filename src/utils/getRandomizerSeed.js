const SEED_MAX = 9999999999; // Any postive 10 digit integer

const getRandomNumber = () => Math.floor(Math.random() * SEED_MAX);

const getRandomizerSeed = () => String(getRandomNumber()).padStart(10, '0');

export default getRandomizerSeed;
