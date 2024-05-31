import './App.css';

import Body from './layouts/Body/Body';
import LeftPannel from './layouts/LeftPannel/LeftPannel';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

function App() {
  // const INITIAL_DATA = [
  //   {
  //     title: 'Title 1',
  //     text: 'Text 1',
  //     date: new Date(),
  //     tag: ''
  //   }
  // ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setData(data.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, [data]);

  const addData = (newDataItem) => {
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
    <div className="app">
      <LeftPannel>
        <Header />
        <JournalAddButton />
        <JournalList dataItems={data} />
      </LeftPannel>
      <Body>
        <JournalForm addData={addData} />
      </Body>
    </div>
  );
}

export default App;
