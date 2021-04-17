import { getCollection } from 'db';

const vore = async ({ say }) => {
  const counters = await getCollection('counters');
  const now = Math.floor(Date.now() / 1000);

  let data = await counters.findOne({ name: '!vore' });

  if (data === null) {
    counters.insertOne({ name: '!vore', count: 0, timestamp: 0 });

    data = await counters.findOne({ name: '!vore' });
  }

  if (now - data.timestamp < 300) {
    say("It hasn't even been 5 minutes, you're basically still talking about vore.");
    return;
  }

  const newData = { ...data};

  newData.timestamp = now;
  newData.count += 1;
  await counters.update(data, newData, {});

  data = Object.assign(data, newData);

  const timeLabel = data.count === 1 ? 'time' : 'times';
  const admonishment = data.count === 420 ? '*Nice*.' : 'Stop it.';

  say(`We've talked about vore ${data.count} ${timeLabel} now. ${admonishment}`);
};

vore.command = 'vore';
vore.aliases = ['v0r3'];

export default vore;
