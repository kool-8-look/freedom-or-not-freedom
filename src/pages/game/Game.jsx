import { useEffect, useRef, useState } from 'react';
import { useNavigate,Outlet } from 'react-router-dom';
import styles from './css/game.module.less'
const Game = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    }
    return (
        <div>
            <div className={styles['return-btn']} onClick={() => handleClick('/home')}>
                返回
            </div>
            <div className={styles['game-menu']}>
                <p onClick={() => handleClick('/game/travel')}>旅游</p>
                <p onClick={() => handleClick('/game/food')}>美食</p>
            </div>
            <Outlet />
        </div>

    )
}
export default Game;
