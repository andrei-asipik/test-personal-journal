import './CardButton.css';

function CardButton({ children, className, ...props }) {
  const resultClass = 'card-button' + (className ? ' ' + className : '');

  return (
    <button className={resultClass} {...props}>
      {children}
    </button>
  );
}

export default CardButton;
