import React ,{useContext, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import CircularProgress from '@mui/material/CircularProgress';
import {  toast } from 'react-toastify';
import { AuthEditPassword } from '../services/AuthServices';
import { Alert, Paper } from '@mui/material';

export default function EditPassword() {
  const [t, i18n] = useTranslation();


  const [isSubmit, setIsSubmit] = useState(false)
  const [Errors, setErrors ] = useState({});

  const validationSchema = yup.object({

    old_password: yup
        .string(t('VALIDATION.STRING',{attribute:t('OLD_PASSWORD')}))
        .min(8, t('VALIDATION.MIN.STRING',{attribute:t('OLD_PASSWORD') ,min:8}))
      .required(t('VALIDATION.REQUIRED', { attribute: t('OLD_PASSWORD') })),
    new_password: yup
        .string(t('VALIDATION.STRING',{attribute:t('NEW_PASSWORD')}))
        .min(8, t('VALIDATION.MIN.STRING',{attribute:t('NEW_PASSWORD') ,min:8}))
        .required(t('VALIDATION.REQUIRED',{attribute:t('NEW_PASSWORD')})),

    new_password_confirmation: yup
        .string(t('VALIDATION.STRING',{attribute:t('NEW_PASSWORD_CONFIRMATION')}))
        .min(8, t('VALIDATION.MIN.STRING',{attribute:t('NEW_PASSWORD_CONFIRMATION') ,min:8}))
        .required(t('VALIDATION.REQUIRED',{attribute:t('NEW_PASSWORD_CONFIRMATION')})),

      
  });
    


  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password:'',
      new_password_confirmation:''

      
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
     let { data } = await AuthEditPassword(credentials);
     console.log(data)
       toast.success(t('MESSAGES.SAVED_SUCCESSFULLY', {attribute:t('INFORMATION')}));
     setIsSubmit(false)
     setErrors({});
  
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
        pb:2
      }}
  >

  
<Typography component="h1" variant="h5" my={2}>
        {t('CHANGE_YOUR_PASSWORD') }
    </Typography>
    
  

     

        <Container maxWidth='xs' p={0} >
        <Box component="form" encType='multipart/form-data' onSubmit={formik.handleSubmit} noValidate sx={{ width:'100%',py:3 }}>


         {/* old_password */}

        <TextField
          margin="normal"
          required
          fullWidth
          id="old_password"
          label={t('OLD_PASSWORD')}
          name="old_password"
          autoComplete="old_password"
              autoFocus
              type="password"
          value={formik.values.old_password}
          onChange={formik.handleChange}
          error={formik.touched.old_password && Boolean(formik.errors.old_password)}
          helperText={formik.touched.old_password && formik.errors.old_password}
        />
         {Errors.old_password&&
        <Alert severity="error">{  Errors.old_password[0] } </Alert>
       
        }
          
                   
        {/* old_password */}
            
            
         {/* new_password */}

        <TextField
          margin="normal"
          required
          fullWidth
          id="new_password"
          label={t('NEW_PASSWORD')}
          name="new_password"
          autoComplete="new_password"
              autoFocus
              type="password"

          value={formik.values.new_password}
          onChange={formik.handleChange}
          error={formik.touched.new_password && Boolean(formik.errors.new_password)}
          helperText={formik.touched.new_password && formik.errors.new_password}
        />
         {Errors.new_password&&
        <Alert severity="error">{  Errors.new_password[0] } </Alert>
       
        }
          
                   
        {/* new_password */}
            
        {/* new_password_confirmation */}

        <TextField
          margin="normal"
          required
          fullWidth
          id="new_password_confirmation"
          label={t('NEW_PASSWORD_CONFIRMATION')}
          name="new_password_confirmation"
          autoComplete="new_password_confirmation"
              autoFocus
              type="password"

          value={formik.values.new_password_confirmation}
          onChange={formik.handleChange}
          error={formik.touched.new_password_confirmation && Boolean(formik.errors.new_password_confirmation)}
          helperText={formik.touched.new_password_confirmation && formik.errors.new_password_confirmation}
        />
         {Errors.new_password_confirmation&&
        <Alert severity="error">{  Errors.new_password_confirmation[0] } </Alert>
       
        }
          
                   
       {/* new_password_confirmation */}
            


            
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
          </Container>  


      </Box>


  );
}