import styles from './Input.module.css';
import { forwardRef } from 'react';
import classNames from 'classnames';

const Input = forwardRef(function Input({ className, isValid = true, appearence, ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(className, styles['input'], {
        [styles['input-title']]: appearence === 'title',
        [styles['invalid']]: !isValid
      })}
    />
  );
});

export default Input;
