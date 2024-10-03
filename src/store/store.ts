import { configureStore } from '@reduxjs/toolkit';
import { roomSlice } from './main/room.slice';
import { permissionsSlice } from './permissions/permissions.slice';
import { themeSlice } from './theme/theme.slice';
const store = configureStore({
  reducer: {
    room: roomSlice.reducer,
    permissions: permissionsSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
