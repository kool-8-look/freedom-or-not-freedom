import React from 'react';
import AppRouter from './router/index.jsx';
import ThemeSwitcher from './component/common/ThemeSwitcher.jsx';
import './less/components/App.less';

function App() {
  return (
      <div>
        {/* <ThemeSwitcher /> */}
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