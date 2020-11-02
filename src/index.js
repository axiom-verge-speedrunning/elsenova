import { config as dotenvConfig } from 'dotenv';
import { Client as DiscordClient } from 'discord.js';
import { notifyNewStreams } from './scheduled';
import every from 'every.js';

import { handlers, allHandlers } from './handlers';
import { parseMsg } from './handlers/utils';

import { channels } from './constants';

dotenvConfig();

const client = new DiscordClient();
const checkInterval = Number(process.env.TWITCH_INTERVAL || '30');

client.on('ready', () => {
  console.log('Ret-2-go!');
});

client.on('message', async msg => {
  const generalChannel = await client.channels.fetch(channels.GENERAL);

  let handlerList = [...allHandlers];

  if (msg.author.bot) {
    return;
  }

  if (msg.channel.id === generalChannel.id) {
    handlerList = [...handlers];
  }

  const parsed = parseMsg(msg);

  for (const handler of handlerList) {
    try {
      handler(parsed);
    } catch {}
  }
});

every(`${checkInterval} seconds`, () => {notifyNewStreams(client)().catch(console.log)});

client.login(process.env.DISCORD_BOT_TOKEN);
