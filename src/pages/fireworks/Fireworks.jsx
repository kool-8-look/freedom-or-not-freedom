import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../less/components/fireworks.less';
// 烟花1
const Fireworks = () => {
    useEffect(() => {
        import('./fireworks.js').then(() => {
            if (typeof window !== 'undefined' && typeof window.initFireworks === 'function') {
                const timer = setTimeout(() => {
                    window.initFireworks();
                }, 100);
                return () => clearTimeout(timer);
            }
        });
    }, []);
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }
    return (
        <div id='fireworksContainer'>
            <div id="backgroundRendering" ></div>
            <canvas id="fireworks">
            </canvas>
            <div className='displayNone' >
                <div className="shape">🏮2026新年快乐🏮</div>
                <div className="shape">🏮恭喜发财🏮</div>
                <div className="shape">🏮万事如意🏮</div>
                <div className="shape">🏮吉庆有余🏮</div>
                <div className="shape">🏮心想事成🏮</div>
                <div className="shape">🏮喜气盈门🏮</div>
                <div className="shape">🏮阖家欢乐🏮</div>
                <div className="shape">🏮财源广进🏮</div>
            </div>
            <div className='return-btn' onClick={() => handleClick('/home')}>
                返回
            </div>
        </div>
    );
};

export default Fireworks;