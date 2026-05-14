import React, { useState, useEffect, useRef } from 'react';
import styles from '../../less/components/ThemeSwitcher.module.less';

const ThemeSwitcher = ({ visible, onClose }) => {
  // 主题列表
  const themes = [
    { id: 'default', name: '默认主题', description: '烟雨江南' },
    { id: 'sakura', name: '樱花主题', description: '樱花盛开' },
    { id: 'sky', name: '天空主题', description: '蓝天白云' },
    { id: 'fireworks', name: '烟花主题', description: '绚烂烟花' },
    { id: 'autumn', name: '秋季主题', description: '秋意盎然' }
  ];

  // 当前主题状态
  const [currentTheme, setCurrentTheme] = useState('default');

  // 控制面板显示/淡出
  const [showPanel, setShowPanel] = useState(false);
  const timerRef = useRef(null);


  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // 显示时自动 3 秒后关闭
  useEffect(() => {
    if (visible) {
      startAutoHide();
    } else {
      clearTimeout(timerRef.current);
    }
  }, [visible]);

  // 开始自动隐藏计时
  const startAutoHide = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onClose();
    }, 3000);
  };

  // 切换主题
  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    startAutoHide(); // 切换后重新计时3秒
  };

  return (
    <div className={`${styles['theme-switcher']}`}
      style={{
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: 'all 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={() => clearTimeout(timerRef.current)}
      onMouseLeave={startAutoHide}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles['theme-switcher-title']}>
        <span className={styles['theme-switcher-label']}>主题切换：</span>
        <span className={styles['theme-switcher-current']}>{themes.find(t => t.id === currentTheme)?.name}</span>
      </div>
      <div className={styles['theme-switcher-options']}>
        {themes.map(theme => (
          <button
            key={theme.id}
            className={styles['theme-option'] + ' ' + (currentTheme === theme.id ? styles['active'] : '')}
            onClick={() => handleThemeChange(theme.id)}
            title={theme.description}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div >
  );
};

export default ThemeSwitcher;