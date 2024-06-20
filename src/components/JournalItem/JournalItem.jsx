import './JournalItem.css';

function JournalItem({ title, text, date }) {
  const validDate = new Date(date);
  const formattedDate = isNaN(validDate)
    ? 'Некорректная дата'
    : new Intl.DateTimeFormat('ru-RU').format(validDate);

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
