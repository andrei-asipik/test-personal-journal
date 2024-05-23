import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { v4 as uuidv4 } from 'uuid';

function JournalList({ dataItems }) {
  const sortItems = (a, b) => (a.date > b.date ? 1 : -1);

  return (
    <div className="journal-list">
      {dataItems.length === 0 ? (
        <p>Записей пока нет</p>
      ) : (
        dataItems.sort(sortItems).map((el) => {
          return (
            <CardButton key={uuidv4()}>
              <JournalItem title={el.title} text={el.text} date={el.date} />
            </CardButton>
          );
        })
      )}
    </div>
  );
}

export default JournalList;
