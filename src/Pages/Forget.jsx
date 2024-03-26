import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { ForgetPasswordApi } from '../Services/apiServices';
import { toast } from 'react-toastify';

const defaultTheme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});

export default function Forget() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ForgetPasswordApi({ email });
      toast.success(`Reset link sent to email.`);
      console.log(response);
    } catch (error) {
      toast.error(`Invalid email or user!`);
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" fixed={true} sx={{
            color:'white',
            backdropFilter: 'blur(0px)', // Apply glass-like effect
            backgroundColor: 'rgba(5, 9, 120, 0.893)', // Semi-transparent white background color
            borderRadius: '20px', // Add border radius for rounded corners
            padding: '20px', // Add padding for spacing
          }} className="login">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img src="./images/logo.gif" alt="Logo" style={{height:'100px',width:'100px', margin:'10px'}} />
          <Typography component="h1" variant="h4">
            Forgot Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }} // Set label color
              InputProps={{ style: { color: 'white' } }} // Set text color
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Reset Mail
            </Button>
            <Grid container>
              <Grid item >
                <Link href="/register" sx={{color:'yellow', textAlign:'center'}} variant="body1">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
