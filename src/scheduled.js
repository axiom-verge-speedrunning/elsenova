import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';
import { MessageEmbed } from 'discord.js';

import { channels, FILE_NAME, snark, EMBED_COLOR } from './constants';
import TwitchAPI from './twitch';

dotenvConfig();

export const notifyNewStreams = client => async () => {
  // Don't send any messages if we're testing
  if (process.env.DEBUG) {
    return;
  }

  if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, JSON.stringify({ knownChannels: {} }));
  }

  // Get the list of known channels currently
  const fileData = JSON.parse(fs.readFileSync(FILE_NAME));

  const apiResponse = await TwitchAPI.getStreams();
  const currentlyLiveStreams = apiResponse.data.data;

  // Get the union data
  const notifyAbout = currentlyLiveStreams.filter(
    stream => !fileData.knownChannels.hasOwnProperty(stream.user_name),
  );

  // Get the inverse of that union
  const deleteMessageIds = Object.entries(fileData.knownChannels).reduce(
    (acc, [userName, messageId]) => {
      const liveUserNames = currentlyLiveStreams.map(s => s.user_name);

      if (!liveUserNames.includes(userName)) {
        return acc.concat([messageId]);
      }

      return acc;
    },
    [],
  );

  const newsChannel = await client.channels.fetch(channels.NEWS);
  const knownChannels = {};

  try {
    const messagesToDelete = await newsChannel.awaitMessages(m => deleteMessageIds.includes(m.id));

    for (const m of messagesToDelete) {
      await m.delete();
    }
  } catch {
    console.log('Error deleting messages');
  }

  for (const stream of notifyAbout) {
    try {
      const message = await newsChannel.send(
        new MessageEmbed()
          .setColor(EMBED_COLOR)
          .setTitle(stream.user_name)
          .setURL(`https://twitch.tv/${stream.user_name}`)
          .setThumbnail(stream.thumbnail_url.replace('{width}', '72').replace('{height}', '72'))
          .setDescription(stream.title)
          .addFields({
            name: 'REMEMBER:',
            value: snark[Math.floor(Math.random() * snark.length)],
          })
          .setTimestamp(),
      );

      knownChannels[stream.user_name] = message.id;
    } catch {
      console.log(`Error notifying about ${stream.user_name}`);
    }
  }

  // Write the new data back to the file
  fs.writeFileSync(FILE_NAME, JSON.stringify({ knownChannels }));
};
