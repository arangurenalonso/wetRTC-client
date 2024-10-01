import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { permissionsInitialState } from './permissions.initial-state';

export const permissionsSlice = createSlice({
  name: 'streaming',
  initialState: permissionsInitialState,
  reducers: {
    setLocalStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.localStream = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLocalStream, setLoading } = permissionsSlice.actions;
