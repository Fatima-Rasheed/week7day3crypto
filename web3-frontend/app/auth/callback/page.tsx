'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slices/authSlice';
import { userApi } from '@/store/api/userApi';
import { store } from '@/store';

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    // Store token in Redux + localStorage
    dispatch(setCredentials({ token }));

    // Fetch user profile using the token
    store.dispatch(userApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }))
      .then((result) => {
        if ('data' in result && result.data) {
          dispatch(setUser(result.data));
        }
        router.replace('/dashboard');
      })
      .catch(() => {
        router.replace('/dashboard');
      });
  }, [searchParams, dispatch, router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050A14',
        gap: 3,
      }}
    >
      <CircularProgress sx={{ color: '#00E676' }} size={48} />
      <Typography variant="h6" sx={{ color: '#fff' }}>
        Completing sign in...
      </Typography>
      <Typography variant="body2" sx={{ color: '#8899AA' }}>
        Please wait while we set up your account
      </Typography>
    </Box>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050A14' }}>
        <CircularProgress sx={{ color: '#00E676' }} />
      </Box>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
