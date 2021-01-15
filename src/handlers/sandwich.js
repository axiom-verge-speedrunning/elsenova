import { getCollection } from 'db';

const sandwich = async ({ say, argsString: item }) => {
  const sandwiches = await getCollection('sandwiches');

  const existing = await sandwiches.findOne({ name: item.toLowerCase() });
  let isSandwich = Math.random() < 0.8;

  if (existing !== null) {
    isSandwich = existing.isSandwich;
  } else {
    sandwiches.insertOne({ name: item.toLowerCase(), isSandwich });
  }

  const a = ['a', 'e', 'i', 'o', 'u'].includes(item.toLowerCase()[0]) ? 'An' : 'A';

  if (isSandwich) {
    say(`${a} ${item} is a sandwich`);
  } else {
    say(`${a} ${item} is a dumpling`);
  }
};

sandwich.command = 'sandwich';
sandwich.aliases = ['issandwich', 'isdumpling', 'dumpling', 'classify'];

export default sandwich;
