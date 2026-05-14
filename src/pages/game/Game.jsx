import { useEffect, useRef, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styles from './css/game.module.less'
const Game = () => {
    const navigate = useNavigate();
    const [navActive, setNavActive] = useState('sky');
    const location = useLocation(); // 加这个
    const navList = [
        {
            path: '/game/travel',
            theme: 'sky',
            name: '暂定',
        },
        {
            path: '/game/food',
            theme: 'fireworks',
            name: '抽奖',
        }
    ]
    // ✅ 只在第一次进入页面时默认跳转到 暂定
    // ✅ 之后点击切换 不会再干扰！
    useEffect(() => {
        if (location.pathname === '/game') {
            navigate('/game/travel');
        }
    }, [location.pathname, navigate]);

    const handleClick = (path, theme) => {
        setNavActive(theme);
        navigate(path);
    }

    return (
        <div>
            <div className={styles['return-btn']} onClick={() => handleClick('/home')}>
                返回
            </div>
            <div className={styles['game-menu']} >
                {navList.map((item) => (
                    <p key={item.theme} onClick={() => handleClick(item.path, item.theme)} className={navActive === item.theme ? styles['active'] : ''}>{item.name}</p>
                ))}
            </div>
            <Outlet />
        </div>

    )
}
export default Game;
