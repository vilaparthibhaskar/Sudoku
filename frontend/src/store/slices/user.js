import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
  name: 'user',
  initialState: {name: '', loggedin:false, easy:[], medium:[], hard:[], token:null, userid: null },
  reducers: {
    change_user_name: (state, action) => {
        state.name = action.payload;
    },
  change_loggedin: (state, action) => {
    state.loggedin = action.payload;
  },
  update_easy: (state, action) => {
    state.easy.push(action.payload);
  },
  update_medium: (state, action) => {
    state.medium.push(action.payload);
  },
  update_hard: (state, action) => {
    state.hard.push(action.payload);
  },
  load_easy: (state, action) => {
    state.easy = action.payload;
  },
  load_medium: (state, action) => {
    state.medium = action.payload;
  },
  load_hard: (state, action) => {
    state.hard = action.payload;
  },
  update_token: (state, action) => {
    state.token = action.payload;
  },
  update_userid: (state, action) => {
    state.userid = action.payload
  },
  logout: (state) => {
    state.token = null
    state.name = ''
    state.loggedin = false
    state.easy = []
    state.medium = []
    state.hard = []
    state.userid = null
  }
}
});


export const {change_loggedin, change_user_name, update_easy, update_hard, update_medium, load_easy, load_medium, load_hard, update_token, update_userid, logout } = userSlice.actions;

export default userSlice.reducer;