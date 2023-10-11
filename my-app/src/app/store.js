import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import roomSlice from '../features/roomSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
  },
});
