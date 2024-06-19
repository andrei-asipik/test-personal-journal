import styles from './Header.module.css';

function Header({ children }) {
  return (
    <>
      <img className={styles.logo} src="/logo.svg" alt="logo" />
      {children}
    </>
  );
}

export default Header;
