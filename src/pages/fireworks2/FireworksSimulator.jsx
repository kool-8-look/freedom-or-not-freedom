import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/style.css';
// 引入字体样式
import './fonts/css.css';


const FireworksSimulator = () => {
  // 状态管理：控制加载状态、菜单显示等
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const trailsCanvasRef = useRef(null);
  const mainCanvasRef = useRef(null);
  useEffect(() => {
    import('./js/script.js').then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  }
  return (
    <div className="container" ref={containerRef}>
      {isLoading && (
        <div className="loading-init">
          <div className="loading-init__header">加载中</div>
          <div className="loading-init__status">正在装配烟花</div>
        </div>
      )}

      {/* 舞台容器 */}
      <div className={`stage-container ${isLoading ? 'remove' : ''}`}>
        <div className="canvas-container">
          <canvas
            id="trails-canvas"
            ref={trailsCanvasRef}
          ></canvas>
          <canvas
            id="main-canvas"
            ref={mainCanvasRef}
          ></canvas>
        </div>

        {/* 控制按钮 */}
        <div className="controls">
          <div className="btn pause-btn">
            <svg fill="white" width="24" height="24">
              <use href="#icon-pause" xlinkHref="#icon-pause"></use>
            </svg>
          </div>
          <div className="btn sound-btn">
            <svg fill="white" width="24" height="24">
              <use href="#icon-sound-off" xlinkHref="#icon-sound-off"></use>
            </svg>
          </div>
          <div className="btn settings-btn">
            <svg fill="white" width="24" height="24">
              <use href="#icon-settings" xlinkHref="#icon-settings"></use>
            </svg>
          </div>
        </div>

        {/* 设置菜单 */}
        <div className="menu hide">
          <div className="menu__inner-wrap">
            <div className="btn btn--bright close-menu-btn">
              <svg fill="white" width="24" height="24">
                <use href="#icon-close" xlinkHref="#icon-close"></use>
              </svg>
            </div>
            <div className="menu__header">设置</div>
            <form>
              <div className="form-option form-option--select">
                <label className="shell-type-label"> 烟花类型 </label>
                <select className="shell-type"></select>
              </div>
              <div className="form-option form-option--select">
                <label className="shell-size-label"> 烟花大小 </label>
                <select className="shell-size"></select>
              </div>
              <div className="form-option form-option--select">
                <label className="quality-ui-label"> 画质 </label>
                <select className="quality-ui"></select>
              </div>
              <div className="form-option form-option--select">
                <label className="sky-lighting-label"> 照亮天空 </label>
                <select className="sky-lighting"></select>
              </div>
              <div className="form-option form-option--select">
                <label className="scaleFactor-label"> 缩放 </label>
                <select className="scaleFactor"></select>
              </div>
              <div className="form-option form-option--checkbox">
                <label className="word-shell-label"> 文字烟花 </label>
                <input className="word-shell" type="checkbox" />
              </div>
              <div className="form-option form-option--checkbox">
                <label className="auto-launch-label"> 自动放烟花 </label>
                <input className="auto-launch" type="checkbox" />
              </div>
              <div className="form-option form-option--checkbox form-option--finale-mode">
                <label className="finale-mode-label"> 同时放更多的烟花 </label>
                <input className="finale-mode" type="checkbox" />
              </div>
              <div className="form-option form-option--checkbox">
                <label className="hide-controls-label"> 隐藏控制按钮 </label>
                <input className="hide-controls" type="checkbox" />
              </div>
              <div className="form-option form-option--checkbox form-option--fullscreen">
                <label className="fullscreen-label"> 全屏 </label>
                <input className="fullscreen" type="checkbox" />
              </div>
              <div className="form-option form-option--checkbox">
                <label className="long-exposure-label"> 保留烟花的火花 </label>
                <input className="long-exposure" type="checkbox" />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 帮助弹窗 */}
      <div className="help-modal">
        <div className="help-modal__overlay"></div>
        <div className="help-modal__dialog">
          <div className="help-modal__header"></div>
          <div className="help-modal__body"></div>
          <button type="button" className="help-modal__close-btn">关闭</button>
        </div>
      </div>
      <div className='return-btn' onClick={() => handleClick('/home')}>
        返回
      </div>
    </div>
  );
};

export default FireworksSimulator;