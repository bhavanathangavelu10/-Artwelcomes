// ===== src/pages/SignIn.jsx =====
import bgImage from '../image/projectartimg1.jpg';
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
  IconButton
} from '@mui/material';

import {
  Email as EmailIcon,
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Card
        elevation={10}
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          px: 4,
          py: 3,
          background: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#fff'
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: '#FF1493', width: 64, height: 64, boxShadow: '0 0 10px 2px rgba(255, 105, 180, 0.6)' }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>

            <Typography variant="h5" fontWeight="bold">Sign In</Typography>
            <Typography variant="subtitle1" textAlign="center" sx={{ color: '#eee', mb: 1 }}>
              Welcome to Brush and Blooms!
            </Typography>

            {error && (
              <Typography variant="body2" color="error" textAlign="center">
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@example.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{ background: 'rgba(255,255,255,0.1)', borderRadius: 1, input: { color: '#fff' }, label: { color: '#fff' } }}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'white' }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ background: 'rgba(255,255,255,0.1)', borderRadius: 1, input: { color: '#fff' }, label: { color: '#fff' } }}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #FF69B4, #FFD700)',
                    color: '#000',
                    boxShadow: '0 0 10px rgba(255, 105, 180, 0.4)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      background: 'linear-gradient(90deg, #FF1493, #FFC300)',
                      boxShadow: '0 0 18px rgba(255, 215, 0, 0.7)'
                    }
                  }}
                >
                  Sign In
                </Button>

                <Typography variant="body2" textAlign="center">
                  Don’t have an account?{' '}
                  <Link component={RouterLink} to="/signup" underline="hover" sx={{ color: '#fff' }}>
                    Sign Up
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}