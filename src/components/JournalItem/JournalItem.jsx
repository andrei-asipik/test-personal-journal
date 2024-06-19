import './JournalItem.css';

function JournalItem({ title, text, date }) {
  let formattedDate;

  if (date instanceof Date && !isNaN(date)) {
    formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);
  } else {
    formattedDate = 'Некорректная дата';
  }

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formattedDate}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </>
  );
}

export default JournalItem;
