import { useEffect, useState } from 'react';
import styles from './css/travel.module.less'

const Travel = () => {
    const [tags, setTags] = useState([]);
    const texts = ['这是标签一这是标签一这是标签一这是标签一', '这是标签二', '这是标签三'];

    const createTag = () => {
        let left;
        const safeZone = 12; // 安全间隔

        for (let i = 0; i < 20; i++) {
            left = (Math.random() * 90).toFixed(2) + '%';
            const isOverlap = tags.some(tag => {
                const tagLeft = parseFloat(tag.left);
                const newLeft = parseFloat(left);
                return Math.abs(tagLeft - newLeft) < safeZone;
            });
            if (!isOverlap) break;
        }

        const size = Math.random() * 12 + 24;
        const duration = Math.random() * 3 + 24;
        const delay = Math.random() * 2;

        const newTag = {
            id: Date.now() + Math.random(),
            text: texts[Math.floor(Math.random() * texts.length)],
            left,
            fontSize: `${size}px`,
            duration: `${duration}s`,
            delay: `${delay}s`,
            isPause: false
        };

        setTags(prev => [...prev, newTag]);

        setTimeout(() => {
            setTags(prev => prev.filter(t => t.id !== newTag.id));
        }, (duration + delay) * 1000);
    };

    const handleMouseEnter = (id) => {
        setTags(prev => prev.map(item =>
            item.id === id ? { ...item, isPause: true } : item
        ));
    };

    const handleMouseLeave = (id) => {
        setTags(prev => prev.map(item =>
            item.id === id ? { ...item, isPause: false } : item
        ));
    };

    useEffect(() => {
        createTag();
        const interval = setInterval(createTag, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles['game-travel']}>
            {tags.map(tag => (
                <div
                    key={tag.id}
                    className={styles['fall-tag']}
                    style={{
                        left: tag.left,
                        fontSize: tag.fontSize,
                        animationDuration: tag.duration,
                        animationDelay: tag.delay,
                        // 动画暂停
                        animationPlayState: tag.isPause ? 'paused' : 'running'
                    }}
                    onMouseEnter={() => handleMouseEnter(tag.id)}
                    onMouseLeave={() => handleMouseLeave(tag.id)}
                >
                    {tag.text}
                </div>
            ))}
        </div>
    )
}

export default Travel;