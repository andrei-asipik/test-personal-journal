import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <select name="user" id="user" value={userId} onChange={changeUser}>
        <option value="1">user1</option>
        <option value="2">user2</option>
      </select>
    </>
  );
}

export default SelectUser;
