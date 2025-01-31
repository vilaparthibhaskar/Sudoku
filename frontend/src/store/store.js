import { configureStore } from '@reduxjs/toolkit';
import sudokuReducer from './slices/sudokuSlice';
import gameReducer from './slices/game'
import userReducer from './slices/user'

const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
    game: gameReducer,
    user: userReducer,
  },
});

export default store;
