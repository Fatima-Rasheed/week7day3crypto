'use client';
import { Box, Container, Grid, Typography, IconButton, Divider } from '@mui/material';
import Link from 'next/link';

const quickLinks = ['Home', 'Blog', 'Support'];
const quickHrefs = ['/', '#', '#'];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: '#050A14',
        borderTop: '1px solid rgba(0, 230, 118, 0.1)',
        pt: 8, pb:4, left:5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <img
                src="/Group 2.png"
                alt="Circlechain Logo"
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                Circlechain
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#FFFFFF',    fontWeight: 700 ,lineHeight: 1.8, maxWidth: 280 }}>
             Amet minim mollit non deserunt ullamco est aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniamconsequat sunt nostrud amet.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>Quick Link</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((label, i) => (
                <Link key={label} href={quickHrefs[i]} style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: '#FFFFFF', '&:hover': { color: '#00E676' }, transition: 'color 0.2s' }}>
                    {label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media */}
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
    Social Media
  </Typography>

  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
    {[
      { img: '/Vector (21).png', label: 'Facebook', href: 'https://www.facebook.com' },
      { img: '/Vector (22).png', label: 'Instagram', href: 'https://www.instagram.com' },
      { img: '/Vector (20).png', label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { img: '/Vector (19).png', label: 'Twitter', href: 'https://www.twitter.com' },
      { img: '/Vector (18).png', label: 'Discord', href: 'https://www.discord.com' },
    ].map(({ img, label, href }) => (
      <IconButton
        key={label}
        aria-label={label}
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          border: '2px solid #fff ',
          borderRadius: '8px',
          padding: '8px',
          '&:hover': {
            borderColor: '#00E676',
            background: 'rgba(0,230,118,0.1)',
          },
          transition: 'all 0.2s',
        }}
      >
        <img
          src={img}
          alt={label}
          style={{
            width: 20,
            height: 20,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)', // keeps white look
          }}
        />
      </IconButton>
    ))}
  </Box>
</Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(0,230,118,0.1)', my: 4 }} />

        <Typography variant="body2" sx={{ color: '#FFFFFF', textAlign: 'right' }}>
         (c) 2022 Circlechain
        </Typography>
      </Container>
    </Box>
  );
}
