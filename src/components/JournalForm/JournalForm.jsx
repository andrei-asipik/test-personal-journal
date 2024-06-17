import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useEffect, useReducer, useRef, useContext } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

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
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data]);

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
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReadyToSubmit, onSubmit, values, userId]);

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      {userId}
      <div className={styles['input-row']}>
        <Input
          type="text"
          name="title"
          value={values.title}
          ref={titleRef}
          onChange={onChange}
          isValid={isValid.title}
          appearence={'title'}
        />
        <img src="./archive.svg" alt="archive" />
      </div>

      <div className={styles['input-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="./calendar.svg" alt="date" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          ref={dateRef}
          name="date"
          id="date"
          isValid={isValid.date}
          onChange={onChange}
        />
      </div>

      <div className={styles['input-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="./folder.svg" alt="folder" />
          <span>Метки</span>
        </label>
        <Input type="text" value={values.tag} onChange={onChange} name="tag" id="tag" />
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
