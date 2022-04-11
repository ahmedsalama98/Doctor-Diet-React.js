import React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import ContactMailIcon from '@mui/icons-material/ContactMail';
import {  toast } from 'react-toastify';

import { Alert, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { storeContact } from '../services/ContactServices';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Fade from 'react-reveal/Fade';

export default function ContactUs() {
  const [t] = useTranslation();


  const [isSubmit, setIsSubmit] = useState(false)
  const [Errors, setErrors ] = useState({});


  const validationSchema = yup.object({
    email: yup
    .string(t('VALIDATION.STRING',{attribute:t('EMAIL')}))
    .email(t('VALIDATION.EMAIL',{attribute:t('EMAIL')}))
        .required(t('VALIDATION.REQUIRED', { attribute: t('EMAIL') })),
  subject: yup
        .string(t('VALIDATION.STRING',{attribute:t('SUBJECT')}))
        .min(3, t('VALIDATION.MIN.STRING',{attribute:t('SUBJECT') ,min:3}))
        .required(t('VALIDATION.REQUIRED',{attribute:t('SUBJECT')})),
 message: yup
        .string(t('VALIDATION.STRING',{attribute:t('MESSAGE')}))
        .min(3, t('VALIDATION.MIN.STRING',{attribute:t('MESSAGE') ,min:3}))
        .required(t('VALIDATION.REQUIRED',{attribute:t('MESSAGE')})),
  mobile: yup
      .string(t('VALIDATION.NUMERIC',{attribute:t('MOBILE')}))
      .min(11, t('VALIDATION.MIN.NUMERIC',{attribute:t('MOBILE'),min:11}))
        .required(t('VALIDATION.REQUIRED', { attribute: t('MOBILE') })),
       name: yup
          .string(t('VALIDATION.STRING',{attribute:t('NAME')}))
          .min(3, t('VALIDATION.MIN.STRING',{attribute:t('NAME') ,min:3}))
          .required(t('VALIDATION.REQUIRED', { attribute: t('NAME') })),
   
      
  });
    

  const formik = useFormik({
    initialValues: {
          email: '',
          name: '',
          mobile: '',
          subject: '',
          message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      handleSubmit(values)
    },
  
    


  });
  const handleSubmit = async (DATA) => {

    setIsSubmit(true)






    
   try {
     let { data } = await storeContact(DATA);

     toast.success(t('MESSAGES.SAVED_SUCCESSFULLY', { attribute: t('MESSAGE') })) 
     console.log(data)
     formik.resetForm();

     setErrors({})

  
   } catch (error) {
     toast.error(t('MESSAGES.SOMETHING_WRONG'));
     setErrors({ ...error.response.data.errors })
     console.log(error.response.data)
   }
   setIsSubmit(false)


  }
  return (

    <Paper sx={{ minHeight:'100vh',

    background:'url(/contact-us.jpg) fixed center center',
    backgroundSize:'cover',
    pt:3
    
    }} >


<Fade left>
    <Container component="main" maxWidth="md" sx={{ boxShadow:5  , 
     bgcolor:'background.paper',
     borderRadius:10
    
    }}>
        <Box
           
          sx={{
            display: 'flex',
            flexDirection: 'column',
          alignItems: 'center',
            py:2,
            
          }}
      >

      
    
          <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
            <ContactMailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('CONTACT_US') }
        </Typography>
        
        <Box component="form" encType='multipart/form-data' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          
          <Grid container spacing={1} > 
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


            {/* mobile */}
            <Grid item xs={12}  md={12} lg={6} >

            <TextField
              margin="normal"
              required
              fullWidth
              name="mobile"
              label={t('MOBILE') }
              type="number"
              id="mobile"
              min="0"
              autoComplete="current-mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
          />
             {Errors.mobile&&
            <Alert severity="error">{  Errors.mobile[0] } </Alert>
           
          }
            </Grid>

            {/* mobile */}

            
            {/* subject */}
            <Grid item xs={12}  md={12} lg={6} >

                          
            <TextField
              margin="normal"
              required
              fullWidth
              name="subject"
              label={t('SUBJECT') }
              type="text"
              id="subject"
              autoComplete="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
          />
           {Errors.subject&&
            <Alert severity="error">{  Errors.subject[0] } </Alert>
           
          }
           
            </Grid>

            {/* subject */}

                    {/* message */}
            <Grid item xs={12}  md={12} lg={12} >

                          
            <TextField
              margin="normal"
              required
              fullWidth
              name="message"
              label={t('MESSAGE') }
              type="text"
              id="message"
              autoComplete="message"
              multiline
              rows={5}

              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
          />
           {Errors.message&&
            <Alert severity="error">{  Errors.message[0] } </Alert>
           
          }
           
            </Grid>

            {/* message */}

  



          </Grid>
          

          <Box py={2} display='flex' justifyContent={'center'}>
         <Link href='#' mx={1}>
          <Avatar sx={{ bgcolor:'primary.dark' }}>  <FacebookIcon /> </Avatar>
         </Link>

         <Link href='#'  mx={1}>
          <Avatar sx={{ bgcolor:'warning.light' }}>  <InstagramIcon /> </Avatar>
         </Link>

         <Link href='#'  mx={1}>
          <Avatar sx={{ bgcolor:'info.main' }}>  <TwitterIcon /> </Avatar>
         </Link>

         <Link href='#'  mx={1}>
          <Avatar sx={{ bgcolor:'error.main' }}>  <YouTubeIcon /> </Avatar>
         </Link>

 

       </Box>
  
      


        <Box mt={2} textAlign='center'>
        <LoadingButton
          loading={isSubmit}
                   type="submit"
                   size='large'
                   variant="contained"
          >
               {t('SEND') }

          </LoadingButton>
        </Box>

 
    
    


        
          </Box>
        </Box>
      </Container>
</Fade>


    </Paper>

  );
}