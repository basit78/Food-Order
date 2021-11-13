import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, createUserWithEmailAndPassword,storage, ref, uploadBytesResumable, getDownloadURL, db,doc,setDoc} from "../Config/firebase"
const theme = createTheme();

export default function SignUpSide() {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [userrole, setuserrole] = useState('');
  const [password, setpassword] = useState('');
  const [emailerr, setemailerr] = useState('');
  const [passerr, setpasserr] = useState('');
  const [profileimage, setprofileimage] = useState([]);

  const handelClick = async () => {
    try {
      let { user } = await createUserWithEmailAndPassword(auth, email, password)
      const imageref = ref(storage, "Profile Image/" + user.uid);
      const uploadtask = await uploadBytesResumable(imageref, profileimage)
      await getDownloadURL(ref(storage, imageref)).then(async (url) => {
        var A = url
        var obj = {
          username,
          email,
          userrole,
          password,
          uid: user.uid,
          profileimage: A
        }
        let dataRef = doc(db, 'Signup Users', user.uid)
        await setDoc(dataRef, obj);
      });

      } catch (err) {
        if (err.message === 'Firebase: Error (auth/invalid-email).') {
          setemailerr(true)
        }
        if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
          setpasserr(true)
        }
        setTimeout(() => {
          setemailerr('')
          setpasserr('')
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80)',
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
                Sign Up
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <h4>Profile Picture</h4>
                <input type="file" onChange={(ev) => { setprofileimage(ev.target.files[0]) }} />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="User Name/ Restaurant Name"
                  autoComplete="email"
                  autoFocus
                  variant="standard"
                  onChange={(event) => { setusername(event.target.value) }}
                />
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
                  emailerr ?
                    <p style={{ color: "red" }}><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Invalid Email</p>
                    :
                    null
                }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  onChange={(event) => { setpassword(event.target.value) }}
                />
                {

                  passerr
                    ?
                    <p style={{ color: "red" }}>< i className="fa fa-exclamation-circle" aria-hidden="true"></i> Week Password</p>
                    : null

                }
                <FormControl component="fieldset">
                  <FormLabel component="legend">User Role</FormLabel>
                  <RadioGroup>
                    <FormControlLabel value="Restaurant" control={<Radio />} label="Restaurant" onChange={() => { setuserrole("Restaurant") }} />
                    <FormControlLabel value="User" control={<Radio />} label="User" onChange={() => { setuserrole("User") }} />
                  </RadioGroup>
                </FormControl>


                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handelClick}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid >
      </ThemeProvider >
    );
  }




