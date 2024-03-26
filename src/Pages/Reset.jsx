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
import '../Components/myStyles.css'
import { useState } from 'react';
import { LoginUser, ResetPasswordApi } from '../Services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux/chatSlice'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});

export default function ResetPassword() {

  const { token } = useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [newPassword,setNewPassword]=useState('');
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      
      const response = await ResetPasswordApi({newPassword: newPassword },token);
      console.log(response);
      toast.success('Password Changed Successfully!');
      navigate('/'); // Redirect to login page after successful password reset
    } catch (error) {
      toast.error(`${error.messege}`)
      console.log(error);
      // Handle error (e.g., display error message to the user)
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
          }} className='login'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }} // Set label color
              InputProps={{ style: { color: 'white' } }} // Set text color
              name="Password"
              label="New Password"
              type="password"
              id="Password"
              autoComplete="password"
              onChange={(e)=>setNewPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" sx={{color:'white'}} variant="body1">
                  SignIn
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" sx={{color:'yellow'}} variant="body1">
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