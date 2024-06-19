import { useState } from 'react';

export function useLocalStorage(key, initialValue = []) {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
}
