import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, changeCell, increaseMove } from "../store/slices/sudokuSlice";
import { increment, addMistake, removeMistake} from '../store/slices/game';
import { useParams } from "react-router-dom";

export function Cell({ row, col, playsound }) {
    const val = useSelector((state) => state.sudoku.game[row - 1][col - 1]);
    const cur = useSelector((state) => state.sudoku.cell);
    const selected = useSelector((state) => state.sudoku.selected);
    const initial = useSelector((state) => state.sudoku.initial);
    const mistakes_set = useSelector((state) => state.game.mistakes_set);
    const dispatch = useDispatch();
    const { mode, level } = useParams();
    



    const token = useSelector((state) => state.user.token);

    const [status, setStatus] = useState(NaN);

    useEffect(() => {
        if (val !== 0 && initial[row - 1][col - 1] === 0) {
            fetch(`https://sudoku-1hj0.onrender.com/game/${mode}/${level}/${row - 1}/${col - 1}/${val}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    let { res } = data;
                    setStatus(res ? true : false);
                    if (!res) {
                        dispatch(increment());
                        if (!mistakes_set[`${row},${col}`]) {
                            dispatch(addMistake(`${row},${col}`));
                        }
                    } else {
                        if (mistakes_set[`${row},${col}`]) {
                            dispatch(removeMistake(`${row},${col}`));
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setStatus(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [val, mode, level]);


    let isSelected = 0;
    if (cur[0] === row && cur[1] === col) {
        isSelected = 1;
    } else if (cur[0] === row || cur[1] === col || val === selected) {
        isSelected = 2;
    }

    function handleChange() {
        if (initial[row - 1][col - 1] === 0 && selected !== -1) {
            playsound();
            dispatch(update({ row, col }));
            dispatch(changeCell({ row, col }));
            dispatch(increaseMove([row - 1, col - 1]))
        }
    }

    return (
        <button
            className="fw-bold fs-5"
            onClick={handleChange}
            style={{
                border: "1px solid #283618",
                color: initial[row - 1][col - 1] === 0 ? (status ? "#344e41" : 'red') : "black",
                width: "100%",
                height: "100%",
                backgroundColor:
                    isSelected === 0
                        ? "#a7c957"
                        : isSelected === 1
                        ? "#a3b18a"
                        : "#f4a261",
            }}
        >
            {val === 0 ? " " : val}
        </button>
    );
}
