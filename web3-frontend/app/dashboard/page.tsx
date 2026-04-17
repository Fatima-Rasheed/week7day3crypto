'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useAppSelector } from '@/store/hooks';
import { useGetMeQuery } from '@/store/api/userApi';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, token } = useAppSelector((s) => s.auth);
  const { data: user, isLoading } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.replace('/login');
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated && !token) return null;

  // Determine if this is a new user: account created within the last 2 minutes
  const isNewUser = user?.createdAt
    ? Date.now() - new Date(user.createdAt).getTime() < 2 * 60 * 1000
    : false;

  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050A14',
        // subtle radial glow behind the card
        backgroundImage:
          'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,230,118,0.07) 0%, transparent 70%)',
        px: 2,
      }}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: 'primary.main' }} size={48} />
      ) : (
        <Card
          sx={{
            maxWidth: 480,
            width: '100%',
            background: 'rgba(13, 27, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(0, 230, 118, 0.18)',
            borderRadius: 4,
            boxShadow: '0 8px 40px rgba(0,230,118,0.08)',
            overflow: 'visible',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2.5,
              pt: 5,
              pb: 4,
              px: 4,
            }}
          >
            {/* Avatar with glow ring */}
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00E676, #1DE9B6)',
                  zIndex: 0,
                  opacity: 0.85,
                  filter: 'blur(2px)',
                },
              }}
            >
              <Avatar
                src={user?.avatar || undefined}
                sx={{
                  width: 96,
                  height: 96,
                  fontSize: 38,
                  fontWeight: 700,
                  border: '3px solid #050A14',
                  position: 'relative',
                  zIndex: 1,
                  bgcolor: '#0D1B2A',
                  color: 'primary.main',
                }}
              >
                {firstName?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            </Box>

            {/* Greeting */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00E676 0%, #1DE9B6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {isNewUser ? `Welcome, ${firstName} 👋` : `Welcome back, ${firstName} 👋`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {isNewUser
                  ? "You're all set. Let's explore the market."
                  : "Good to see you again. Here's your overview."}
              </Typography>
            </Box>

            <Divider
              sx={{
                width: '100%',
                borderColor: 'rgba(0,230,118,0.12)',
              }}
            />

            {/* Quick-stat chips */}
          
            {/* CTA */}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1, py: 1.4, fontSize: '0.95rem', borderRadius: 2 }}
              onClick={() => router.push('/')}
            >
              Explore Markets
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
