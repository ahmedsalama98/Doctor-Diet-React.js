import React ,{useContext, useState} from 'react';
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
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Link  as RouterLink , useNavigate}  from'react-router-dom';
import { AuthLogin } from '../services/AuthServices';
import CircularProgress from '@mui/material/CircularProgress';
import { AppAuthContext } from '../AppAuthContext';
import {  toast } from 'react-toastify';
import { setAuthToken } from '../services/TokenServices';
import { Alert, Paper } from '@mui/material';



export default function Login() {
  const [t, i18n] = useTranslation();

  const [isSubmit, setIsSubmit] = useState(false)
  const { setAppAuth } = useContext(AppAuthContext);
  const [Errors, setErrors ] = useState({});

  const navigate =useNavigate()
  
  


  const validationSchema = yup.object({
    email: yup
      .string(t('VALIDATION.STRING',{attribute:t('EMAIL')}))
      .email(t('VALIDATION.EMAIL',{attribute:t('EMAIL')}))
      .required(t('VALIDATION.REQUIRED',{attribute:t('EMAIL')})),
    password: yup
      .string(t('VALIDATION.STRING',{attribute:t('PASSWORD')}))
      .min(8, t('VALIDATION.MIN.STRING',{attribute:t('PASSWORD') ,min:8}))
          .required(t('VALIDATION.REQUIRED',{attribute:t('PASSWORD')})),
     remember_me:yup.boolean(t('VALIDATION.BOOLEAN', { attribute: t('REMEMBER_ME') }))

    
  });
    
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember_me:true
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values)
    },
  });
  



  const handleLogin = async (credentials) => {
    
    setIsSubmit(true)
   try {
     let { data } = await AuthLogin(credentials);
     console.log(data)
     setAppAuth({ Auth: true, user: data.data.user })
     setAuthToken(data.data.token)
     toast.success(t('MESSAGES.LOGIN'));
     navigate('/profile')
  
   } catch (error) {
     console.log(error)
     setErrors({ ...error.response.data.errors })
     setIsSubmit(false)
     toast.error(t('MESSAGES.LOGIN_FAILED'));
   }

   
  }
  return (
    
    <Paper sx={{  height:'100vh'}}>
    <Container component="main" maxWidth="xs" sx={{boxShadow:5, bgcolor: 'background.paper',height:'80vh' , borderRadius:'0 0 40px 40px' ,}}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
            alignItems: 'center',
          py:3
        }}
    >
          <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('LOGIN') }
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('EMAIL')}
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
          />
              {Errors.email&&
            <Alert severity="error">{  Errors.email[0] } </Alert>
           
          }
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('PASSWORD') }
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
          />
               {Errors.password&&
            <Alert severity="error">{  Errors.password[0] } </Alert>
           
          }
            <FormControlLabel
                      control={<Checkbox checked={formik.values.remember_me} value={formik.values.remember_me}
                          onChange={formik.handleChange}
              name='remember_me' color="primary" />}
              label={t('REMEMBER_ME')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmit}
            >
               {t('LOGIN') }
          </Button>
          {/* spinner */}
                
          {isSubmit === true ? 
                <Box sx={{ display: 'flex' ,justifyContent:'center', my:2}}>
                <CircularProgress />
                </Box> :''
           }
                  {/* spinner */}

            <Grid container>
              <Grid item xs>
               
              <Link  to={'/signup'} variant="body2" component={RouterLink }>
              {t('FORGET_PASSWORD')}
                </Link>
              </Grid>
            <Grid item>
              <Link  to={'/signup'} variant="body2" component={RouterLink }>
                {t('DONT_HAVE_ACCOUNT')}
                </Link>
         
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Paper>
   

  );
}