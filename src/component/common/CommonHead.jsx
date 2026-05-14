import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CommonMessage from './CommonMessage';
import styles from '../../less/components/CommonHead.module.less'

/**
 * 通用头组件
 */
function CommonHead() {
    const navigate = useNavigate();
    const [activeNum, setClickNum] = useState(0)
    const [identity, setIdentity] = useState(localStorage.getItem('userIdentity') || '游客');

    const handleClick = (path, type) => {
        if (type === 'exit') {
            localStorage.removeItem('isLoggedIn');
        }
        navigate(path);
    }
    const handleClick2 = (data) => {
        setClickNum(activeNum + 1)
        if (activeNum === 6) {
            return CommonMessage('你你你！！', '靓仔！俺都说了,真的没啥了!!', 'warning');
        } else {
            return CommonMessage(data.message, data.description, data.type);
        }
    }
    return (
        <div id={styles['common-head']} >
            <div className={styles['common-head-title']}>
                <p onClick={() => handleClick('/fireworks')}>烟花1</p>
                <p onClick={() => handleClick('/fireworks2')}>烟花2</p>
                <p onClick={() => handleClick('/game')}>游戏</p>
                <p onClick={() => handleClick2({ message: '别点了', description: '没东西,还在开发欸', type: 'success' })}>没</p>
                <p className={styles['common-head-title-visitor']}>{identity} <span className={styles['common-head-title-visitor-exit']} onClick={() => handleClick('/login', 'exit')}>退出</span></p>
            </div>
        </div>
    );
}
export default CommonHead;
