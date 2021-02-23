import 'environment';

import pupa from 'pupa';
import every from 'every.js';
import { Client as DiscordClient } from 'discord.js';
import whisparse from 'whisparse';

import notifyNewStreams from 'scheduled';
import { findCommand } from 'db';
import { wrapHandlerFunc, getPermissionsLevel } from 'utils';

import handlers from 'handlers';

const client = new DiscordClient();
const checkInterval = Number(process.env.TWITCH_INTERVAL || '30');

client.on('ready', () => {
  console.log('Ret-2-go!');
});

client.on('message', async message => {
  if (message.author.bot) {
    return;
  }

  const parsed = whisparse(message.content);
  if (!parsed) {
    return;
  }

  console.log(parsed);

  const dbCommand = await findCommand(parsed.command);
  const dbHandler = ({ say }) => say(pupa(dbCommand.output, context));
  if (dbCommand) {
    dbHandler.command = dbCommand._id;
    Object.assign(dbHandler, dbCommand);
  }

  // eslint-disable-next-line no-param-reassign
  message.permissionsLevel = getPermissionsLevel(message);

  for (const handler of handlers.concat([wrapHandlerFunc(dbHandler)])) {
    handler({
      ...parsed,
      message,
      // This should be unnecessary, but discord.js is a truly terrible library
      say: msg => message.channel.send(msg),
      reply: msg => message.reply(msg),
    });
  }
});

every(`${checkInterval} seconds`, () => {
  notifyNewStreams(client)().catch(console.log);
});

client.login(process.env.DISCORD_BOT_TOKEN);
