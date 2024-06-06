import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ addData }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerId = setTimeout(() => {
        console.log('очистка состояния');
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      addData(values);
    }
  }, [isFormReadyToSubmit]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT', payload: formProps });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['input-row']}>
        <input
          type="text"
          name="title"
          className={`${styles['input-title']} ${!isValid.title ? '' : styles['invalid']}`}
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
          name="date"
          id="date"
          className={`${styles['input']} ${!isValid.date ? '' : styles['invalid']}`}
        />
      </div>

      <div className={styles['input-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="./folder.svg" alt="folder" />
          <span>Метки</span>
        </label>
        <input type="text" name="tag" id="tag" className={styles['input']} />
      </div>
      <textarea
        name="text"
        className={`${styles['input']} ${styles['input-textarea']} ${
          !isValid.text ? '' : styles['invalid']
        }`}
      />
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
