export const parseMsg = msg => {
  const args = msg.content.split(' ');
  const command = args.shift().toLowerCase();

  msg.contains = substr => msg.content.toLowerCase().includes(substr);

  return { args, command, msg };
};
