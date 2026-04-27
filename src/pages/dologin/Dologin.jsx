import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonMessage from '../../component/common/CommonMessage.jsx';


import styles from '../../less/components/dologin.module.less';
const Dologin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(username, password);
    if (username === '' || password === '') {
      return CommonMessage('请输入用户名和密码', '', 'warning');
    }
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/home');
    return CommonMessage('登录成功', '当前身份:游客', 'success');
  };

  return (
    <div className={styles['dologin']}>
      <div className={styles['dologin-body']}>
        <div className={styles['dologin-img']}></div>
        <div className={styles['dologin-content']}>
          <div>
            <label>用户：</label>
            <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} placeholder='请输入用户名' />
          </div>
          <div>
            <label>密码：</label>
            <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} placeholder='请输入密码' />
          </div>
          <div>
            <button className={styles['dologin-btn']} onClick={handleLogin}>登录</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Dologin;
