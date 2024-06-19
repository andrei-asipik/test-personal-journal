import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

function SelectUser({ clearForm }) {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    clearForm();
    setUserId(Number(e.target.value));
  };

  return (
    <>
      <select
        className={styles['select']}
        name="user"
        id="user"
        value={userId}
        onChange={changeUser}
      >
        <option value="1">user1</option>
        <option value="2">user2</option>
      </select>
    </>
  );
}

export default SelectUser;
