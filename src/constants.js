import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const channels = {
  GENERAL: process.env.GENERAL_CHANNEL_ID || '145655554726035456',
  NEWS: process.env.NEWS_CHANNEL_ID || '145655876735336448',
};

export const TWITCH_GAME_ID = '34072';

export const FILE_NAME = 'data.json';

export const EMBED_COLOR = '#0099ff';

export const snark = [
  'Your strats are weak',
  "Falcon could do this faster, but don't tell him I said that",
  '100% IMB is the only real 100% category',
  'Stay hydrated. This is a threat.',
  'Is this all there is to life? Posting twitch streams?',
  'If you really believe in yourself you could get a 2:32 Xedur',
  'Somebody call DwangoAC, keeper of BlueyLewis',
  "Really I'm just here for the dog pictures",
  'Call me an ambulance, because my strats are SICK!',
  'Just tuck on in underneath my lil ol flipper! You can save time that way!',
  'Memes aside, you guys are great. Keep doing you.',
  "It's not *not* frame perfect",
  'Inside the wall saves 30 years',
  'Why is this bot so mean?',
  'Write in Thomas Happ for president',
  'Shoutouts to Angi, my biggest fan!',
  'Rocket jumps are free',
  'any% YMG is a meme category, and you cannot change my mind',
  'This is a dumb category and should not be played by anyone.',
  'I feel like sending 2,000 messages right now',
  'The person reading this is a cutie!',
  'Man I wish I knew how to read',
  "I'm now backed by an actual database!",
  'JavaScript may be a terrible language, but Java is worse',
  'If you want to give my glorious creator a birthday gift, coffee is good',
  'About 12% of my code was written while drunk',
  "Don't forget to support open source projects!",
  'I am afraid of horses',
  'Seize the means of production. The only thing you have to lose is your chains.',
  'AXIOM VERGE 2 HYPE!',
  'Everybody thank Tom for making such a wonderful game',
  'Shameless plug for The Axiom goes here',
  'Remember to stay at least 6 feet away from all human beings',
  'Send more dog pics',
  'One day I hope to have a Summoning Salt video about me',
  'My CPU is melting into a pile of slag',
];
