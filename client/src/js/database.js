import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  //learned how to do this from activities 23 & 24
export const putDb = async (content) => {
const textDb = await openDB('jate', 1)
const tx = textDb.transaction('jate', 'readwrite')
const store = tx.objectStore('jate')
const request = store.put({ id: 1, text: content}) //store it to same id each time
const result = await request
console.log('🚀 - data saved to the database', result);
}

export const getDb = async () => {
const textDb = await openDB('jate', 1)
const tx = textDb.transaction('jate', 'readonly')
const store = tx.objectStore('jate')
const request = store.get(1)
const result = await request
if (result) {
  console.log('Stored Text', result.text)
}
//if it doesn't exist don't return it
return result?.text;
}
initdb();
