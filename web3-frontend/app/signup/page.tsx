'use client';
import { Box, Container, Typography, Button, Card, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

const benefits = [
  'Access to real-time market data',
  'Secure wallet management',
  'Portfolio tracking & analytics',
  'Newsletter & market alerts',
];

export default function SignupPage() {
  const handleGoogleSignup = () => {
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
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,230,118,0.06) 0%, #050A14 60%)',
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
                  Create Account
                </Typography>
                <Typography variant="body2" sx={{ color: '#8899AA' }}>
                  Join thousands of crypto traders on Circlechain
                </Typography>
              </Box>

              {/* Benefits */}
              <List dense sx={{ mb: 3 }}>
                {benefits.map((b) => (
                  <ListItem key={b} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon sx={{ color: '#00E676', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={<Typography sx={{ color: '#8899AA', fontSize: 14 }}>{b}</Typography>} />
                  </ListItem>
                ))}
              </List>

              {/* Google Signup Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignup}
                sx={{
                  py: 1.8,
                  background: 'linear-gradient(135deg, #00E676, #1DE9B6)',
                  color: '#050A14',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #69F0AE, #64FFDA)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,230,118,0.3)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Sign Up with Google
              </Button>

              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#8899AA' }}>
                  Already have an account?{' '}
                  <Link href="/login" style={{ color: '#00E676', textDecoration: 'none', fontWeight: 600 }}>
                    Sign in
                  </Link>
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ color: '#8899AA', display: 'block', textAlign: 'center', mt: 3, lineHeight: 1.6 }}>
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
