import { getRandomizerSeed } from 'utils';

const getHashCode = s => {
  let h = 0;

  // This is hashing math and eslint doesn't like the way that's expressed
  // eslint-disable-next-line
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};

const seed = async ({ say, args, argsString }) => {
  if (args.length) {
    say(String(Math.abs(getHashCode(argsString))).padStart(10, '0'));
    return;
  }

  say(getRandomizerSeed());
};

seed.command = 'seed';
seed.aliases = ['newseed', 'convertseed', 'randoseed', 'randomizerseed'];

export default seed;
