const handler = async ({ msg, cmd, args }) => {
  if (cmd !== '!multi') {
    return;
  }

  msg.reply(`https://multitwitch.tv/${args.join('/')}`);
};

export default handler;
