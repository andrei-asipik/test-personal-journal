import './App.css';

import Body from './layouts/Body/Body';
import LeftPannel from './layouts/LeftPannel/LeftPannel';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [items, setItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState({});

  const addItem = (item) => {
    let updatedItems;
    if (!item.id) {
      updatedItems = [
        ...items,
        {
          ...item,
          date: new Date(item.date),
          id: uuidv4()
        }
      ];
    } else {
      updatedItems = mapItems(items).map((i) =>
        i.id === item.id ? { ...item, date: new Date(item.date) } : i
      );
    }
    setItems(updatedItems);
  };

  function mapItems(items) {
    return (items || []).map((i) => ({
      ...i,
      date: new Date(i.date)
    }));
  }

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPannel>
          <Header />
          <JournalAddButton />
          <JournalList dataItems={mapItems(items)} setItem={setSelectedItem} />
        </LeftPannel>
        <Body>
          <JournalForm onSubmit={addItem} data={selectedItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
