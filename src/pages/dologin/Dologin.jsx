import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonMessage from '../../component/common/CommonMessage.jsx';
import styles from '../../less/components/dologin.module.less';

const Dologin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 身份列表
  const identityList = [
    '游侠', '乞丐', '僧侣', '屠夫', '儒生',
    '道士', '医者', '护院', '打手', '平民',
    '富商', '盗贼', '捕快'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 上一个
  const prevIdentity = () => {
    if (isAnimating) return;
    setCurrentIndex(prev => prev === 0 ? identityList.length - 1 : prev - 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // 下一个
  const nextIdentity = () => {
    if (isAnimating) return;
    setCurrentIndex(prev => prev === identityList.length - 1 ? 0 : prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // 当前选中的身份
  const currentIdentity = identityList[currentIndex];

  // 登录
  const handleLogin = () => {
    console.log(username, password, currentIdentity);
    if (username === '' || password === '') {
      return CommonMessage('请输入用户名和密码', '', 'warning');
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userIdentity', currentIdentity); // 保存身份
    navigate('/home');
    return CommonMessage('登录成功', `当前身份:${currentIdentity}`, 'success');
  };

  return (
    <div id={styles['dologin']}>
      <div className={styles['dologin-container']}>
        <div className={styles['dologin-body']}>
          <div className={styles['dologin-content']}>
         
            <div className={styles['username-row']}>
              <label>用户:</label>
              <input
                type='text'
                name='username'
                onChange={(e) => setUsername(e.target.value)}
                placeholder='请输入用户名'
              />
            </div>
            <div className={styles['password-row']}>
              <label>密码:</label>
              <input
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='请输入密码'
              />
            </div>
               <div className={styles['identity-row']}>
              <label>身份:</label>
              <div className={styles['identity-selector']}>
                <div className={styles['arrow']} onClick={prevIdentity}>◀</div>
                <div className={styles['identity-box']}>
                  <div
                    className={styles['identity-slider']}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {identityList.map((item, idx) => (
                      <div key={idx} className={styles['identity-item']}>{item}</div>
                    ))}
                  </div>
                </div>
                <div className={styles['arrow']} onClick={nextIdentity}>▶</div>
              </div>
            </div>
            <div>
              <button className={styles['dologin-btn']} onClick={handleLogin}>进入</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dologin;