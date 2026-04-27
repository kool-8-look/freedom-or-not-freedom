import { useNavigate } from 'react-router-dom';
const Food = () => {
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }   
    return (
        <div>
            <div>美食</div>
            <div className='return-btn' onClick={() => handleClick('/game')}>
                返回
            </div>
        </div>
    )
}
export default Food;