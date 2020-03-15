export const parseMsg = msg => {
  const args = msg.content.split(' ');
  const command = args.shift().toLowerCase();

  return { args, command, msg };
};
