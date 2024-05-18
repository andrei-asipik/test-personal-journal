import './CardButton.css';

function CardButton({ children, className }) {
  const finalClass = 'card-button' + (className ? ' ' + className : '');

  return <button className={finalClass}>{children}</button>;
}

export default CardButton;
