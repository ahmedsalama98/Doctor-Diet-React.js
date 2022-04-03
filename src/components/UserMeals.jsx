import { Avatar, CircularProgress, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import React ,{useState ,useEffect ,useContext} from 'react'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

import AddMeal from './AddMeal';
import { useTranslation } from 'react-i18next';
import { AppAuthContext } from '../AppAuthContext';




export default function UserMeals(props) {
    const [openAddMeal, setOpenAddMeal] = useState(true);
    const [t, i18n] = useTranslation();
    const [progress, setProgress] = useState(0);
    const { AppAuth, setAppAuth } = useContext(AppAuthContext);
    const USER = AppAuth.user;

   

    const handleClickOpen = () => {
      setOpenAddMeal(true);
    };
    const handleClose = () => {
        setOpenAddMeal(false);
        
  };
  
  useEffect(() => {
        
    let target = USER.daily_use_target;
    let using = USER.using_today;

    let percentage = (using  / target) * 100;
    setProgress(percentage.toFixed(2))

    console.log(USER)

},[])

 

  
  return (
    
      <Container  sx={{ py:3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' ,mb:2}}>
                        <Box sx={{ width: '100%', mr: 1, }}>
                            <LinearProgress sx={{ height:'20px' ,borderRadius:'20px'}} color={ progress > 80 ? 'error' : progress > 70 ?'warning':'success'} variant="determinate" value={progress} />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
                        </Box>
                  </Box>
                  
                  <Typography component={'p'} sx={{ textAlign:'center', my:3 }}>
                      
                      {t('DAILY_USE_CALORIES_TARGET_PROGRESS',{use: USER.using_today  ,from:USER.daily_use_target})}
                  </Typography>

      
      
          {/* creat meal Dialog */}


          
          <AddMeal AppAuth={AppAuth}  openAddMeal={openAddMeal}  setOpenAddMeal={setOpenAddMeal} setAppAuth={setAppAuth} />
            </Container>


          

  )
}




