'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Container, Typography, Card, CardContent,
  Avatar, Grid, Chip, Divider, Button, CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GoogleIcon from '@mui/icons-material/Google';
import Navbar from '@/components/layout/Navbar';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useGetMeQuery } from '@/store/api/userApi';
import { logout } from '@/store/slices/authSlice';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((s) => s.auth);
  const { data: user, isLoading, isError } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (!isAuthenticated && !token) {
      router.replace('/login');
    }
  }, [isAuthenticated, token, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (!isAuthenticated && !token) return null;

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', background: '#050A14', pt: 10, pb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 4 }}>
            My Profile
          </Typography>

          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#00E676' }} size={48} />
            </Box>
          )}

          {isError && (
            <Card sx={{ background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.3)', borderRadius: 3 }}>
              <CardContent>
                <Typography sx={{ color: '#FF5252' }}>Failed to load profile. Please try again.</Typography>
              </CardContent>
            </Card>
          )}

          {user && (
            <Grid container spacing={4}>
              {/* Profile Card */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Card sx={{
                  background: 'rgba(13,27,42,0.9)',
                  border: '1px solid rgba(0,230,118,0.2)',
                  borderRadius: 3,
                  textAlign: 'center',
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      src={user.avatar || undefined}
                      sx={{
                        width: 100, height: 100,
                        mx: 'auto', mb: 2,
                        border: '3px solid #00E676',
                        boxShadow: '0 0 20px rgba(0,230,118,0.3)',
                        fontSize: 36,
                      }}
                    >
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>
                      {user.name || 'Anonymous User'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#8899AA', mb: 2 }}>
                      {user.email}
                    </Typography>
                    <Chip
                      icon={<GoogleIcon sx={{ fontSize: 14 }} />}
                      label="Google Account"
                      size="small"
                      sx={{
                        background: 'rgba(66,133,244,0.15)',
                        color: '#4285F4',
                        border: '1px solid rgba(66,133,244,0.3)',
                        '& .MuiChip-icon': { color: '#4285F4' },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Details Card */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Card sx={{
                  background: 'rgba(13,27,42,0.9)',
                  border: '1px solid rgba(0,230,118,0.1)',
                  borderRadius: 3,
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
                      Account Details
                    </Typography>

                    {[
                      { icon: <PersonIcon sx={{ color: '#00E676', fontSize: 20 }} />, label: 'Full Name', value: user.name || 'Not set' },
                      { icon: <EmailIcon sx={{ color: '#00E676', fontSize: 20 }} />, label: 'Email Address', value: user.email },
                      { icon: <CalendarTodayIcon sx={{ color: '#00E676', fontSize: 20 }} />, label: 'Member Since', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A' },
                    ].map((item) => (
                      <Box key={item.label}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                          <Box sx={{ p: 1, background: 'rgba(0,230,118,0.1)', borderRadius: 1.5 }}>
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ color: '#8899AA', display: 'block' }}>
                              {item.label}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                              {item.value}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                      </Box>
                    ))}

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        onClick={() => router.push('/dashboard')}
                        sx={{
                          background: 'linear-gradient(135deg, #00E676, #1DE9B6)',
                          color: '#050A14',
                          fontWeight: 700,
                          '&:hover': { background: 'linear-gradient(135deg, #69F0AE, #64FFDA)' },
                        }}
                      >
                        Go to Dashboard
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        sx={{ borderColor: 'rgba(255,82,82,0.4)', color: '#FF5252', '&:hover': { borderColor: '#FF5252', background: 'rgba(255,82,82,0.05)' } }}
                      >
                        Sign Out
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}
