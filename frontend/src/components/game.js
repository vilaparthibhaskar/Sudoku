import { useEffect, useState } from 'react';
import { Selection } from './selection';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from './grid';
import { copy, change_initial, undoMove } from '../store/slices/sudokuSlice';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Popup } from './popup';
import { Header } from './header';

function checkfilled(ar){
    let count = 0;
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(ar[i][j] !== 0){
                count++
            }
        }
    }
    return count
}


export function Game(){

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { puzzle, solved, mode, level, playsound} = useLoaderData();
    const mistakes = useSelector((state) => state.game.mistakes)
    const game = useSelector((state) => state.sudoku.game);
    const mistakes_set = useSelector((state) => state.game.mistakes_set);
    const [show_popup, setPopup] = useState(false)
    const isloggedin = useSelector((state) => state.user.loggedin);
    const userName = useSelector((state) => state.user.name)
    const easy = useSelector((state) => state.user.easy)
    const easycheck = useSelector((state) => state.user.easy)
    const mediumcheck = useSelector((state) => state.user.medium)
    const hardcheck = useSelector((state) => state.user.hard)
    console.log(isloggedin, 'hi');
    console.log(userName)
    console.log(easy)
    console.log(easycheck, 'easy')

    useEffect(() => {
    if(mistakes >= 3 || (Object.keys(mistakes_set).length === 0 && checkfilled(game) === 81)){
        setPopup(true)
    }
    }, [mistakes_set, game])
    


    useEffect(() => {
        if (puzzle && solved) {
        dispatch(copy({ cur: puzzle }));
        dispatch(change_initial({ cur: puzzle }));
        }
    }, [dispatch, puzzle, solved]);

    function handleClick(){
        playsound()
        navigate(`/levels`)
    }

    function handleUndo(){
        dispatch(undoMove())
    }

    return (
    <div>
        <Header></Header>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className='mt-4 fw-bold' onClick={handleClick} style={{backgroundColor:"#ccff33", borderRadius: '5px',  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
                Levels
            </button>
        </div>
        {show_popup &&
        <div>
            <Popup setPopup={setPopup} mode={mode} level={level}></Popup>
        </div>}
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '85vh', margin: '0'}}>
            <div className='d-flex flex-row'>
            <p className='fw-bold me-5' style={{paddingRight:'140px', paddingLeft:'30px', color:'red'}} >mistakes:{mistakes}</p>
            <button className='ms-5 mb-1' style={{
                    backgroundColor: "#606c38",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 16px",
                    cursor: "pointer",
                }} onClick={handleUndo}>Undo</button>
            </div>
        <div className="Container" style={{height:'30rem', width:'25.5rem', padding:'0', margin:'0'}}>
                <div className="row">
                    <div className="col-4">
                        <Grid playsound={playsound} row={1} col={1}/>
                    </div>
                    <div className="col-4">
                        <Grid playsound={playsound}  row={1} col={2}/>
                    </div>
                    <div className="col-4">
                        <Grid playsound={playsound}  row={1} col={3}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Grid playsound={playsound}  row={2} col={1}/>
                    </div>
                    <div className="col-4">
                        <Grid playsound={playsound}  row={2} col={2}/>
                    </div>
                    <div className="col-4">
                        <Grid playsound={playsound}  row={2} col={3}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Grid playsound={playsound}  row={3} col={1}/>
                    </div>
                    <div className="col-4">
                        <Grid playsound={playsound}  row={3} col={2}/>
                    </div>
                    <div className="col-4">
                        <Grid playsound={playsound}  row={3} col={3}/>
                    </div>
                </div>
            </div>
            <Selection playsound={playsound} ></Selection>
        </div>
    </div>
    )
}