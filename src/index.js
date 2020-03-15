import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';
import { Client as DiscordClient, MessageEmbed } from 'discord.js';
import every from 'every.js';

import { channels, FILE_NAME, snark } from './constants';
import TwitchAPI from './twitch';

dotenvConfig();

const client = new DiscordClient();

client.on('message', msg => {
  if (msg.content.toLowerCase().includes('yeet')) {
    msg.channel.send('YOTE!');
  }
});

client.on('ready', () => {
  console.log('Ret-2-go!');
});

every('10 seconds', async () => {
  if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, JSON.stringify({ knownChannels: [] }));
  }

  // Get the list of known channels currently
  const fileData = JSON.parse(fs.readFileSync(FILE_NAME));

  const apiResponse = await TwitchAPI.getStreams();
  const currentlyLiveStreams = apiResponse.data.data;

  // Get the union data
  const notifyAbout = currentlyLiveStreams.filter(
    stream => !fileData.knownChannels.includes(stream.user_name),
  );

  // Write the new data back to the file
  fs.writeFileSync(
    FILE_NAME,
    JSON.stringify({ knownChannels: currentlyLiveStreams.map(s => s.user_name) }),
  );

  const newsChannel = await client.channels.fetch(channels.NEWS);

  for (const stream of notifyAbout) {
    newsChannel.send(
      new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(stream.user_name)
        .setURL(`https://twitch.tv/${stream.user_name}`)
        .setThumbnail(stream.thumbnail_url.replace('{width}', '48').replace('{height}', '48'))
        .setDescription(stream.title)
        .addFields({
          name: 'REMEMBER:',
          value: snark[Math.floor(Math.random() * snark.length)],
        })
        .setTimestamp(),
    );
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
