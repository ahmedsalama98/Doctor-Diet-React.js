import React, { useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Link  as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function ProfileInfo(props) {

    const [t, i18n] = useTranslation();

  console.log(props)
  return (
    <>
      {/* front section */}
        <Box sx={{ m:0, display: 'flex',flexDirection:'column' , alignItems: 'center',bgcolor:'error.main',py:1, justifyContent:'center',}} >
        
        
        <Avatar component={RouterLink} to={'/profile/edit-image'} alt={props.user.name} src={props.user.avatar_url} sx={{ width: '200px', height: '200px', my: 2 }} />


              <Typography variant="h2" fontSize={30} component={'h2'} sx={{ textTransform:'capitalize' }}> {props.user.name} </Typography>     
        
      
      
      </Box>
   {/* front section */}


        <Box sx={{ display: 'flex', alignItems: 'center' }} >
        <List
                  sx={{
                    width: '100%',
                    // maxWidth: 360,
                  bgcolor: 'background.paper',
                    margin:'auto'
                  }}
                >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <AlternateEmailIcon />
                                  </Avatar>
                                  
                                </ListItemAvatar>
                                <ListItemText primary={t('EMAIL')} secondary={props.user.email} />
                                
                              </ListItem>
                                <Divider variant="inset" component="li" />
            


                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <CelebrationIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('BIRTH_DATE')} secondary={props.user.birth_date}  />
                              </ListItem>
                              <Divider variant="inset" component="li" />
            

          
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <AdjustIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('DAILY_USE_CALORIES_TARGET')} secondary={props.user.daily_use_target + ' ' + t('CALORIES')} />
                               </ListItem>

                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <TransgenderIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('GENDER')} secondary={props.user.gender== 0 ? t('MALE'):t('FEMALE')} />
                               </ListItem>

          

            <Box sx={{ display:'flex',flexWrap:'wrap' , justifyContent:'space-between' , p:2}}>
              
                <Link  to={'/profile/edit-info'} variant="body2" component={RouterLink }>
                {t('EDIT_PROFILE_INFO')}
               
              </Link>
              
              <Link  to={'/profile/daily-using'} variant="body2" component={RouterLink }>
                {t('YOUR_DAILY_MEALS')}
                </Link>
              

              </Box>
                </List>
  
        
        </Box>
      </>
  )
}
