import Datastore from 'nedb-promises';

const db = Datastore.create('datastore.db');

db.persistence.setAutocompactionInterval(5000);

export default db;
