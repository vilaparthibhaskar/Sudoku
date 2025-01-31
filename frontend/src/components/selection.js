import { useSelector, useDispatch } from 'react-redux';
import { changeCell, changeSelected} from '../store/slices/sudokuSlice';

export function Selection({playsound}){
    let dispatch = useDispatch()
    let selected = useSelector((state) => state.sudoku.selected)

    function handleClick(item){
        playsound()
        dispatch(changeSelected(item))
        dispatch(changeCell({row:-1, col:-1}))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return <button className='btn me-1 mt-2 fw-bold' style={{backgroundColor:(selected == item ? 'green' : 'grey'), width:'2rem', height:"2rem"}} onClick={() => handleClick(item)}>
                <p>{item}</p>
            </button>
        })}
        </div>
    )
}