import './App.css';

import Body from './layouts/Body/Body';
import LeftPannel from './layouts/LeftPannel/LeftPannel';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';

function App() {
  const [items, setItems] = useLocalStorage('data');

  const onSubmit = (item) => {
    let updatedItems;
    if (!item.id) {
      updatedItems = [
        ...items,
        {
          ...item,
          date: new Date(item.date)
        }
      ];
    } else {
      updatedItems = items.map((i) =>
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
          <JournalList dataItems={mapItems(items)} />
        </LeftPannel>
        <Body>
          <JournalForm onSubmit={onSubmit} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
