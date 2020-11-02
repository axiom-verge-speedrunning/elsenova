import { MongoClient } from 'mongodb';

const db = (async () => {
  const client = new MongoClient('mongodb://db:27017/elsenova', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  return client.db('elsenova');
})();

export const collection = async (name) => {
  const dbInterface = await db;
  return dbInterface.collection(name);
};

export default db;
