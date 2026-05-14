import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonHead from '../../component/common/CommonHead.jsx';
import styles from '../../less/components/Home.module.less'

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div id={styles['home-page']}>
      <CommonHead />
      <div className={styles['home-container']}>
        <div className={styles['home-content']}>
        </div>
      </div>
    </div>
  );
};

export default HomePage;