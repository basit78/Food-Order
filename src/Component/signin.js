import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword, auth } from '../Config/firebase';
const theme = createTheme();

export default function SignInSide() {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [emailerr, setemailerr] = useState('');
  const [passerr, setpasserr] = useState('');

  const handelclick = async () => {
    try {
      let { user } = await signInWithEmailAndPassword(auth, email, pass);
      // console.log(user)

    } catch (err) {
      if (err.message === 'Firebase: Error (auth/invalid-email).') {
        setemailerr([true, 'Invaid email'])
      }
      if (err.message === 'Firebase: Error (auth/user-not-found).') {

        setemailerr([true, 'User email not found'])

      }
      if (err.message === 'Firebase: Error (auth/wrong-password).') {
        setemailerr('')
        setpasserr([true, 'Type correct password'])
      }
      setTimeout(() => {
        setemailerr('');
        setpasserr('');
      }, 3000);
    }

  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                variant="standard"
                onChange={(event) => { setemail(event.target.value) }}
              />
              {
                emailerr[0] ?
                  <p style={{color  :"red"}}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {emailerr[1]}</p>
                  :
                  null
              }

              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(event) => { setpass(event.target.value) }}
                autoComplete="current-password"
                variant="standard"
              />
              {
                passerr[0]
                  ?
                  <p style={{color  :"red"}}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> {passerr[1]}</p>
                  : null
              }
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handelclick}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}