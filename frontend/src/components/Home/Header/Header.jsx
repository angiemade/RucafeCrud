import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import logo from '../../../assets/Logo.png'

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.Header}>
      <div className={styles['Logo-container']} onClick={() => navigate('/')}>
        <img src={logo} alt='Logo' />
      </div>
    </header>
  );
}
