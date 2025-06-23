// ===== src/pages/SignUp.jsx =====
import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  InputAdornment,
  IconButton,
  Link,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import {
  Person as PersonIcon,
  Email as EmailIcon,
  LockOutlined as LockOutlinedIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Image as ImageIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import '../App.css';

export default function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayName: '', email: '', password: '', phone: '', address: '', photoURL: ''
  });

  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setPreview(form.photoURL || '');
  }, [form.photoURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { displayName, email, password, phone, address, photoURL } = form;
    if (!displayName.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName, photoURL });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
        phoneNumber: phone,
        address,
        createdAt: serverTimestamp()
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.07)',
    input: { color: '#fff' },
    label: { color: '#fff' },
    '& .MuiInputBase-root': {
      color: '#fff',
      borderRadius: 2
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff80bf',
        borderWidth: 2,
        transition: '0.3s ease'
      },
      '&:hover fieldset': {
        borderColor: '#FFD700',
        boxShadow: '0 0 6px #FFD700'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
        boxShadow: '0 0 10px #ffb6c1'
      }
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${process.env.PUBLIC_URL}/img2siUP.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <Card elevation={10} sx={{
        maxWidth: 420,
        width: '100%',
        borderRadius: 4,
        border: '2px solid #ffb6c1',
        boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
        color: '#fff'
      }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{
              width: 64,
              height: 64,
              background: 'linear-gradient(135deg, #FF69B4, #FFD700)',
              boxShadow: '0 0 15px rgba(255,105,180,0.6)',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }}>
              <LockOutlinedIcon fontSize="large" sx={{ color: '#000' }} />
            </Avatar>

            <Typography variant="h5" fontWeight="bold">Sign Up</Typography>
            <Typography variant="subtitle1" textAlign="center" sx={{ color: '#eee' }}>
              Join the Brush and Blooms family today!
            </Typography>

            {preview && <Avatar src={preview} alt="Preview" sx={{
              width: 72, height: 72,
              border: '2px solid #FF69B4',
              boxShadow: '0 0 10px rgba(255,105,180,0.3)'
            }} />}

            {error && (
              <Typography variant="body2" color="error" textAlign="center">{error}</Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField name="displayName" label="First Name" required fullWidth
                  value={form.displayName} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>
                  }} sx={inputStyle} />
                   <TextField name="displayName" label="Last Name" required fullWidth
                  value={form.displayName} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>
                  }} sx={inputStyle} />

                <TextField name="email" label="Email Address" required fullWidth type="email"
                  value={form.email} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>
                  }} sx={inputStyle} />

                <TextField name="password" label="Password" required fullWidth
                  type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#fff' }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }} sx={inputStyle} />

                <TextField name="phone" label="Phone Number" required fullWidth
                  value={form.phone} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>
                  }} sx={inputStyle} />

                <TextField name="address" label="Address" required fullWidth multiline rows={2}
                  value={form.address} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>
                  }} sx={inputStyle} />

                <TextField name="photoURL" label="Photo URL (optional)" fullWidth
                  value={form.photoURL} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><ImageIcon /></InputAdornment>
                  }} sx={inputStyle} />

                <Button type="submit" fullWidth size="large" disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    color: '#000',
                    background: 'linear-gradient(90deg, #FF69B4, #FFD700)',
                    boxShadow: '0 0 10px rgba(255, 105, 180, 0.4)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      background: 'linear-gradient(90deg, #FF1493, #FFC300)',
                      boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)'
                    }
                  }}>
                  {loading ? 'Creating account…' : 'Sign Up'}
                </Button>

                <Typography variant="body2" textAlign="center">
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/signin" sx={{ color: '#fff' }}>
                    Sign in
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
