'use client';
import { Box, Container, Typography, Button, Card, CardContent, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.06) 0%, #050A14 70%)',
          pt: 8,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              background: 'rgba(13,27,42,0.9)',
              border: '1px solid rgba(0,230,118,0.2)',
              borderRadius: 4,
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              {/* Logo */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 64, height: 64, borderRadius: '16px',
                  background: 'linear-gradient(135deg, #00E676, #1DE9B6)',
                  mb: 2,
                }}>
                  <Typography sx={{ color: '#050A14', fontWeight: 900, fontSize: 28 }}>C</Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ color: '#8899AA' }}>
                  Sign in to your Circlechain account
                </Typography>
              </Box>

              {/* Google Login Button */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{
                  py: 1.8,
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#00E676',
                    background: 'rgba(0,230,118,0.05)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Continue with Google
              </Button>

              <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.08)' }}>
                <Typography variant="caption" sx={{ color: '#8899AA', px: 2 }}>
                  Secure OAuth 2.0 Authentication
                </Typography>
              </Divider>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#8899AA' }}>
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" style={{ color: '#00E676', textDecoration: 'none', fontWeight: 600 }}>
                    Sign up
                  </Link>
                </Typography>
              </Box>

              <Box sx={{ mt: 4, p: 2, background: 'rgba(0,230,118,0.05)', borderRadius: 2, border: '1px solid rgba(0,230,118,0.1)' }}>
                <Typography variant="caption" sx={{ color: '#8899AA', display: 'block', textAlign: 'center', lineHeight: 1.6 }}>
                  🔒 Your data is protected with industry-standard encryption. We never store your Google password.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
