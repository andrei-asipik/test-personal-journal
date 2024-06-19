import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function JournalList({ dataItems, setItem }) {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => (a.date > b.date ? 1 : -1);

  const filteredItems = dataItems.filter((el) => el.userId === userId).sort(sortItems);

  return (
    <div className="journal-list">
      {filteredItems.length === 0 ? (
        <p>Записей пока нет</p>
      ) : (
        filteredItems.map((el) => (
          <CardButton key={el.id} onClick={() => setItem(el)}>
            <JournalItem title={el.title} text={el.text} date={el.date} />
          </CardButton>
        ))
      )}
    </div>
  );
}

export default JournalList;
