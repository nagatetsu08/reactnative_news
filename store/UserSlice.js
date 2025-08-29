import { createSlice } from '@reduxjs/toolkit'

// Stateの初期状態
const initialState = {
  clips: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addClip: (state, action) => {
        const newClip = action.payload; //新たに追加した記事情報
        state.clips.push(newClip);
    },
    deleteClip:(state, action) => {
        const deleteClip = action.payload; //削除する記事情報
        const currentClips = state.clips;
        const filteredClips = currentClips.filter((clip) => clip.url !== deleteClip.url);
        state.clips = filteredClips; //最後にstateを上書き
    }
  },
})

// Action creators are generated for each case reducer function
export const { addClip, deleteClip } = userSlice.actions

export default userSlice.reducer