import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonHead from '../../component/common/CommonHead.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <CommonHead />
    </>
  );
};

export default HomePage;