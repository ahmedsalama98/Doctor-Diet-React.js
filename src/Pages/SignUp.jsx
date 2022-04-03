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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppAuthContext } from '../AppAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {  toast } from 'react-toastify';
import { setAuthToken } from '../services/TokenServices';
import { AuthSignUp } from '../services/AuthServices';
import { Alert, Paper } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function SignUp() {
  const [t, i18n] = useTranslation();


  const [isSubmit, setIsSubmit] = useState(false)
  const { setAppAuth } = useContext(AppAuthContext);
  const [Errors, setErrors ] = useState({});
  const navigate = useNavigate()
  const [image, setImage] = useState(null)


  const validationSchema = yup.object({
    email: yup
    .string(t('VALIDATION.STRING',{attribute:t('EMAIL')}))
    .email(t('VALIDATION.EMAIL',{attribute:t('EMAIL')}))
        .required(t('VALIDATION.REQUIRED', { attribute: t('EMAIL') })),
  name: yup
        .string(t('VALIDATION.STRING',{attribute:t('NAME')}))
        .min(3, t('VALIDATION.MIN.STRING',{attribute:t('NAME') ,min:3}))
        .required(t('VALIDATION.REQUIRED',{attribute:t('NAME')})),
    password: yup
      .string(t('VALIDATION.STRING',{attribute:t('PASSWORD')}))
      .min(8, t('VALIDATION.MIN.STRING',{attribute:t('PASSWORD'),min:8}))
          .required(t('VALIDATION.REQUIRED', { attribute: t('PASSWORD') })),
    password_confirmation: yup
          .string(t('VALIDATION.STRING',{attribute:t('PASSWORD_CONFIRMATION')}))
          .min(8, t('VALIDATION.MIN.STRING',{attribute:t('PASSWORD_CONFIRMATION') ,min:8}))
          .required(t('VALIDATION.REQUIRED', { attribute: t('PASSWORD_CONFIRMATION') })),
      gender: yup
           .number(t('MESSAGES.SOMETHING_WRONG'))
      .required(t('VALIDATION.REQUIRED', { attribute: t('GENDER') })),
    birth_date: yup
      .date(('VALIDATION.DATE', { attribute: t('BIRTH_DATE') }))
       .required(t('VALIDATION.REQUIRED', { attribute: t('BIRTH_DATE') })),
    receive_email: yup.boolean(t('MESSAGES.SOMETHING_WRONG')),
    daily_use_target:yup
    .number(t('MESSAGES.SOMETHING_WRONG'))
      .required(t('VALIDATION.REQUIRED', { attribute: t('DAILY_USE_CALORIES_TARGET') })),
      height:yup
      .number(t('MESSAGES.SOMETHING_WRONG'))
      .required(t('VALIDATION.REQUIRED', { attribute: t('Height') })),
      weight:yup
      .number(t('MESSAGES.SOMETHING_WRONG'))
      .required(t('VALIDATION.REQUIRED', { attribute: t('WEIGHT') })),
      
  });
    

  const handelImageUpload = (event) => {
    setImage(event.currentTarget.files[0])
  }
  const formik = useFormik({
    initialValues: {
          email: '',
          name: '',
          password: '',
          password_confirmation:'',
          daily_use_target:500,
      receive_email: true,
      height: 160,
      weight:70,
      gender: 2,
      birth_date: '2000-01-01',
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      handleSignUp(values)
    },
  
    


  });
  const handleSignUp = async (credentials) => {

    setIsSubmit(true)
    let MyData = new FormData()
    for (let i in credentials) {
      MyData.append(i , credentials[i])
    }
    if (image != null) {
      MyData.append('image' , image)

    }


    
   try {
     let { data } = await AuthSignUp(MyData);
     console.log(data)
     setAppAuth({ Auth: true, user: data.data.user })
     setAuthToken(data.data.token)
     toast.success(t('MESSAGES.SIGN_UP_SUCCESSFULLY'));
     navigate('/profile')
  
   } catch (error) {
     setIsSubmit(false)
     toast.error(t('MESSAGES.SOMETHING_WRONG'));
     setErrors({ ...error.response.data.errors })
     console.log(error.response.data.errors)
   }


  }
  return (

    <Paper sx={{  bgcolor:'primary.main',pb:3}}>
      <Container component="main" maxWidth="md" sx={{bgcolor: 'background.paper',pb:2}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          alignItems: 'center',
            py:1
          }}
      >

      
    
          <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('SIGN_UP') }
        </Typography>
        
        <Box component="form" encType='multipart/form-data' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          
          <Grid container spacing={1} alignItems={'center'}> 
            {/* Name */}
            <Grid item xs={12}  md={12} lg={6} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label={t('NAME')}
              name="name"
              autoComplete="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
             {Errors.name&&
            <Alert severity="error">{  Errors.name[0] } </Alert>
           
            }
              
            </Grid>
           {/* Name */}


            {/* email */}

            <Grid item xs={12}  md={12} lg={6} >

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
            </Grid>
            
            {/* email */}


            {/* password */}
            <Grid item xs={12}  md={12} lg={6} >

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
            </Grid>

            {/* password */}

            
            {/* password_confirmation */}
            <Grid item xs={12}  md={12} lg={6} >

                          
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_confirmation"
              label={t('PASSWORD_CONFIRMATION') }
              type="password"
              id="password_confirmation"
              autoComplete="current-password"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
              helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
          />
           {Errors.password_confirmation&&
            <Alert severity="error">{  Errors.password_confirmation[0] } </Alert>
           
          }
           
            </Grid>

            {/* password_confirmation */}

            
            {/* birth_date */}
            <Grid item xs={12}  md={12} lg={6} >

                           
             <TextField
              margin="normal"
              required
              fullWidth
              name="birth_date"
              label={t('BIRTH_DATE') }
              type="date"
              id="birth_date"
              value={formik.values.birth_date}
              onChange={formik.handleChange}
              error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
              helperText={formik.touched.birth_date && formik.errors.birth_date}
          />
           {Errors.birth_date&&
            <Alert severity="error">{  Errors.birth_date[0] } </Alert>
           
             }
            </Grid>
         
            {/* birth_date */}

                  {/* gender */}
            <Grid item xs={12}  md={12} lg={6} >

              

            <FormControl fullWidth  margin="normal">
                    <InputLabel id="gender-label">{t('GENDER')}</InputLabel>
                        <Select
                         required
                    labelId="demo-simple-select-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    label={t('GENDER')}
                          onChange={formik.handleChange}
                          error={formik.touched.gender && Boolean(formik.errors.gender)}
                          helperText={formik.touched.gender && formik.errors.gender}
                    >
                    <MenuItem value={0}>{t('MALE')} </MenuItem>
                    <MenuItem value={1}>{t('FEMALE')} </MenuItem>
                    <MenuItem value={2}> {t('OTHER')} </MenuItem>

                    </Select>
                </FormControl>
            </Grid>

            {/* gender */}


                {/* height */}
            <Grid item xs={12}  md={12} lg={6} >

            <TextField
              margin="normal"
              required
              fullWidth
              name="height"
              label={t('HEIGHT_BY_CENTIMETER') }
              type="number"
              id="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
              />
            {Errors.height&&
            <Alert severity="error">{  Errors.height[0] } </Alert>
           
             }

            </Grid>
            {/* height */}

            {/* weight */}
            <Grid item xs={12}  md={12} lg={6} >

              
            <TextField
              margin="normal"
              
                required
              fullWidth
              name="weight"
              label={t('WEIGHT_BY_GRAM') }
              type="number"
              id="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
              />
            {Errors.weight&&
            <Alert severity="error">{  Errors.weight[0] } </Alert>
           
             }
              
            </Grid>

            {/* weight */}
            <Grid item xs={12}  md={12} lg={6} >

              
              {/* daily_use_target */}
            <TextField
              margin="normal"
              
                required
              fullWidth
              name="daily_use_target"
              label={t('DAILY_USE_CALORIES_TARGET') }
              type="number"
              id="daily_use_target"
              value={formik.values.daily_use_target}
              onChange={formik.handleChange}
              error={formik.touched.daily_use_target && Boolean(formik.errors.daily_use_target)}
              helperText={formik.touched.daily_use_target && formik.errors.daily_use_target}
              />
            {Errors.daily_use_target&&
            <Alert severity="error">{  Errors.daily_use_target[0] } </Alert>
           
             }
            </Grid>
            {/* daily_use_target */}


                   {/* weight */}
            <Grid item xs={12}  md={12} lg={6} >

              
              {/* image */}
               
              
              <Box sx={{ display:'flex' ,justifyContent:'center'}}>
              <Button
                        variant="contained"
                  component="label"
                  size="large"
                  endIcon={<FaceIcon />}
                  startIcon={<CloudUploadIcon  />}
                  fullWidth
                  sx={{ height:'53px' ,mb:'-7px !important'}}
                  
                >         
                      {t('PROFILE_IMAGE')}
                        <input
                    type="file"
                    id='image'
                    name="image"
                           hidden
                           accept="image/*"
                        onChange={handelImageUpload}
                        />
                      </Button>
              </Box>
            {Errors.image&&
            <Alert severity="error">{  Errors.image[0] } </Alert>
           
             }
            </Grid>
            {/* image */}

            






            
            {/* receive_email */}
            <Grid item  >

                            
            <FormControlLabel
                      control={<Checkbox value={formik.values.receive_email}
                          onChange={formik.handleChange}
              name='receive_email' color="primary" />}
              label={t('I_WANT_RECEIVED_EMAIL')}
            />
              
            </Grid>
            {/* receive_email */}


          </Grid>
          


  
          <Button
              type="submit"
              sx={{ mt: 3, mb: 2  , display:'block', mx:'auto'}}
              size='large'
              variant="contained"
            disabled={isSubmit}
            >
               {t('SIGN_UP') }
          </Button>
    
    
       
               {/* spinner */}
                
               {isSubmit === true ? 
                <Box sx={{ display: 'flex' ,justifyContent:'center', my:2}}>
                <CircularProgress />
                </Box> :''
           }
                  {/* spinner */}
            <Grid container>
        
            <Grid item>
            <Link  to={'/login'} variant="body2" component={RouterLink }>
            {t('HAVE_ACCOUNT_ALREADY')}
            </Link>
                  
      
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Paper>

  );
}