import { Avatar, Badge, Chip, CircularProgress, Container, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React ,{useState ,useEffect ,useContext} from 'react'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';

import AddMeal from './AddMeal';
import { useTranslation } from 'react-i18next';
import { AppAuthContext } from '../AppAuthContext';
import { deleteUserMeal, getTodayMeals, getUserMeals } from '../services/MealsServices';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { object } from 'yup';
export default function UserMeals(props) {
    const [openAddMeal, setOpenAddMeal] = useState(false);
    const [t, i18n] = useTranslation();
  const [progress, setProgress] = useState(0);
  const [todayMeals, setTodayMeals] = useState([]);
  const [lastMonthMeals, setLastMonthMeals] = useState({});

  
  const [checkTodayMeals, setCheckTodayMeals] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [deleteMealAlert, setDeleteMealAlert] = useState(false);
  const [deletedMeal, setDeletedMeal] = useState(0);



    const { AppAuth, setAppAuth } = useContext(AppAuthContext);
    const USER = AppAuth.user;

   
const handleOpenDeleteMeal = (id) => {
  setDeleteMealAlert(true);
  setDeletedMeal(id) 
  };
  const handleCloseDeleteMeal = () => {
    setDeleteMealAlert(false);
        
  };
  
    const handleClickOpen = () => {
      setOpenAddMeal(true);
    };
    const handleClose = () => {
        setOpenAddMeal(false);
        
  };

  const handleDeleteMeal =async () => {
 
    try {
        let  { data } = await deleteUserMeal(deletedMeal);

      
      let newTodayMeals = todayMeals.filter((meal) => meal.id !== deletedMeal);
      setTodayMeals([...newTodayMeals])
        setAppAuth({ Auth: true, user: data.data.user })
        toast.success(t('MESSAGES.DELETED_SUCCESSFULLY', { attribute: t('MEAL') }))


       } catch (error) {
           console.log(error.response.data)
    }
    setDeleteMealAlert(false)
}
  const getMealsForToday =async ()=>{
    try {
      let  { data } = await getTodayMeals();
      setTodayMeals([...data.data.meals])
      // console.log(data.data)

      
     
    }catch (error) {
    console.log(error.response.data)

    }
    setCheckTodayMeals(true)
  }

  const getMeals=async ()=>{
    try {
      let  { data } = await getUserMeals();
      setLastMonthMeals({ ...data.data.meals })
      console.log(data.data.meals )

     
    }catch (error) {
    console.log(error.response.data)

    }
  }


  useEffect(() => {
    getMeals()  
   getMealsForToday()

},[progress])
  
  useEffect(() => {
        
    let target = USER.daily_use_target;
    let using = USER.using_today;

    let percentage = (using  / target) * 100;
    setProgress(percentage.toFixed(2))


},[AppAuth])



  
  return (
    
<>
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
      
       
      <Box textAlign={'center'} my={3}>
        <Button onClick={handleClickOpen} variant='contained' color='primary'>   {t('MESSAGES.ADD_NEW_ATTRIBUTE', {attribute:t('MEAL')})}</Button>
        </Box>
   
             
    

      
        
                     
        
      {/*Today meals  */}
      <Accordion expanded  ={expanded}  sx={{ boxShadow:5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick ={ ()=> setExpanded(!expanded)}
        >
          <Typography sx={{ py:1 }} >{t('TODAY_MEALS',{use: USER.using_today  ,from:USER.daily_use_target})}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        <Typography component={'p'}  sx={{ display:'flex' ,justifyContent:'center'}}>
          {checkTodayMeals ===false &&  <CircularProgress></CircularProgress>}
          </Typography>
          
          <Typography component={'p'}  sx={{ display:'flex' ,justifyContent:'center'}}>
          {todayMeals.length < 1  &&  checkTodayMeals ===true  && t('EMPTY')}
        </Typography>
      <Box display={'flex'} justifyContent={'center'}>
<Grid  container  spacing={2}   width={'100%'} j>
          
 {todayMeals.map((meal, id) =>
                  
  <Grid item xs={12} sm={12} md={3} key={id}  >
    <CardContent   sx={{ boxShadow:2,bgcolor:'background.paper',borderRadius:2,p:1 ,textAlign:'center'}}>
        <Typography  mb={1}  display="flex" justifyContent={'space-between' } alignItems='center'>
                
         <Chip sx={{ fontSize: 11, fontWeight: 'bold', }} label={meal.created_at} icon={<AccessTimeIcon />} />
         <IconButton  onClick={()=> handleOpenDeleteMeal(meal.id)} color='error'>
                       <DeleteIcon />
                </IconButton>
      </Typography >
                <Typography variant="h5" component="div" mb={3}>
                <Chip sx={{fontSize: 20,  }} label ={meal.category.name}  icon ={<FoodBankIcon/>} />
          
      </Typography>
      <Typography sx={{ my: 1.5 }} >

                  <Badge badgeContent={meal.calories } max={1000000000} color="error">
                  <Chip  sx={{fontSize: 20, }} label ={t('MEAL_CALORIES')}  />
                  </Badge>

        </Typography>
      <Typography variant="body2" mt={3}>
        
                  {meal.foods.map((food, id) =>
                    
                  
                  <Chip variant="outlined"  color="primary"  sx={{px:2, fontSize: 16,my:1 }} label ={`${food.quantity} ${food.unit === 'ONE' ? '' : t(food.unit) } ${food.name}  `}  />
                  )}
      
       </Typography>
       
       <Typography  >

             
     </Typography>
      <CardActions>
    </CardActions>
    </CardContent>
  
            </Grid>
                        
          )}
  </Grid>
      </Box>   

        </AccordionDetails>
      </Accordion>
      {/*Today meals  */}




   {/*last month meals  */}
{Object.keys(lastMonthMeals).map((key,id)=>
         
         <Accordion  key={id}  sx={{ boxShadow:1 ,my:1}} >
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel1a-content"
           id="panel1a-header"
           
         >
           <Typography sx={{ py:1 }}>{key}</Typography>
         </AccordionSummary>
         <AccordionDetails>

         
         <Typography component={'p'}  sx={{ display:'flex' ,justifyContent:'center'}}>
          {lastMonthMeals[key].length < 1  &&  t('EMPTY')}
        </Typography>
       <Box display={'flex'} justifyContent={'center'}>
 <Grid  container  spacing={2}   width={'100%'} j>
           
  {lastMonthMeals[key].map((meal, id) =>
                   
   <Grid item xs={12} sm={12} md={3} key={id}  >
     <CardContent   sx={{ boxShadow:2,bgcolor:'background.paper',borderRadius:2,p:1 ,textAlign:'center'}}>
         <Typography  mb={1}  display="flex" justifyContent={'space-between' } alignItems='center'>
                 
          <Chip sx={{ fontSize: 11, fontWeight: 'bold', }} label={meal.created_at} icon={<AccessTimeIcon />} />
         
       </Typography >
                 <Typography variant="h5" component="div" mb={3}>
                 <Chip sx={{fontSize: 20,  }} label ={meal.category.name}  icon ={<FoodBankIcon/>} />
           
       </Typography>
       <Typography sx={{ my: 1.5 }} >
 
                   <Badge badgeContent={meal.calories } max={1000000000} color="error">
                   <Chip  sx={{fontSize: 20, }} label ={t('MEAL_CALORIES')}  />
                   </Badge>
 
         </Typography>
       <Typography variant="body2" mt={3}>
         
                   {meal.foods.map((food, id) =>
                     
                   
                   <Chip variant="outlined"  color="primary"  sx={{px:2, fontSize: 16,my:1 }} label ={`${food.quantity} ${food.unit === 'ONE' ? '' : t(food.unit) } ${food.name}  `}  />
                   )}
       
        </Typography>
        
        <Typography  >
 
              
      </Typography>
       <CardActions>
     </CardActions>
     </CardContent>
   
             </Grid>
                         
           )}
   </Grid>
       </Box>   
 
         </AccordionDetails>
       </Accordion>
        )}

   {/*last month meals  */}




 
          
      { openAddMeal ===true && <AddMeal   openAddMeal={openAddMeal}  setOpenAddMeal={setOpenAddMeal} />}
          
          <Dialog
        open={deleteMealAlert}
        // TransitionComponent={Transition}
              keepMounted
              sx={{ p:2}}
        onClose={handleCloseDeleteMeal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{ t('MESSAGES.ARE_YOU_SURE_DELETE_ATTRIBUTE', {attribute:t('MEAL')})}</DialogTitle>
        <DialogContent>
    
        </DialogContent>
        <DialogActions>
                  <Button onClick={handleCloseDeleteMeal}>{ t('DISAGREE')}</Button>
          <Button onClick={handleDeleteMeal}>{ t('AGREE')}</Button>
        </DialogActions>
      </Dialog>
      
          
          </>
  )
}




