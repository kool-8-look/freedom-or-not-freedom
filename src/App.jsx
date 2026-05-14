import React, { useEffect, useState } from 'react';
import AppRouter from './router/index.jsx';
import ThemeSwitcher from './component/common/ThemeSwitcher.jsx';
import './less/components/App2.less';

function App() {
  const [showThemePanel, setShowThemePanel] = useState(false);

  // 新加 → 实时监听登录状态
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // 关键：监听 localStorage 变化
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    // 监听存储变化（别的页面退出，这里自动更新）
    window.addEventListener('storage', checkLogin);

    // 同时自己页面也能实时检测（同页面退出）
    const timer = setInterval(checkLogin, 300);

    return () => {
      window.removeEventListener('storage', checkLogin);
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* <div style={{ display: isLoggedIn ? 'block' : 'none' }} className='app-theme-switcher' onClick={() => {
        setShowThemePanel(!showThemePanel)
      }}>
        <ThemeSwitcher visible={showThemePanel} onClose={() => setShowThemePanel(false)} />
      </div> */}
      <AppRouter />
      <div className="app-container">
        <div className="waifu">
          <div className="waifu-tips"></div>
          <canvas id="live2d" className="live2d"></canvas>
          <div className="waifu-tool">
            <span className="fui-home"></span>
            <span className="fui-chat"></span>
            {/* <span className="fui-eye"></span> */}
            {/* <span className="fui-user"></span> */}
            <span className="fui-photo"></span>
            {/* <span className="fui-info-circle"></span> */}
            {/* <span className="fui-cross"></span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;