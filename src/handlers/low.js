import { MessageAttachment } from 'discord.js';

const handler = ({ msg, command }) => {
  if (!['!low', '!low%'].includes(command)) {
    return;
  }

  const attachment = new MessageAttachment('./assets/low.png');

  msg.channel.send(attachment);
};

export default handler;
