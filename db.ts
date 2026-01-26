
const DB_NAME = 'CMStoryDB';
const DB_VERSION = 5; // 확실한 초기화를 위해 버전업
const STORE_NAME = 'images';

let dbInstance: IDBDatabase | null = null;

const getDB = (): Promise<IDBDatabase> => {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = (event: any) => {
        dbInstance = event.target.result;
        resolve(dbInstance as IDBDatabase);
      };

      request.onerror = (event: any) => {
        console.error("IndexedDB Open Error:", event.target.error);
        reject(event.target.error);
      };
    } catch (e) {
      reject(e);
    }
  });
};

export const saveToDB = async (key: string, value: string): Promise<void> => {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(value, key);

    return new Promise((resolve) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => {
        console.error(`Failed to save ${key} to DB`);
        resolve(); // 에러가 나도 앱은 돌아가게 처리
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
      request.onerror = () => resolve(null);
    });
  } catch (err) {
    console.error('[DB] Load error:', err);
    return null;
  }
};
