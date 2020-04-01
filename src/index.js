import { config as dotenvConfig } from 'dotenv';
import { Client as DiscordClient } from 'discord.js';
import { notifyNewStreams } from './scheduled';
import every from 'every.js';

import handlers from './handlers';
import { parseMsg } from './handlers/utils';

dotenvConfig();

const client = new DiscordClient();
const checkInterval = Number(process.env.TWITCH_INTERVAL || '30');

client.on('ready', () => {
  console.log('Ret-2-go!');
});

client.on('message', msg => {
  if (msg.author.bot) {
    return;
  }

  const parsed = parseMsg(msg);

  for (const handler of handlers) {
    try {
      handler(parsed);
    } catch {}
  }
});

every(`${checkInterval} seconds`, notifyNewStreams(client));

client.login(process.env.DISCORD_BOT_TOKEN);
