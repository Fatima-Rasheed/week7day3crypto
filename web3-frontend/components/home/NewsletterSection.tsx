'use client';
import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useSubscribeToNewsletterMutation } from '@/store/api/newsletterApi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribe, { isLoading, isSuccess, isError, error, data, reset }] = useSubscribeToNewsletterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await subscribe({ email: email.trim() });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isSuccess || isError) reset();
  };

  const errorMessage = isError
    ? (error as any)?.data?.message || (error as any)?.error || 'Something went wrong. Please try again.'
    : null;

  return (
    <Box
      sx={{
        py: 6,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Page-level green glow — centre */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,220,100,0.14) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="md">
        {/* Card */}
        <Box
          sx={{
            position: 'relative',
            background: '#010010',
            border: '1px solid rgba(0,230,118,0.35)',
            borderRadius: '10px',
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 5 },
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 0 80px rgba(0,200,100,0.12), inset 0 0 60px rgba(0,200,100,0.04)',
          }}
        >
          {/* Glow top-right */}
          <Box sx={{
            position: 'absolute', top: -60, right: -60,
            width: 420, height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,230,118,0.22) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />
          {/* Glow bottom-left */}
          <Box sx={{
            position: 'absolute', bottom: -60, left: -50,
            width: 380, height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,200,100,0.18) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '1.4rem', md: '1.65rem' },
              letterSpacing: '-0.01em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Want to be aware of all updates
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 1.5,
              width: '100%',
              maxWidth: 680,
              position: 'relative',
              zIndex: 1,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              fullWidth
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: 'rgba(236, 238, 242, 0.9)',
                  borderRadius: '8px',
                  color: '#010b06ff',
                  '& fieldset': { borderColor: 'rgba(0,230,118,0.4)', borderWidth: '1.5px' },
                  '&:hover fieldset': { borderColor: 'rgba(0,230,118,0.65)' },
                  '&.Mui-focused fieldset': { borderColor: 'rgba(0,230,118,0.9)' },
                },
                '& .MuiInputBase-input::placeholder': { color: 'rgba(180,200,220,0.45)' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                px: 4,
                py: 1.5,
                minWidth: 140,
                background: 'linear-gradient(135deg, #00E676, #1DE9B6)',
                color: '#050A14',
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                '&:hover': { background: 'linear-gradient(135deg, #69F0AE, #64FFDA)', opacity: 0.88 },
                '&:disabled': { background: 'rgba(0,230,118,0.3)', color: '#050A14' },
              }}
            >
              {isLoading ? <CircularProgress size={20} sx={{ color: '#050A14' }} /> : 'Subscribe'}
            </Button>
          </Box>

          {isSuccess && data && (
            <Alert severity={data.success ? 'success' : 'warning'} sx={{ maxWidth: 680, width: '100%', background: data.success ? 'rgba(0,230,118,0.1)' : 'rgba(255,165,0,0.1)', border: `1px solid ${data.success ? 'rgba(0,230,118,0.3)' : 'rgba(255,165,0,0.3)'}`, color: '#fff', '& .MuiAlert-icon': { color: data.success ? '#00E676' : '#FFA500' } }}>
              {data.message}
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ maxWidth: 680, width: '100%', background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.3)', color: '#fff', '& .MuiAlert-icon': { color: '#FF5252' } }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
}