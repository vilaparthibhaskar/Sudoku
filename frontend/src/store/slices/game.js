import { createSlice } from '@reduxjs/toolkit';



const gameSlice = createSlice({
  name: 'game',
  initialState: {mistakes: 0, status:'playing', mode:'easy', level:1, mistakes_set: {} },
  reducers: {
    increment: (state) => {
        state.mistakes += 1;
    },
  changeStatus: (state, action) => {
    state.status = action.payload;
  },
  resetMistakes: (state) => {
    state.mistakes = 0;
  },
  changeMode: (state, action) => {
    state.mode = action.payload
  },
  changeLevel: (state, action) => {
    state.level = action.payload;
  },
  addMistake: (state, action) => {
    state.mistakes_set[action.payload] = true;
  },
  removeMistake: (state, action) => {
    delete state.mistakes_set[action.payload];
  },
  resetMistakeSet: (state, action) => {
    state.mistakes_set = {};
  },
}
});


export const { increment, changeStatus, resetMistakes, changeLevel, changeMode, addMistake, removeMistake, resetMistakeSet} = gameSlice.actions;

export default gameSlice.reducer;