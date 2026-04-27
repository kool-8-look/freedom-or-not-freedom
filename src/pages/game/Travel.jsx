import { useNavigate } from 'react-router-dom';
const Travel = () => {
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }
    return (
        <div>
            <div>旅游</div>
            <div className='return-btn' onClick={() => handleClick('/game')}>
                返回
            </div>
        </div>
    )
}
export default Travel;