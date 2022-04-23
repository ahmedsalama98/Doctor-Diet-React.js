import React, { useContext } from 'react';
import { Button, Link, Typography, } from '@mui/material'
import { Box, minHeight } from '@mui/system';
import {  useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';

import { AppAuthContext } from '../AppAuthContext';
export default function HomeLanding() {
  const [t] = useTranslation();
  const { AppAuth } = useContext(AppAuthContext);

  const  {Auth , user} =AppAuth;
  const navigate =useNavigate();


  const handleNavigation =(route)=>{

    navigate(route);
  }

  

  return (
    <>
                      <Box sx={{ 
                        background:`url(./images/slider/1.jpg) fixed center center`,
                        backgroundSize:'cover',
                        minHeight:'90vh',
                        position:'relative',
                        overflow:'hidden'
               
                       }}   p={0} width={'100%'} maxHeight>

                         <Box 

                           sx={{ background:'rgba(0,0,0,.4) ' ,
                           width:'100%',
                           height:'90vh',
                          }}
                         >

                         

                           
                                <Box 
                            sx={{ 
                              position:'absolute',
                              left:'50%',
                              top:'40%',
                              transform:'translatex(-50% )',
                              display:'flex',
                              flexDirection:'column',
                              justifyContent:'center'



                            }}
                             > 
                                    <Bounce>
                               <Typography variant='h5' sx={{ color:'common.white' ,fontWeight:'bolder' ,justifyContent:'center'}}>

                                   {Auth ? t('MESSAGES.WELCOME_AUTH' ,{name :user.name}) : t('MESSAGES.WELCOME_GUEST')}
                               </Typography>
                               </Bounce>
                         

                                             <Fade bottom>
                                            <Box mt={15}  textAlign='center'>
                                            { Auth ?<>

                                              <Button 
                                              onClick={ ()=> handleNavigation('/profile/daily-meals')}
                                                 sx={{m:1 ,minWidth:'220px',textTransform:'capitalize',fontSize:15  }} color='primary' variant='contained'>  
                                                   {t('MESSAGES.ADD_NEW_ATTRIBUTE', {attribute:t('MEAL')})}
                                               </Button>
                                              <Button 
                                                onClick={ ()=> handleNavigation('/profile/weight')}
                                              sx={{m:1 ,minWidth:'220px',textTransform:'capitalize',fontSize:15 }}  color='primary' variant='contained'>   
                                               {t('ADD_NEW_WEIGHT',)}
                                               </Button>


                                  
            
                                              </>  :

                                              <>
                                               <Button 
                                              onClick={ ()=> handleNavigation('/signup')}
                                                 sx={{m:1   ,minWidth:'220px',textTransform:'capitalize' ,fontSize:15}} color='primary' variant='contained'>  
                                                   {t('JOIN_US')}
                                               </Button>
                                              <Button 
                                                onClick={ ()=> handleNavigation('/food')}
                                              sx={{m:1 ,minWidth:'220px',textTransform:'capitalize',fontSize:15 }}  color='primary' variant='contained'>   
                                               {t('FOOD_SEARCH',)}
                                               </Button>
                                              
                                              </>
                                              }
                                            </Box>
                                            </Fade>
                              
                                
                                </Box>

                           
                              </Box>
          </Box> 

    </>
  );
}
