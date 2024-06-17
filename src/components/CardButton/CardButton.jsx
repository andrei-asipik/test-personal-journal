import './CardButton.css';

function CardButton({ children, className, ...props }) {
  const finalClass = 'card-button' + (className ? ' ' + className : '');
  // function getCard(e) {
  //   console.log(e.currentTarget.key);
  // }

  return (
    <button
      className={finalClass}
      {...props}
      // onClick={getCard}
    >
      {children}
    </button>
  );
}

export default CardButton;
