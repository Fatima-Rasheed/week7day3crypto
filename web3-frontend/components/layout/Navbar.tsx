'use client';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

const navLinks = [
  { label: 'How it Works', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Support', href: '#' },
];

const socialIcons = [
  { img: '/Vector (21).png', label: 'Facebook', href: 'https://www.facebook.com' },
  { img: '/Vector (22).png', label: 'Instagram', href: 'https://www.instagram.com' },
  { img: '/Vector (20).png', label: 'Linkedin', href: 'https://www.linkedin.com' },
  { img: '/Vector (19).png', label: 'Twitter', href: 'https://www.twitter.com' },
  { img: '/Vector (18).png', label: 'Discord', href: 'https://www.discord.com' },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    router.push('/');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        width: '100%',
        height: 58,
        background: 'rgba(5, 10, 20, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 230, 118, 0.1)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 58,
          height: 58,
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          gap: 2,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <Image
            src="/Group 2.png"
            alt="Logo"
            width={32}
            height={32}
            style={{ borderRadius: 6 }}
          />
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '-0.5px',
            }}
          >
            Circlechain
          </Typography>
        </Link>

        {/* Nav Links */}
        {mounted && !isMobile && (
          <Box sx={{ display: 'flex', gap: 0.5, ml: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  sx={{
                    color: '#FFF',
                    fontSize: 14,
                    textTransform: 'none',
                    '&:hover': { color: '#00E676' },
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Social Icons */}
        {mounted && !isMobile && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mr: 1 }}>
            {socialIcons.map(({ img, label, href }) => (
              <IconButton
                key={label}
                aria-label={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  border: '1.9px solid #FFF',
                  borderRadius: '5px',
                  padding: '2px',
                  '&:hover': {
                    borderColor: '#00E676',
                    background: 'rgba(0,230,118,0.1)',
                  },
                }}
              >
                <img
                  src={img}
                  alt={label}
                  style={{
                    width: 18,
                    height: 18,
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              </IconButton>
            ))}
          </Box>
        )}

        {/* Auth */}
        {mounted && !isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  {user?.avatar ? (
                    <Avatar src={user.avatar} sx={{ width: 36, height: 36 }} />
                  ) : (
                    <AccountCircleIcon sx={{ color: '#00E676' }} />
                  )}
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      router.push('/profile');
                      setAnchorEl(null);
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push('/dashboard');
                      setAnchorEl(null);
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(0,230,118,0.4)',
                      color: '#00E676',
                      textTransform: 'none',
                      '&:hover': { borderColor: '#00E676' },
                    }}
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Box>
        )}

        {/* Mobile menu */}
        {mounted && isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: { sx: { background: '#0D1B2A', width: 260 } },
        }}
      >
        <List sx={{ pt: 4 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.label}
              component={Link}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary={link.label} sx={{ color: '#fff' }} />
            </ListItem>
          ))}

          <ListItem>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {socialIcons.map(({ img, label, href }) => (
                <IconButton
                  key={label}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    borderRadius: '6px',
                    padding: '6px',
                    '&:hover': {
                      borderColor: '#00E676',
                      background: 'rgba(0,230,118,0.1)',
                    },
                  }}
                >
                  <img
                    src={img}
                    alt={label}
                    style={{
                      width: 16,
                      height: 16,
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </IconButton>
              ))}
            </Box>
          </ListItem>

          <ListItem>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
              {isAuthenticated ? (
                <>
                  <Button
                    fullWidth
                    onClick={() => {
                      router.push('/dashboard');
                      setDrawerOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button fullWidth onClick={handleLogout} color="error">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="outlined">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" style={{ textDecoration: 'none' }}>
                    <Button fullWidth variant="contained">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}