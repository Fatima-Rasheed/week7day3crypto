'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'transparent',
        pt: 8,
        pb: 8,
      }}
    >
      {/* background blobs */}

      {/* Original — top-left behind text */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(0,220,100,0.22) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Under navbar — left side */}
      <Box
        sx={{
          position: 'absolute',
          top: '-4%',
          left: '-6%',
          width: 340,
          height: 340,
          background:
            'radial-gradient(circle, rgba(0,230,118,0.18) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Below buttons — left side */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '12%',
          left: '2%',
          width: 300,
          height: 300,
          background:
            'radial-gradient(circle, rgba(0,220,100,0.14) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Under hero image — right side */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '-4%',
          width: 420,
          height: 420,
          background:
            'radial-gradient(circle, rgba(0,200,100,0.16) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Original right-side small blob */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '-8%',
          width: 250,
          height: 250,
          background:
            'radial-gradient(circle, #73FDAA 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem', lg: '3.6rem' },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 2,
                color: '#FFFFFF',
                letterSpacing: '-0.5px',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Save, Buy and Sell Your blockchain asset
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#FFF',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.5,
                maxWidth: 380,
                textAlign: { xs: 'center', md: 'left' },
                mx: { xs: 'auto', md: 0 },
              }}
            >
             The easy to manage and trade
your cryptocurency asset
            </Typography>

            <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3, md: 6 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    px: 5,
                    py: 1,
                    background: '#73FDAA',
                    color: '#050A14',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    borderRadius: '16px',
                    boxShadow: 'none',
                    '&:hover': {
                      background: '#5EEFC4',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Connect Wallet
                </Button>
              </Link>

              <Button
                  variant="contained"
                  sx={{
                    px: 5,
                    py: 1,
                    background: '#FFFFFF',
                    color: '#050A14',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    borderRadius: '16px',
                    boxShadow: 'none',
                    '&:hover': {
                      background: '#5EEFC4',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Start Trading
                </Button>
            </Box>
          </Grid>

          {/* Right image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Box
                component="img"
                src="/hero.png"
                alt="Blockchain Asset Trading"
                sx={{
                  width: { xs: '100%', sm: '90%', md: '145%' },
                  maxWidth: { xs: '100%', md: 780 },
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 40px rgba(0,200,100,0.15))',
                  mr: { md: '-10%' },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
