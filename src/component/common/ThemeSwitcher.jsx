import React, { useState, useEffect } from 'react';
import '../../less/components/ThemeSwitcher.less';

const ThemeSwitcher = () => {
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

  // 从localStorage加载主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // 切换主题
  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  return (
    <div className="theme-switcher">
      <div className="theme-switcher-title">
        <span className="theme-switcher-label">主题切换：</span>
        <span className="theme-switcher-current">{themes.find(t => t.id === currentTheme)?.name}</span>
      </div>
      <div className="theme-switcher-options">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(theme.id)}
            title={theme.description}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;