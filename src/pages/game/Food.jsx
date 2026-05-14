import { useState, useRef } from 'react';
import CommonMessage from '../../component/common/CommonMessage.jsx';
import styles from './css/food.module.less';

const Food = () => {
    const [tagList, setTagList] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [lotteryResult, setLotteryResult] = useState('');
    const [rollingText, setRollingText] = useState(''); // 滚动显示的文字
    const rollingRef = useRef(null);

    // 添加标签
    const handleAdd = () => {
        const val = inputVal.trim();
        if (!val) return CommonMessage('请输入标签内容', '', 'warning');
        setTagList([...tagList, val]);
        setInputVal('');
    };

    // 随机抽签动画
    const handleLottery = () => {
        if (tagList.length === 0) {
            return CommonMessage('请先添加标签', '', 'warning');
        };
        setLotteryResult(''); // 清空之前结果

        let count = 0;
        const maxRoll = 20; // 滚动次数
        const rollSpeed = 100; // 滚动速度

        // 开始滚动
        rollingRef.current = setInterval(() => {
            const rand = Math.floor(Math.random() * tagList.length);
            setRollingText(tagList[rand]);

            count++;
            if (count >= maxRoll) {
                clearInterval(rollingRef.current);
                const final = Math.floor(Math.random() * tagList.length);
                setLotteryResult(tagList[final]);
                setRollingText('');
            }
        }, rollSpeed);
    };

    return (
        <div className={styles['game-food']}>
            <div className={styles['add-row']}>
                <input
                    className={styles['add-input']}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="请输入标签内容"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button className={styles['add-btn']} onClick={handleAdd}>
                    添加
                </button>
            </div>

            <div className={styles['tag-list']}>
                {tagList.map((item, index) => (
                    <div key={index} className={styles['tag-item']}>
                        {item}
                        <span
                            className={styles['tag-close']}
                            onClick={(e) => {
                                e.stopPropagation();
                                const newList = [...tagList];
                                newList.splice(index, 1);
                                setTagList(newList);
                            }}
                        >
                            ×
                        </span>
                    </div>
                ))}
            </div>

            <button className={styles['lottery-btn']} onClick={handleLottery}>
                抽签
            </button>

            {/* 抽签动画 + 结果 */}
            <div className={styles['lottery-result']}>
                {rollingText && <span className={styles['rolling']}>{rollingText}</span>}
                {lotteryResult && <span>{lotteryResult}</span>}
            </div>
        </div>
    );
};

export default Food;