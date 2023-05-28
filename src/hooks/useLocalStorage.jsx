// export function storageSave(theKey, storageValue) {
//   localStorage.setItem(theKey, JSON.stringify(storageValue));
// }

// export function save(theKey, storageValue) {
//   localStorage.setItem(theKey, JSON.stringify(storageValue));
// }

// export function load(theKey) {
//   try {
//     const storageValue = localStorage.getItem(theKey);
//     return JSON.parse(storageValue);
//   } catch {
//     return null;
//   }
// }

// export function remove(theKey) {
//   localStorage.removeItem(theKey);
// }

// import { useState, useEffect } from "react";

// export const useStorage = (theKey, defaultValue) => {
//   const [storageValue, setStorageValue] = useState(() => {
//     return getStorage(theKey, defaultValue);
//   });
//   useEffect(() => {
//     localStorage.setItem(theKey, JSON.stringify(storageValue));
//   }, [theKey, storageValue]);

//   return [storageValue, setStorageValue];
// };

// export default function getStorage(theKey, defaultValue) {
//   if (typeof window !== "undefined") {
//     const saved = localStorage.getItem(theKey);
//     const initial = saved !== null ? JSON.parse(saved) : defaultValue;
//     return initial;
//   }
// }

import { useState, useEffect } from "react";

// Hook
export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
