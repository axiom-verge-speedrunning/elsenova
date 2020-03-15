import fs from 'fs';
import { config as dotenvConfig } from 'dotenv';
import { Client as DiscordClient, MessageEmbed } from 'discord.js';
import every from 'every.js';

import { channels, FILE_NAME } from './constants';
import TwitchAPI from './twitch';

dotenvConfig();

const client = new DiscordClient();

client.on('message', msg => {
  if (msg.content.toLowerCase().includes('yeet')) {
    msg.reply('YOTE!');
  }
});

client.on('ready', () => {
  console.log('Ret-2-go!');
});

every('5 minutes', async () => {
  if (!fs.existsSync(FILE_NAME)) {
    fs.writeFileSync(FILE_NAME, JSON.stringify({ knownChannels: [] }));
  }

  // Get the list of known channels currently
  const fileData = JSON.parse(fs.readFileSync(FILE_NAME));

  const apiResponse = await TwitchAPI.getStreams();
  const currentlyLiveStreams = apiResponse.data.data.map(stream => stream.user_name);

  // Get the union data
  const notifyAbout = currentlyLiveStreams.filter(
    stream => !fileData.knownChannels.includes(stream),
  );

  // Write the new data back to the file
  fs.writeFileSync(FILE_NAME, JSON.stringify({ knownData: currentlyLiveStreams }));

  const newsChannel = await client.channels.fetch(channels.NEWS);

  for (const stream of notifyAbout) {
    newsChannel.send(
      new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(stream)
        .setURL(`https://twitch.tv/${stream}`)
        .setDescription('...is now playing Axiom Verge on Twitch! Go say hi!'),
    );
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
