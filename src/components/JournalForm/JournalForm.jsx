import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        console.log('очистка состояния');
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, onSubmit, values]);

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['input-row']}>
        <input
          type="text"
          name="title"
          value={values.title}
          ref={titleRef}
          onChange={onChange}
          className={`${styles['input-title']} ${isValid.title ? '' : styles['invalid']}`}
        />
        <img src="./archive.svg" alt="archive" />
      </div>

      <div className={styles['input-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="./calendar.svg" alt="date" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          value={values.date}
          ref={dateRef}
          name="date"
          id="date"
          onChange={onChange}
          className={`${styles['input']} ${isValid.date ? '' : styles['invalid']}`}
        />
      </div>

      <div className={styles['input-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="./folder.svg" alt="folder" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          value={values.tag}
          onChange={onChange}
          name="tag"
          id="tag"
          className={styles['input']}
        />
      </div>
      <textarea
        name="text"
        value={values.text}
        ref={textRef}
        onChange={onChange}
        className={`${styles['input']} ${styles['input-textarea']} ${
          isValid.text ? '' : styles['invalid']
        }`}
      />
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
