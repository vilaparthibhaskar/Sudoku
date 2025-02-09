import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { update_easy, update_medium, update_hard } from "../store/slices/user";

export function Popup({setPopup, mode, level}) {
    const mistakes_set = useSelector((state) => state.game.mistakes_set);
    const userid = useSelector((state) => state.user.userid)
    const easy = useSelector((state) => state.user.easy)
    const medium = useSelector((state) => state.user.medium)
    const hard = useSelector((state) => state.user.hard)
    const dispatch = useDispatch();
    let ln = Object.keys(mistakes_set).length;
    const token = localStorage.getItem('token') || '';

    function handleClick(){
        setPopup(false)
    }

    useEffect(() => {
        const updateSet = async () => {
            try {
                const mistakes = Object.keys(mistakes_set).length;
    
                if (mistakes < 3) {
                    if (!mode || !level || !userid) {
                        throw new Error("Missing required parameters: mode, levelIndex, or userid");
                    }
    
                    let levelArrays = {
                        easy: easy || [],
                        medium: medium || [],
                        hard: hard || [],
                    };
    
                    if (!levelArrays[mode]) {
                        throw new Error(`Invalid mode: ${mode}`);
                    }
                    if (!levelArrays[mode].includes(level)) {
                        const response = await fetch(`https://sudoku-1hj0.onrender.com/game/${mode}/${level}/${userid}`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json' 
                            }
                        });
                        
                        if (!response.ok) {
                            throw new Error(`Failed to update game data. Status: ${response.status}`);
                        }
                        
                        if(mode === 'easy'){
                            dispatch(update_easy(level))
                        }
                        else if(mode === 'medium'){
                            dispatch(update_medium(level))
                        }
                        else if(mode === 'hard'){
                            dispatch(update_hard(level))
                        }
                        console.log("Game data updated successfully");
                    } else {
                        console.log(`Level ${level} already exists in ${mode}`);
                    }
                }
            } catch (error) {
                console.error("Something went wrong:", error.message);
            }
        };
    
        updateSet();
        
    }, [mode, level, userid, mistakes_set, easy, medium, hard, dispatch, token]);
    
    

    return (
            <div className="fst-italic" 
                style={{
                    position: 'fixed',   
                    top: '50%',    
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '300px', 
                    height: '100px',     
                    backgroundColor: '#d4e09b',
                    borderRadius: '8px',
                    zIndex: 1000,   
                    display: 'flex',     
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: '90%'
                }}
            >
                <div className="container">
                    <div className="row d-flex flex-row-reverse">
                        <button className="btn col-1 fw-bold text-center d-flex flex-column align-items-center me-2" onClick={handleClick} style={{backgroundColor:'red', width:'7px', height:'40px'}}><p>X</p></button>
                    </div>
                    <div className="row text-center fw-bold">
                        {ln < 3 ? <p>Hurray! You Won the Game</p> : <p>OOPS! You Lost the Game</p>}
                    </div>
                </div>
            </div>
    );
}
