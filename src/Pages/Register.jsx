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
import { LoginUser, RegisterUser } from '../Services/apiServices';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
  },
});




//valiadation schema
const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
    email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),

  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});




export default function Register() {
  const [loading,setLoading]=useState(false);
  


  const handleSubmit = async() => {
    setLoading(true)
    
    try {
             
      const response = await RegisterUser(formik.values);
      if(response.status==201){
        setLoading(false);
        
      toast.success("Singup Successfully! Check Your Email for Activation Link.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      }else{
        toast.error("Unable to Signup", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      console.log(response)
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false);
    }
   
  };




  //formik validation
const formik = useFormik({
  initialValues: {
    name: '',
    email:'',
    password: '',
  },
  validationSchema: validationSchema,
  onSubmit: () => {
   
     handleSubmit();
     formik.resetForm();
    
  },
});




  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" fixed={true} sx={{
            color:'white',
            backdropFilter: 'blur(0px)', // Apply glass-like effect
            backgroundColor: 'rgba(5, 9, 120, 0.893)', // Semi-transparent white background color
            borderRadius: '20px', // Add border radius for rounded corners
            padding: '20px', // Add padding for spacing
          }}  className='login'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }} >
          <TextField
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }} // Set label color
              InputProps={{ style: { color: 'white' } }} // Set text color
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                 error={formik.touched.name && Boolean(formik.errors.name)}
                 helperText={formik.touched.name && formik.errors.name}
            />
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
              value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }} // Set label color
              InputProps={{ style: { color: 'white' } }} // Set text color
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forget" sx={{color:'white'}} variant="body1">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/" sx={{color:'yellow'}} variant="body1">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'fixed', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999 }}>
          <BounceLoader color="#36d7b7" loading={loading} size={200} />
        </Box>
      )}


    </>
  );
}