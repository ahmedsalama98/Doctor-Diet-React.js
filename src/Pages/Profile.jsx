import {  Container, Grid, Paper, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'

import { AppAuthContext } from '../AppAuthContext';
import { useTranslation } from 'react-i18next';

import { Link  as RouterLink, useNavigate, useParams} from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import ProfileInfo from '../components/ProfileInfo';
import { useEffect } from 'react';
import EditInf from '../components/EditInfo';
import EditPassword from '../components/EditPassword';
import EditUserImage from '../components/EditUserImage';
import UserWeightHistory from '../components/UserWeightHistory'
import UserMeals from '../components/UserMeals';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Bounce from 'react-reveal/Bounce';
import Roll from 'react-reveal/Roll';

export default function Profile() {
  const allowsParams = ['info', 'edit-info','daily-meals','edit-password','edit-image','weight'];
  const params = useParams()
  const checkActiveParam = () => {
    return allowsParams.some(param => param === params.action) ? params.action : 'info';
  }
  const actionParam  =checkActiveParam();
  const { AppAuth ,} = useContext(AppAuthContext);
  const [t, i18n] = useTranslation();
  const USER = AppAuth.user;
  const [value, setValue] = React.useState(actionParam);
  const navigate = useNavigate()
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate('/profile/'+ newValue)
  };


  useEffect(() => {
    setValue(checkActiveParam())
 
  })



  return (
    <Paper sx={{ width: '100%', bgcolor: 'inherit' }}>
      
    <Container >

  <TabContext value={value}>
  <Box sx={{ width:'100%', bgcolor: 'background.paper' }} >
  <Tabs
  value={value}
  onChange={handleChange}
              variant="scrollable"

  scrollButtons
  allowScrollButtonsMobile
  aria-label="scrollable force tabs example"
>
              <Tab label={t('INFORMATION')} value={'info'} />
              <Tab label={t('DAILY_MEALS')} value={'daily-meals'} />
              <Tab label={t('YOUR_WEIGHT')} value={'weight'} />
              <Tab label={t('EDIT_INFORMATION')} value={'edit-info'} />
              <Tab label={t('CHANGE_IMAGE')}  value={'edit-image'} />
              <Tab label={t('CHANGE_PASSWORD')} value={'edit-password'} />


              

</Tabs>
          </Box>
          
      

        
        
          <Paper sx={{ bgcolor: 'background.paper', m: 0, p: 0, borderRadius: '0', minHeight:'84vh' ,overflow:'hidden'}}>
            
            <TabPanel value={'info'} sx={{ padding: 0 }}>
            <Fade bottom big >
              <ProfileInfo user={USER} />
              </Fade >
          </TabPanel>
            <TabPanel value={'edit-info'} sx={{ padding: 0 }}>
              <Roll top >
                 <EditInf />
              </Roll>
           

          </TabPanel>

            <TabPanel value={'edit-image'} sx={{ padding: 0 }}>
              
              <Bounce>
                     <EditUserImage />
              </Bounce>
       
          </TabPanel>

            <TabPanel value={'edit-password'} sx={{ padding: 0 }}>
              
              <Roll bottom>
                  <EditPassword />
              </Roll>
          
            </TabPanel>
            

            <TabPanel value={'weight'} sx={{ padding: 0 }}>
     
            <Slide left >
            <UserWeightHistory />
              </Slide>

             
            </TabPanel>

            <TabPanel value={'daily-meals'}>

            <Slide right >
            <UserMeals USER ={USER} />
              </Slide>
       
            </TabPanel>
        </Paper>
       
</TabContext>
        

        

      </Container>     
   
    </Paper>
  )
}
