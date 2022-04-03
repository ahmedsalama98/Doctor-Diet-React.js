

import { Box, Chip, CircularProgress, Container, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createUserNewWeight, deleteUserWeight, getWeightsHistory } from '../services/WeightServices';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import {  Slide, toast } from 'react-toastify';
import { AuthEditPassword } from '../services/AuthServices';
import { Alert, Paper } from '@mui/material';
import { AppAuthContext } from '../AppAuthContext';

export default function UserWeightHistory() {
 
    const [weights, setWeights] = useState([]);
    const [check, setCheck] = React.useState(false);
    const [openCreateWeight, setOpenCreateWeight] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false)
    const [weightDeleteDialog, setWeightDeleteDialog] = useState(false)
    const [deletedWeight, setDeletedWeight] = useState(0)

    
    const {AppAuth, setAppAuth } = useContext(AppAuthContext);
    const [Errors, setErrors ] = useState({});
      const USER = AppAuth.user;
      console.log(USER)
    const [t] = useTranslation()
    
    const getWeights = async () => {
        
        try {
         let  { data } = await getWeightsHistory();

            console.log(data)
            setWeights(data.data.weights)

        } catch (error) {
            console.log(error.response.data)

        }
        setCheck(true)
    };
    const handleDeleteWeight =async () => {

        
        try {
            let  { data } = await deleteUserWeight(deletedWeight);
   
            console.log(data)
            let newWeights = weights.filter(weight => weight.id !== deletedWeight);
            setWeights([...newWeights]);
            setAppAuth({ Auth: true, user: data.data.user })
            toast.success(t('MESSAGES.DELETED_SUCCESSFULLY', { attribute: t('WEIGHT') }))

   
           } catch (error) {
               console.log(error.response.data)
        }
        setWeightDeleteDialog(false)
    }
    useEffect(() => {

        getWeights()
   
    }, [])
    

    const handleWeightDeleteDialogOpen= ()=>{
        setWeightDeleteDialog(true)
    }
     const handleWeightDeleteDialogClose =()=>{
        setWeightDeleteDialog(false)
    }

    const handleClickOpenCreateWeight = () => {
        setOpenCreateWeight(true);
    };
  
    const handleCloseCreateWeight = () => {
        setOpenCreateWeight(false);
    };
    const handleChangeWeight = async(myData) => {
        
        setIsSubmit(true)
        if (myData.weight == USER.fitness.lastWeight.weight) {
            setIsSubmit(false)

            return 
        }

        try {
            let  { data } = await createUserNewWeight(myData);
   
            setAppAuth({ Auth: true, user: data.data.user })
            let newWeights = [...weights];
            newWeights.unshift( data.data.weight)
            setWeights(newWeights)
            toast.success(t('MESSAGES.SAVED_SUCCESSFULLY', { attribute: t('WEIGHT') }))
            setOpenCreateWeight(false)
        }catch (error) {
        console.log(error.response.data)

        }
        setIsSubmit(false)


    }
    const validationSchema = yup.object({

        weight: yup
            .number(t('VALIDATION.STRING',{attribute:t('WEIGHT')}))
            .min(20, t('VALIDATION.MIN.NUMERIC',{attribute:t('WEIGHT') ,min:20}))
          .required(t('VALIDATION.REQUIRED', { attribute: t('WEIGHT') })), 
    });
    const formik = useFormik({
        initialValues: {
            weight: USER.fitness.lastWeight.weight,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (isSubmit === false) {
                handleChangeWeight(values)

            }
        },
      
    });
    
 
  return (
   <Container maxWidth='md' >
          

          <Box sx={{ py: 3,textAlign:'center'}}>
              
          
                
                  <Chip  icon={<PersonIcon />} sx={{mb:1,px:1,mx:1}} label={t('YOUR_CURRENT_WEIGHT' , {weight:USER.fitness.lastWeight.weight}) } color="primary"  variant="outlined"/>

                  <Chip   icon={<CheckCircleIcon />} sx={{mb:1 ,px:1,mx:1}} label={t('YOUR_PERFECT_WEIGHT' , {weight:USER.fitness.perfect_weight}) } color="success"  variant="outlined"/>

              {USER.fitness.lastWeight.weight > USER.fitness.perfect_weight ? 
                                     <Chip   icon={<InfoIcon />} sx={{mb:1 ,px:1,mx:1}} label={t('YOU_NEED_TO_LOSE_SOME_KG' , {weight:USER.fitness.should_lose_weight}) } color="error"  variant="outlined"/>
                  :
                  USER.fitness.lastWeight.weight == USER.fitness.perfect_weight ?
                  <Chip   icon={<CheckCircleIcon />} sx={{mb:1 ,px:1 ,mx:1}} label={t('YOUR_WEIGHT_IS_PERFECT') } color="success"  variant="outlined"/>

                      :
                      <Chip   icon={<InfoIcon />} sx={{mb:1 ,px:1 ,mx:1}} label={t('YOU_NEED_TO_GAIN_SOME_KG' , {weight:USER.fitness.should_gain_weight}) } color="error"  variant="outlined"/>

                      
                }
              {/* <LinearProgress color='success' sx={{ height:'20px' ,maxWidth:'300px', mx:'auto', my:2}} variant="determinate"  value={ 50}/> */}

              <Box sx={{alignItems:'center',justifyContent:'center',m:'auto' , display:'flex', my:3}}>
                  <Typography component={'span'} variant='h6' mx={2}>
                  {t('YOUR_FITNESS_PROGRESS')}
                  </Typography>
                  <CircularProgressWithLabel  color={USER.fitness.percentage > 80?'primary':'error' } value={USER.fitness.percentage} sx={{ m: 'auto' }} />
              </Box>
              <Button sx={{ my:2 ,mb:7}} onClick={handleClickOpenCreateWeight} variant="contained" > {t('CHANGE_YOUR_CURRENT_WEIGHT')} </Button>
              <Divider />
              <Typography component={'h2'} variant='h5' my={2}>

                  {t('YOUR_WEIGHT_HISTORY')}
              </Typography>
           


              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mx: 'auto' }}>


                  {weights.map((weight ,id) =>
                      


                       <ListItem key={weight.id} secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => {
                              setDeletedWeight(weight.id)
                              handleWeightDeleteDialogOpen()
                          }}>
                        <DeleteIcon />
                          </IconButton>}
                          sx={{ borderBottom:2 }}
                      >
                    
                          <ListItemText primary={weight.weight + ' '+t('KG')} secondary={weight.created_at} />
                         
                    </ListItem>
             
                  )}

                 
                      <Box sx={{  display:'flex', alignItems:'center',flexDirection:'column' ,margin:'auto'}}>

                      {check === true && weights.length < 1 && 
                          <Typography component={'span'} color='warning.dark'  variant='p'>

                             {t('EMPTY_HISTORY')}
                          </Typography>
                         
                          

                      }

                      {check === false &&
                          <>
                                <Typography component={'span'} width='max-content'  variant='p'>
                               {t('LOADING')}
                                </Typography>
                          <CircularProgress />
                          </>
                          

                      }


                      </Box>

                  
            

            </List>
                  
          </Box>


          
          {/* create weight Dialog */}

          <Dialog open={openCreateWeight} onClose={handleCloseCreateWeight}>
        <DialogContent>
          <DialogContentText minWidth={'300px'}>
           
                      {t('CHANGE_YOUR_CURRENT_WEIGHT')}
        </DialogContentText>
                  <Box component="form" encType='multipart/form-data' onSubmit={formik.handleSubmit} noValidate sx={{ width: '100%', py: 3 }}>
                  
                  <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="weight"
                        label={t('WEIGHT')}
                        name="weight"
                        autoComplete="weight"
                            autoFocus
                            type="number"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                        helperText={formik.touched.weight && formik.errors.weight}
                        />
                        {Errors.weight&&
                        <Alert severity="error">{  Errors.weight[0] } </Alert>
                    
                        }   
                  </Box>      

        </DialogContent>
        <DialogActions>
                  <Button onClick={handleCloseCreateWeight}>{t('CANCEL') }</Button>
                  <Button disabled={isSubmit} onClick={formik.handleSubmit }>{ t('CHANGE')}</Button>
        </DialogActions>
          </Dialog>
          
          {/* create weight Dialog */}
          


    <Dialog
        open={weightDeleteDialog}
        // TransitionComponent={Transition}
              keepMounted
              sx={{ p:2}}
        onClose={handleWeightDeleteDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{ t('MESSAGES.ARE_YOU_SURE_DELETE_ATTRIBUTE', {attribute:t('WEIGHT')})}</DialogTitle>
        <DialogContent>
    
        </DialogContent>
        <DialogActions>
                  <Button onClick={handleWeightDeleteDialogClose}>{ t('DISAGREE')}</Button>
          <Button onClick={handleDeleteWeight}>{ t('AGREE')}</Button>
        </DialogActions>
      </Dialog>

    </Container>
  )
}


function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
}
  
