import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';
import { MessageEmbed } from 'discord.js';

import { channels, FILE_NAME, snark, EMBED_COLOR } from './constants';
import TwitchAPI from './twitch';

import { collection } from './db';

dotenvConfig();

export const notifyNewStreams = (client) => async () => {
  // Don't send any messages if we're testing
  if (process.env.DEBUG) {
    return;
  }
  const streams = await collection('streams');

  const apiResponse = await TwitchAPI.getStreams();
  const currentlyLiveStreams = apiResponse.data.data;
  const liveStreamNames = currentlyLiveStreams.map((s) => s.user_name);

  const knownStreams = await streams.find({});
  const knownStreamNames = knownStreams.map((s) => s.userName);

  // Get the union data
  const notifyAbout = currentlyLiveStreams.filter(
    (stream) => !knownStreamNames.includes(stream.user_name),
  );

  // Get the inverse of that union
  const deleteStreams = knownStreams.filter((stream) => !liveStreamNames.includes(stream.userName));

  const newsChannel = await client.channels.fetch(channels.NEWS);

  try {
    for (const stream of deleteStreams) {
      const message = await newsChannel.messages.fetch(stream.messageId, false);
      message.delete();

      await streams.remove(stream);
    }
  } catch (err) {
    console.log('Error deleting messages');
    console.log(err);
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

      await streams.insert({ userName: stream.user_name, messageId: message.id });
    } catch (err) {
      console.log(`Error notifying about ${stream.user_name}`);
      console.log(err);
    }
  }
};
