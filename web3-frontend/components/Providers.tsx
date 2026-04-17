'use client';
import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from '@/store';
import { rehydrateFromStorage } from '@/store/slices/authSlice';
import theme from '@/lib/theme';

function StoreInitializer() {
  useEffect(() => {
    store.dispatch(rehydrateFromStorage());
  }, []);
  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoreInitializer />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
