import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { newsletterApi } from './api/newsletterApi';
import { userApi } from './api/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsletterApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
