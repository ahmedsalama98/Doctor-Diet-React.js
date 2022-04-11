import React ,{useContext, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppAuthContext } from '../AppAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {  toast } from 'react-toastify';
import { AuthEditInfo } from '../services/AuthServices';
import { Alert, Paper } from '@mui/material';

export default function EditInf() {
  const [t, i18n] = useTranslation();


  const [isSubmit, setIsSubmit] = useState(false)
  const {AppAuth, setAppAuth } = useContext(AppAuthContext);
  const [Errors, setErrors ] = useState({});
    const USER = AppAuth.user;

  const validationSchema = yup.object({
    email: yup
    .string(t('VALIDATION.STRING',{attribute:t('EMAIL')}))
    .email(t('VALIDATION.EMAIL',{attribute:t('EMAIL')}))
        .required(t('VALIDATION.REQUIRED', { attribute: t('EMAIL') })),
  name: yup
        .string(t('VALIDATION.STRING',{attribute:t('NAME')}))
        .min(3, t('VALIDATION.MIN.STRING',{attribute:t('NAME') ,min:3}))
        .required(t('VALIDATION.REQUIRED',{attribute:t('NAME')})),

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

      
  });
    


  const formik = useFormik({
    initialValues: {
          email: USER.email,
          name: USER.name,
          daily_use_target:USER.daily_use_target,
      receive_email: USER.receive_email ==0 ? false : true,
      height: USER.height,
      gender: USER.gender,
      birth_date: USER.birth_date,
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

        // console.log(values);
      handleEditInfo(values)
    },
  
    


  });
  const handleEditInfo = async (credentials) => {

    setIsSubmit(true)
 

    
   try {
     let { data } = await AuthEditInfo(credentials);
     console.log(data)
     setAppAuth({ Auth: true, user: data.data.user })
       toast.success(t('MESSAGES.SAVED_SUCCESSFULLY', {attribute:t('INFORMATION')}));
       setIsSubmit(false)

  
   } catch (error) {
     setIsSubmit(false)
     toast.error(t('MESSAGES.SOMETHING_WRONG'));
     setErrors({ ...error.response.data.errors })
     console.log(error.response.data)
   }


  }
  return (

      
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      alignItems: 'center',
      pt: 4,
        pb: 2
      }}
  >

  
      <Typography component="h1" variant="h5" mt={2}>
        {t('EDIT_PROFILE_INFO') }
    </Typography>
    
    <Box component="form" encType='multipart/form-data' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 , p:2 }}>
      
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
            {Errors.gender&&
        <Alert severity="error">{  Errors.gender[0] } </Alert>
       
         }
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




        






        
        {/* receive_email */}
        <Grid item  >

                        
        <FormControlLabel
                  control={<Checkbox onChange={formik.handleChange}  checked={formik.values.receive_email} value={formik.values.receive_email}  name='receive_email' 
                      id='receive_email'
          color="primary" />}
          label={t('I_WANT_RECEIVED_EMAIL')}
        />
          
        </Grid>
        {/* receive_email */}

        {formik.touched.receive_email && formik.errors.receive_email&&
        <Alert severity="error">{formik.errors.receive_email} </Alert>
       
        }

      </Grid>
      



      <Button
          type="submit"
          m={'auto'}
          variant="contained"
                      sx={{ mt: 3, mb: 2  , display:'block', mx:'auto'}}
                      size='large'
        disabled={isSubmit}
        >
           {t('SAVE') }
      </Button>
     






  



              

   
           {/* spinner */}
            
           {isSubmit === true ? 
            <Box sx={{ display: 'flex' ,justifyContent:'center', my:2}}>
            <CircularProgress />
            </Box> :''
       }
              {/* spinner */}

      </Box>
    </Box>

  );
}