import db from '../db';

const dab = async ({ msg }) => {
  // https://clips.twitch.tv/BeautifulLittleMetalRlyTho
  if (!msg.contains('dab')) {
    return;
  }

  msg.reply('https://clips.twitch.tv/BeautifulLittleMetalRlyTho');
};

const yeet = async ({ msg }) => {
  if (!msg.contains('yeet')) {
    return;
  }

  msg.channel.send('YOTE!');
};

const sandwich = async ({ msg, command, args }) => {
  if (!msg.contains('sandwich')) {
    return;
  }

  if (command === '!sandwich') {
    if (args.length > 3) {
      msg.reply("There's too many things for me to check here, but they're probably sandwiches.");
      return;
    }

    for (const arg of args) {
      const existing = await db.sandwiches.findOne({ name: arg.toLowerCase() });
      let isSandwich = Math.random() < 0.8;

      if (existing !== null) {
        isSandwich = existing.isSandwich;
      } else {
        db.sandwiches.insert({ name: arg.toLowerCase(), isSandwich });
      }

      if (isSandwich) {
        msg.channel.send(`A "${arg}" is a sandwich`);
      } else {
        msg.channel.send(`A "${arg}" is not a sandwich, I guess`);
      }
    }
  }
};

const vore = async ({ msg, command }) => {
  if (command !== '!vore') {
    return;
  }

  const now = Math.floor(Date.now() / 1000);

  let data = await db.counters.findOne({ name: command });

  if (data === null) {
    db.counters.insert({ name: command, count: 0, timestamp: 0 });

    data = await db.counters.findOne({ name: command });
  }

  if (now - timestamp < 300) {
    msg.channel.send("It hasn't even been 5 minutes, you're basically still talking about vore.");
    return;
  }

  data.timestamp = now;
  data.count += 1;
  db.counters.update(data);

  const timeLabel = data.count === 1 ? 'time' : 'times';

  msg.channel.send(`We've talked about vore ${data.count} ${timeLabel} now. Stop it.`);
};

const handlers = [dab, yeet, sandwich, vore];

export default handlers;