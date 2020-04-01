const handler = async ({ msg, command, args }) => {
  if (command !== '!multi') {
    return;
  }

  msg.reply(`https://multitwitch.tv/${args.join('/')}`);
};

export default handler;
