
const DB_NAME = 'CMStoryDB';
const DB_VERSION = 3; // 버전 업으로 스토어 재생성 보장
const STORE_NAME = 'images';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
};

export const saveToDB = async (key: string, value: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onsuccess = () => {
        console.log(`[DB] ${key} 저장 완료`);
        resolve();
      };
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (err) {
    console.error('[DB] 저장 실패:', err);
  }
};

export const getFromDB = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      
      transaction.oncomplete = () => db.close();
    });
  } catch (err) {
    console.error('[DB] 불러오기 실패:', err);
    return null;
  }
};
