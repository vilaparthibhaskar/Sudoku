import { useNavigate } from 'react-router-dom';


export function Level({mode, level, playsound}){
    const navigate = useNavigate();

    function handleClick(){
        playsound()
        navigate(`/game/${mode}/${level}`)
    }


    return(
        <div>
        <button className='btn fw-bold bg-secondary' onClick={handleClick} style={{height:'2.5rem', width:'2.5rem'}}>
            {level}
        </button>
        </div>
    )
}