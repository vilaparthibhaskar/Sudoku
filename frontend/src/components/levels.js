import { useEffect } from 'react';
import { Level } from './level';
import { copy, change_initial, changeSelected, changeCell, resetMoves } from '../store/slices/sudokuSlice';
import {resetMistakes, resetMistakeSet} from '../store/slices/game'
import { useDispatch } from 'react-redux';
import { Header } from './header';

const easy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const medium = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const hard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const new_sudoku = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]

export function Levels() {
    const dispatch = useDispatch();
    const audio = new Audio('/button_click.mp3');

    const playsound = function(){
      audio.play();
    }

    useEffect(() => {
        dispatch(changeCell({ row: -1, col: -1 }));
        dispatch(changeSelected(-1));
        dispatch(resetMistakes());
        dispatch(resetMistakeSet());
        dispatch(copy({ cur: new_sudoku }));
        dispatch(change_initial({ cur: new_sudoku }));
        dispatch(resetMoves());
    }, [])

  return (
    <>
    <Header></Header>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', margin: '0' }}>
      <div className="container text-center mt-5">
        <div className="row mt-5">
          <div className="col-4" style={{ color: '#fb6f92' }}>
            <h3>Easy</h3>
          </div>
          <div className="col-4" style={{ color: '#fb8500' }}>
            <h3>Medium</h3>
          </div>
          <div className="col-4" style={{ color: '#c1121f' }}>
            <h3>Hard</h3>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-4">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              justifyItems: 'center',
            }}>
              {easy.map((level) => {
                return <Level playsound={playsound} mode="easy" level={level} key={level} />;
              })}
            </div>
          </div>
          <div className="col-4">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              justifyItems: 'center',
            }}>
              {medium.map((level) => {
                return <Level playsound={playsound} mode="medium" level={level} key={level} />;
              })}
            </div>
          </div>
          <div className="col-4">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              justifyItems: 'center',
            }}>
              {hard.map((level) => {
                return <Level playsound={playsound} mode="hard" level={level} key={level} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
