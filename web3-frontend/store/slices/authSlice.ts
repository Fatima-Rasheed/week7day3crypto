'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  createdAt?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user?: User }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.user) state.user = action.payload.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('web3_token', action.payload.token);
      }
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('web3_token');
      }
    },
    rehydrateFromStorage(state) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('web3_token');
        if (token) {
          state.token = token;
          state.isAuthenticated = true;
        }
      }
    },
  },
});

export const { setCredentials, setUser, logout, rehydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
