import React ,{useContext, useState} from 'react';
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

import { AppAuthContext } from '../AppAuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {  toast } from 'react-toastify';
import { AuthEditImage} from '../services/AuthServices';
import { Alert, Avatar, Grid, Paper } from '@mui/material';

export default function EditUserImage() {
  const [t, i18n] = useTranslation();


  const [isSubmit, setIsSubmit] = useState(false)
  const {AppAuth, setAppAuth } = useContext(AppAuthContext);
  const [Errors, setErrors ] = useState({});
    const USER = AppAuth.user;
    const [image, setImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(USER.avatar_url)
  const handleUpdateImage = async (event) => {

    event.preventDefault();
    if (image != null){

      setIsSubmit(true)
 
    let dataForm = new FormData();

    dataForm.append('image', image)

    

    try {
      let { data } = await AuthEditImage(dataForm);
      console.log(data)
      setAppAuth({ Auth: true, user: data.data.user })
      toast.success(t('MESSAGES.SAVED_SUCCESSFULLY', { attribute: t('IMAGE') }));
      setIsSubmit(false)

    } catch (error) {
      setIsSubmit(false)
      toast.error(t('MESSAGES.SOMETHING_WRONG'));
      setErrors({ ...error.response.data.errors })
      console.log(error.response.data)
    }
    

  }
    }
    
    const handelImageUpload = (event) => {
        let file = event.currentTarget.files[0];
        if (file != null) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>  setImageSrc(reader.result);
            reader.onerror = error =>  console.log(error);
            setImage(file)
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

  
<Typography component="h1" variant="h5" my={2}>
        {t('CHANGE_YOUR_IMAGE') }
    </Typography>
    
  

     

        <Container maxWidth='md' p={0} >
        <Box component="form" encType='multipart/form-data' onSubmit={handleUpdateImage} noValidate sx={{ width:'100%', }}>


            
                      <Box  sx={{ display:'flex', alignItems:'center', justifyContent:'center' ,my:3 , flexWrap:'wrap'}} >

                         
                          <Avatar alt={USER.name} src={imageSrc} sx={{ width: '200px', height: '200px', mx:1, my:3 }} />
                          
                                      {/* image */}
                                                
                                                
                                                <Box sx={{ display:'flex' ,justifyContent:'center'}}>
                                                <Button
                                                            variant="contained"
                                                    component="label"
                                                    size="large"
                                                    endIcon={<FaceIcon />}
                                                    startIcon={<CloudUploadIcon  />}
                                                    fullWidth
                                                    sx={{ height:'53px' ,mb:'-5px !important'}}
                                                    
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
                                                {Errors.birth_date&&
                                                <Alert severity="error">{  Errors.image[0] } </Alert>
                                            
                                                }
                                        
                                                {/* image */}
                          



                      </Box>


            
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