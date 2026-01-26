
export const saveToDB = async (key: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // DB 버전을 명시하여 스토어 생성을 확실히 함
    const request = indexedDB.open('CMStoryDB', 2);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images');
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      // 스토어가 존재하지 않을 경우를 대비해 다시 확인
      if (!db.objectStoreNames.contains('images')) {
        db.close();
        // 버전 업그레이드 강제 유도를 위해 재시도 로직이 필요할 수 있으나 여기서는 단순 에러 처리
        reject(new Error('Images store missing'));
        return;
      }

      const transaction = db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      
      // put 요청 전에 로그를 남겨 상태를 추적할 수 있음
      const putRequest = store.put(value, key);
      
      putRequest.onsuccess = () => {
        console.log(`Successfully saved ${key} to DB`);
        resolve();
      };
      
      putRequest.onerror = () => {
        console.error(`Failed to save ${key} to DB`);
        reject(new Error('Put request failed'));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = (e) => {
      console.error('IndexedDB Open Error:', e);
      reject(new Error('Failed to open IndexedDB for saving'));
    };
  });
};

export const getFromDB = async (key: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CMStoryDB', 2);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images');
      }
    };

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('images')) {
        resolve(null);
        db.close();
        return;
      }
      
      const transaction = db.transaction(['images'], 'readonly');
      const store = transaction.objectStore('images');
      const getRequest = store.get(key);
      
      getRequest.onsuccess = () => {
        resolve(getRequest.result || null);
      };
      
      getRequest.onerror = () => {
        reject(new Error('Get request failed'));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    };

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB for reading'));
    };
  });
};
