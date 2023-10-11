import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload
            state.loading = action.payload.loading;
        },
    },
});

export const {updateUser} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;