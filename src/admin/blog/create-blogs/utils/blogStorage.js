const DATABASE_NAME = "flowbee_blog_storage";
const DATABASE_VERSION = 1;
const STORE_NAME = "blog_data";
const BLOGS_KEY = "custom_blogs";

const openDatabase = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const runRequest = async (mode, operation) => {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = operation(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
};

export const getStoredBlogs = async () => {
  const blogs = await runRequest("readonly", (store) => store.get(BLOGS_KEY));
  return Array.isArray(blogs) ? blogs : [];
};

export const saveStoredBlogs = (blogs) =>
  runRequest("readwrite", (store) => store.put(blogs, BLOGS_KEY));

