import { createSlice } from '@reduxjs/toolkit';

let game = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
let initial = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]


const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState: { initial: initial, game: game, selected:-1, cell:[-1, -1], moves:[] },
  reducers: {
    change_initial: (state, action) => {
      let {cur} = action.payload;
        let temp = []
        for(let i = 0; i < 9; i++){
            let r = [...cur[i]]
            temp.push(r)
        }
        state.initial = temp;
    },
    copy: (state, action) => {
        let {cur} = action.payload;
        let temp = []
        for(let i = 0; i < 9; i++){
            let r = [...cur[i]]
            temp.push(r)
        }
        state.game = temp;
    },
    update: (state, action) => {
       let {row, col} = action.payload
      state.game[row - 1][col - 1] = state.selected;
    },
    changeSelected: (state, action) => {
      state.selected = action.payload;
    },
    changeCell: (state, action) => {
      let {row, col} = action.payload;
      state.cell = [row, col]
    },
    undoMove: (state) => {
      if(state.moves.length >= 1){
      let val = state.moves.pop()
      state.game[val[0]][val[1]] = 0
      state.cell = [-1, -1]
      }
    },
    increaseMove: (state, action) => {
      state.moves.push(action.payload)
    },
    resetMoves: (state) => {
      state.moves = [];
    }
  },
});


export const { update, changeSelected, copy, changeCell, change_initial, undoMove, increaseMove, resetMoves } = sudokuSlice.actions;

export default sudokuSlice.reducer;
