import './App.css';

import Body from './layouts/Body/Body';
import LeftPannel from './layouts/LeftPannel/LeftPannel';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';
import { UserContext } from './context/user.context';

function App() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setData(data.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem('data', JSON.stringify(data));
      // console.log(JSON.stringify(data));
    }
  }, [data]);

  const onSubmit = (newDataItem) => {
    setData((dataItems) => [
      ...dataItems,
      {
        text: newDataItem.text,
        title: newDataItem.title,
        date: newDataItem.date ? new Date(newDataItem.date) : ''
      }
    ]);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div className="app">
        <LeftPannel>
          <Header />
          <JournalAddButton />
          <JournalList dataItems={data} />
        </LeftPannel>
        <Body>
          <JournalForm onSubmit={onSubmit} />
        </Body>
      </div>
    </UserContext.Provider>
  );
}

export default App;
