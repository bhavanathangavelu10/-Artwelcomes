import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(null);
  const [openUser, setOpenUser] = useState(null);

  const handleNavOpen = (e) => setOpenNav(e.currentTarget);
  const handleNavClose = () => setOpenNav(null);
  const handleUserOpen = (e) => setOpenUser(e.currentTarget);
  const handleUserClose = () => setOpenUser(null);

  const handleLogout = async () => {
    handleUserClose();
    await signOut(auth);
    navigate('/signin');
  };

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background: 'linear-gradient(90deg, #FFD700, #FF1493)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: 1,
              textShadow: '1px 1px 2px #fff'
            }}
          >
            Brush and Blooms
          </Typography>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                component={RouterLink}
                to="/shop"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Shop
              </Button>
              <IconButton
                component={RouterLink}
                to="/cart"
                sx={{ color: '#fff' }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          )}

          {/* Right-side Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentUser ? (
              <IconButton onClick={handleUserOpen} sx={{ ml: 2 }}>
                <Avatar
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  sx={{ width: 36, height: 36, border: '2px solid white' }}
                />
              </IconButton>
            ) : !isMobile ? (
              <>
                <Button
                  component={RouterLink}
                  to="/signin"
                  variant="outlined"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    fontWeight: 600,
                    mr: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  Sign In
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  sx={{
                    bgcolor: '#fff',
                    color: '#FF1493',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#FFE4E1' }
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : null}

            {isMobile && (
              <IconButton
                onClick={handleNavOpen}
                sx={{ color: '#fff', ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu anchorEl={openNav} open={Boolean(openNav)} onClose={handleNavClose}>
            <MenuItem component={RouterLink} to="/shop" onClick={handleNavClose}>
              Shop
            </MenuItem>
            <MenuItem component={RouterLink} to="/cart" onClick={handleNavClose}>
              Cart
            </MenuItem>
            {currentUser ? (
              <>
                <MenuItem onClick={() => { handleNavClose(); navigate('/profile'); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleNavClose(); handleLogout(); }}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={RouterLink} to="/signin" onClick={handleNavClose}>
                  Sign In
                </MenuItem>
                <MenuItem component={RouterLink} to="/signup" onClick={handleNavClose}>
                  Sign Up
                </MenuItem>
              </>
            )}
          </Menu>

          {/* Avatar Dropdown */}
          <Menu anchorEl={openUser} open={Boolean(openUser)} onClose={handleUserClose}>
            <MenuItem onClick={() => { handleUserClose(); navigate('/profile'); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
