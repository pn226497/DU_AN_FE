import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomId: null,
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        enterRoom: (state, action) => {
            state.roomId = action.payload;
        }
    },
});
export const {enterRoom} = roomSlice.actions;
export const selectRoomId = (state) => state.room.roomId;
export default roomSlice.reducer;