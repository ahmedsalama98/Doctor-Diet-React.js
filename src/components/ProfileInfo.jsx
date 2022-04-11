import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Link  as RouterLink} from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Box, Grid, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';
export default function ProfileInfo({user}) {

    const [t, i18n] = useTranslation();

  console.log(user)
  return (
    <>
      {/* front section */}
        <Box sx={{ m:0, display: 'flex',flexDirection:'column' , alignItems: 'center',bgcolor:'success.main',py:1, justifyContent:'center',}} >
        
        
        <Avatar component={RouterLink} to={'/profile/edit-image'} alt={user.name} src={user.avatar_url} sx={{ width: '200px', height: '200px', my: 2 }} />


 <Typography variant="h2" fontSize={30} component={'h2'} sx={{ textTransform:'capitalize'  , color:'common.white'}}> {user.name} </Typography>     
        
      
      
      </Box>
   {/* front section */}


        <Box sx={{ display: 'flex', alignItems: 'center'}} >
        <List
                  sx={{
                    width: '100%',
                    // maxWidth: 360,
                  bgcolor: 'background.paper',
            margin: 'auto',
            py: 4,
                    px:2
                  }}
        >
          
          <Grid container spacing={2}  >

            
            <Grid item xs={12} sm={12} md={6} lg={4} >
                             <ListItem >
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor:'primary.main' }}>
                                    <AlternateEmailIcon />
                                  </Avatar>
                                  
                                </ListItemAvatar>
                                <ListItemText primary={t('EMAIL')} secondary={user.email} />
                                
                              </ListItem>
            </Grid>


                    
            <Grid item xs={12} sm={12} md={6} lg={4} >

            <ListItem>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor:'primary.main' }}>
                                    <CelebrationIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('BIRTH_DATE')} secondary={user.birth_date}  />
                              </ListItem>
            </Grid>



                    
            <Grid item xs={12} sm={12} md={6} lg={4}>

                 
            <ListItem>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor:'primary.main' }}>
                                    <AdjustIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('DAILY_USE_CALORIES_TARGET')} secondary={user.daily_use_target + ' ' + t('CALORIES')} />
                               </ListItem>
            </Grid>


                    
            <Grid item xs={12} sm={12} md={6} lg={4}>

              
              
            <ListItem>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor:'primary.main' }} >
                                    <TransgenderIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('GENDER')} secondary={user.gender== 0 ? t('MALE'):t('FEMALE')} />
                               </ListItem>
            </Grid>

            
            <Grid item xs={12} sm={12} md={6} lg={4}>

              
              
            <ListItem>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor:'primary.main' }} >
                                    <HeightIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('HEIGHT')}   secondary={user.height +' '+ t('CM')}   />
                               </ListItem>
            </Grid>

            
             <Grid item xs={12} sm={12} md={6} lg={4}>

              
              
            <ListItem>
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor:'primary.main' }} >
                                    <FitnessCenterIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('WEIGHT')}   secondary={user.fitness.lastWeight.weight +' '+ t('KG')}   />
                               </ListItem>
            </Grid>

            



      
          </Grid>
 
            


                  
      
        </List>
        

        
      </Box>
      
      {/* <Box sx={{ display:'flex',flexWrap:'wrap' , justifyContent:'center' , p:2}}>
              
              <Link  to={'/profile/edit-info'} variant="body2" component={RouterLink }>
              {t('EDIT_PROFILE_INFO')}
             
            </Link>
            
            <Link  to={'/profile/daily-meals'} variant="body2" component={RouterLink }>
              {t('YOUR_DAILY_MEALS')}
              </Link>
            
      </Box> */}
      </>
  )
}
