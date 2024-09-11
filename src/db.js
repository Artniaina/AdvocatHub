import { openDB } from 'idb';

const DB_NAME = 'affaireDB';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'data';

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });
  return db;
};

export const getAllData = async () => {
  const db = await initDB();
  return db.getAll(OBJECT_STORE_NAME);
};

export const addData = async (data) => {
  const db = await initDB();
  return db.add(OBJECT_STORE_NAME, data);
};

export const updateData = async (id, data) => {
  const db = await initDB();
  return db.put(OBJECT_STORE_NAME, { ...data, id });
};

export const deleteData = async (id) => {
  const db = await initDB();
  return db.delete(OBJECT_STORE_NAME, id);
};
