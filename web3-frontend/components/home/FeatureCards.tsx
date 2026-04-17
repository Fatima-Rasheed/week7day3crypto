'use client';
import { Box, Container, Typography, Grid } from '@mui/material';

const features = [
  {
    title: 'Access Token Market',
    description: 'Buy and sell token anytime and anywhere',
    accent: '#00E676',
  },
  {
    title: 'User Friendly Interface',
    description: 'Easy to navigate',
    accent: '#1DE9B6',
  },
  {
    title: 'Ownership Token control',
    description: 'Be in control and own as many asset as possible',
    accent: '#69F0AE',
  },
];

export default function FeatureCards() {
  return (
    <Box
      id="features"
      sx={{
        width: '100%',
        background: 'transparent',
        overflow: 'hidden',
        py: 12,
        position: 'relative',
      }}
    >
      {/* Ambient glow — centre-left */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '20%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,230,118,0.12) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glow — top-right */}
      <Box
        sx={{
          position: 'absolute',
          top: '-5%',
          right: '-8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,220,100,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glow — bottom-right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,100,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">

        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
          
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 700,
              maxWidth: 'md',
              color: '#fff',
              mb: 2,
              lineHeight: 1.25,
            }}
          >
            Global Decentralize currency based on{' '}
            <Box component="span" sx={{ color: '#FFFFFF' }}>
              blockchain technology
            </Box>
          </Typography>

          <Typography variant="body1" sx={{ color: '#73FDAA', maxWidth: 480, mx: 'auto' }}>
            Web3 is the latest efficient technology
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ alignItems: 'center' }}>

          {/* LEFT → ILLUSTRATION */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Blob — top-left of illustration */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-15%',
                  left: '-18%',
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #73FDAAB0 0%, transparent 65%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src="/Illustration.png"
                alt="Features"
                sx={{
                  width: { xs: '100%', md: '120%' },
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  mx: 'auto',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Box>
          </Grid>

          {/* RIGHT → FEATURE BANNERS */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {features.map((f) => (
                <Box
                  key={f.title}
                  sx={{
                    width: '100%',
                    minHeight: 100,
                    borderRadius: '10px',
                    // Exact gradient from spec
                    background: 'linear-gradient(280deg, rgba(115, 253, 170, 0.89) 0%, rgba(196, 196, 196, 0) 100%)',
                    border: 'none',
                    px: 4,
                    py: 3,
                    textAlign: 'right',
                    position: 'relative',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateX(-6px)',
                      boxShadow: `0 4px 32px rgba(115, 253, 170, 0.3)`,
                    },
                    // Left connector line accent
                    // '&::before': {
                    //   content: '""',
                    //   position: 'absolute',
                    //   left: 0,
                    //   top: '50%',
                    //   transform: 'translateY(-50%)',
                    //   width: 4,
                    //   height: '60%',
                    //   borderRadius: '0 4px 4px 0',
                    //   background: f.accent,
                    //   opacity: 0.9,
                    // },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#0A1628',
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      mb: 0.5,
                    }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#1A3A28',
                      lineHeight: 1.5,
                      fontSize: '0.875rem',
                    }}
                  >
                    {f.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}