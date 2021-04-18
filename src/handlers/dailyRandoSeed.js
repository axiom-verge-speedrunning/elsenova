import { MessageEmbed } from 'discord.js';
import { getCollection } from 'db';

import { RANDO_NEWS_CHANNEL_ID, EMBED_COLOR } from 'constants';
import { getRandomizerSeed } from 'utils';

const dailyRandoSeed = async ({ client }) => {
  const seeds = await getCollection('seeds');
  const now = new Date();
  let existing = true;
  let seed = '';

  while (existing) {
    seed = getRandomizerSeed();
    existing = await seeds.findOne({ _id: seed });
  }

  const month = now.toLocaleString('default', { month: 'long' });

  const dateString = `${now.getDate()} ${month} ${now.getFullYear()}`;

  const newsChannel = await client.channels.fetch(RANDO_NEWS_CHANNEL_ID);
  await newsChannel.send(
    new MessageEmbed()
      .setColor(EMBED_COLOR)
      .setTitle(`Daily Randomizer Seed!`)
      .setDescription('<@&823674572855181332>')
      .addFields(
        { name: 'Seed', value: seed, inline: true },
        { name: 'Date', value: dateString, inline: true },
      )
      .setTimestamp(),
  );
  await seeds.insertOne({ _id: seed, created: now.valueOf() });
};

dailyRandoSeed.command = 'triggerrandoseed';
dailyRandoSeed.permissionsLevel = PermissionsLevel.MOD;

export default dailyRandoSeed;
