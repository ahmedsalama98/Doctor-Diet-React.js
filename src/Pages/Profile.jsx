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
    <Paper sx={{ width: '100%', bgcolor: 'primary.main' }}>
      
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
        
          <Paper sx={{ bgcolor: 'background.paper', m: 0, p: 0, borderRadius: '0', minHeight:'84vh' }}>
            
          <TabPanel value={'info'} sx={{ padding:0 }}>
            <ProfileInfo user ={USER} />
          </TabPanel>
          <TabPanel value={'edit-info'}  sx={{ padding:0  }}>
            <EditInf />

          </TabPanel>

          <TabPanel value={'edit-image'} sx={{ padding: 0 }}>
            <EditUserImage />
          </TabPanel>

          <TabPanel value={'edit-password'} sx={{ padding: 0 }}>
            <EditPassword />
            </TabPanel>
            

            <TabPanel value={'weight'} sx={{ padding: 0 }}>
              

              <UserWeightHistory />
            </TabPanel>
            



            <TabPanel value={'daily-meals'}>
            <UserMeals USER ={USER} />
            </TabPanel>
        </Paper>
          
</TabContext>
        

        

      </Container>     
   
    </Paper>
  )
}
