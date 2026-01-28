
const DB_NAME = 'CMStoryDB';
const DB_VERSION = 6; 
const STORE_NAME = 'images';

let dbPromise: Promise<IDBDatabase> | null = null;

const getDB = (): Promise<IDBDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = (event: any) => {
        resolve(event.target.result as IDBDatabase);
      };

      request.onerror = (event: any) => {
        console.error("IndexedDB Open Error:", event.target.error);
        dbPromise = null; // 에러 발생 시 재시도 가능하도록 초기화
        reject(event.target.error);
      };
    } catch (e) {
      dbPromise = null;
      reject(e);
    }
  });

  return dbPromise;
};

export const saveToDB = async (key: string, value: string): Promise<void> => {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (event: any) => {
        console.error(`[DB] Failed to save ${key}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (err) {
    console.error('[DB] Save error:', err);
  }
};

export const getFromDB = async (key: string): Promise<string | null> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => {
        console.error(`[DB] Failed to load ${key}`);
        resolve(null);
      };
    });
  } catch (err) {
    console.error('[DB] Load error:', err);
    return null;
  }
};
