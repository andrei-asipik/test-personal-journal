import './App.css';
// import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';
import Body from './layouts/Body/Body';
import LeftPannel from './layouts/LeftPannel/LeftPannel';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

function App() {
  const data = [
    {
      title: 'Title 1',
      text: 'Text 1',
      date: new Date()
    },
    {
      title: 'Title 2',
      text: 'Text 212312',
      date: new Date()
    }
  ];

  return (
    <div className="app">
      <LeftPannel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton>
        </JournalList>
      </LeftPannel>
      <Body>Body</Body>
    </div>
  );
}

export default App;
