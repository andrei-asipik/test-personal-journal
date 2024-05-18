import { useState } from 'react';
import './Button.css';

function Button() {
  const [text, setText] = useState('hI');
  const cons = () => {
    setText('123');
    // console.log(text);
  };

  return (
    <button onClick={cons} className="button accent">
      {text}
    </button>
  );
}

export default Button;
