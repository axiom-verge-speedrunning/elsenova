import Datastore from 'nedb-promises';

const db = {};

// Keeping old filename for legacy purposes
db.streams = Datastore.create('datastore.db');
db.sandwiches = Datastore.create('sandwiches.db');
db.counters = Datastore.create('counters.db');

db.sandwiches.ensureIndex({ fieldName: 'name' });
db.sandwiches.ensureIndex({ fieldName: 'isSandwich' });

for (const database of Object.values(db)) {
  database.persistence.setAutocompactionInterval(5000);
}

export default db;
