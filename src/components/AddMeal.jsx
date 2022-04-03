import { Avatar, Chip, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material'
import React ,{useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { foodSearchForAddNewMeal } from '../services/FoodServices';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { getMealCategories, setNewUserMeal } from '../services/MealsServices';

import LinearProgress from '@mui/material/LinearProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function AddMeal(props) {
    // const [openAddMeal, setOpenAddMeal] = React.useState(true);
    const openAddMeal = props.openAddMeal;
    const setOpenAddMeal = props.setOpenAddMeal;

    const [t, i18n] = useTranslation();
    const [openSearchMenu, setOpenSearchMenu] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [searchChecking, setSearchChecking] = useState(null);
    const [mealItems, setMealItems] = useState([]);
    const [totalMealCalories, setTotalMealCalories] = useState(0);
    const [progress, setProgress] = useState(0);
    const [mealCategories, setMealCategories] = useState([]);
    const [mealCategory, setMealCategory] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const AppAuth = props.AppAuth;
    const setAppAuth = props.setAppAuth;
    const USER = AppAuth.user;


    useEffect(() => {
        
        let target = USER.daily_use_target;
        let using = USER.using_today;

        let percentage = ((using + parseFloat(totalMealCalories)) / target) * 100;
        setProgress(percentage.toFixed(2))

    },[totalMealCalories])






    const handleClickOpen = () => {
      setOpenAddMeal(true);
    };
    const handleClose = () => {
        setOpenAddMeal(false);
    };

    const handleSearch = async (event) => {
        let search = event.currentTarget.value; 
        setOpenSearchMenu(true)
        setSearchChecking(false)
        console.log(search)
        try {
            let  { data } = await foodSearchForAddNewMeal(search);
   

            setSearchItems([...data.data.foods])
            console.log(data)

           
        }catch (error) {
        console.log(error.response.data)

        }

        setSearchChecking(true)
    }

    const addMealItemToCart = (item) => {
        let isExitsInMealItem = mealItems.some(el => el.id === item.id);
        if (!isExitsInMealItem) {
            item.quantity = item.unit === 'GM' ? 100 : 1;
            item.unit = t(item.unit);
            let total_calories =item.unit === 'GM' ? (item.quantity / 100) * item.calories : item.quantity * item.calories;
            item.total_calories = total_calories.toFixed(2);

            setMealItems([...mealItems, item]) 
           
        }
       
    }

    const getCategories = async (event) => {
      
        try {
            let  { data } = await getMealCategories();
   

            setMealCategories([...data.data.categories])

           
        }catch (error) {
        console.log(error.response.data)

        }

    }

    useEffect(() => {
        getCategories()
    },[])
    useEffect(() => {
        
        if (mealItems.length > 0) {
            let total = 0;
            mealItems.forEach(item =>  total += parseFloat(item.total_calories))
            setTotalMealCalories(total.toFixed(2))
    
        }
    },[mealItems])
    const handleChangeQuantity = (event, id) => {
        let quantity = event.currentTarget.value;
        if (quantity < 1) {
            return
        }
        let items = [...mealItems];
        console.log(items)
        let targetItem = items[id];
        targetItem.quantity = quantity;
        let total_calories =targetItem.unit === 'GM' ? (quantity / 100) * targetItem.calories : quantity * targetItem.calories;
        targetItem.total_calories = total_calories.toFixed(2);

        setMealItems([...items])
    }
    const handleDeleteFromMealItems = (id) => {
        let items = [...mealItems];
        items.splice(id, 1);
        setMealItems([...items])
    }
  
    const checkErrors = () => {
        
        if (mealItems.length < 1) {
            toast.error(t('MESSAGES.ERROR_EMPTY_MEAL_ITEMS'));
            return true
        }

        if (mealCategory < 1) {
            toast.error(t('MESSAGES.ERROR_MEAL_TYPE'));
            return true
        }

        return false;
    }
    const AddNewMeal = async () => {
        if (checkErrors()) {
            return
        }
        setIsSubmit(true)
        let foods = {};

       mealItems.forEach((item) => {
        
           foods[item.id] ={'quantity':item.quantity}
            
            
        })

        let req = {
            foods,
            category_id:mealCategory
        }
        try {
            let  { data } = await setNewUserMeal(req);

            setAppAuth({ Auth: true, user: data.data.user })
            setOpenAddMeal(false)
            toast.success(t('MESSAGES.SAVED_SUCCESSFULLY', { attribute: t('MEAL') }))


           
        }catch (error) {
        console.log(error.response.data)

        }
        setIsSubmit(false)
    }
  return (<Dialog
                  fullScreen
                  open={openAddMeal}
                  onClose={handleClose}
                  TransitionComponent={Transition}
                  >
                  <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                  <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                  >
                      <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  {t('MESSAGES.ADD_NEW_ATTRIBUTE', {attribute:t('MEAL')})}
                  </Typography>
                  <Button autoFocus color="inherit" onClick={AddNewMeal}>
                      {t('SAVE')}
                  </Button>
                  </Toolbar>
                  </AppBar>
                  <List>
                  <ListItem sx={{ p:'20px' }} >
              <Container  >
                  
                  {/* start */}
                <Box sx={{ display: 'flex', alignItems: 'center' ,mb:2}}>
                        <Box sx={{ width: '100%', mr: 1, }}>
                            <LinearProgress sx={{ height:'20px' ,borderRadius:'20px'}} color={ progress > 80 ? 'error' : progress > 70 ?'warning':'success'} variant="determinate" value={progress} />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(progress)}%`}</Typography>
                        </Box>
                  </Box>
                  
                  <Typography component={'p'} sx={{ textAlign:'center', my:3 }}>

                      
                      {t('DAILY_USE_CALORIES_TARGET_PROGRESS',{use: USER.using_today + parseFloat(totalMealCalories) ,from:USER.daily_use_target})}
                  </Typography>
                                          <Grid container spacing={2} alignContent='center' justifyContent={'center'}
                                          >
                                              <Grid item xs={12} sm={12} md={4}>

                                                  {/* search box */}
                          <Box onSubmit={(e) => e.preventDefault()} component={'form'} sx={{borderRadius:1 , py: 3, boxShadow:1, minHeight:'110px', display:'flex' ,alignItems:'center' , flexDirection:'column'}}>

                                                          
                                                              <TextField
                                                                  fullWidth
                                                                  sx={{ maxWidth:"330px" }}
                                                                  autoFocus
                                                                  id="search"
                                                                  name='search'
                                                                  label={t('SEARCH')}
                                                                  type="text"
                                                                  variant="outlined"
                                                                      onChange={handleSearch}
                                                              />




                                                              {
                                                                  
                                                                      openSearchMenu == true &&
                                                                      <List sx={{ boxShadow:1  ,borderRadius:' 0 0 5px 5px', mt:'3px' ,minWidth:'min(327px ,100%)' ,maxHeight:'300px' ,overflow:'auto'}}>
                                                                              
                                                                              {searchItems.map(item =>
                                                                                  <ListItem disablePadding key={item.id}
                                                                                      onClick={() => addMealItemToCart(item)}
                                                                                      disabled ={mealItems.some(el => el.id === item.id)}
                                                                                  >
                                                                                      <ListItemButton>
                                                                                      <ListItemIcon>
                                                                                          <Avatar src={item.file_url} />
                                                                                      </ListItemIcon>
                                                                                      <ListItemText primary={item.name} />
                                                                                      </ListItemButton>
                                                                                  </ListItem>
                                                                                  )}
                                                                              
                                                                              

                                                                              {searchItems.length < 1 && searchChecking ===true && 
                                                                                  <>
                                                                              
                                                                                  <ListItem disablePadding sx={{ textAlign:'center' }}>
                                                                                  
                                                                                      <ListItemText primary={t('MESSAGES.NO_RESULTS_FOUND')} />
                                                                                  </ListItem>
                                                                                  </>

                                                                              }

                                                                              {searchChecking ===false && 
                                                                                  <>
                                                                              
                                                                                  <ListItem disablePadding sx={{ textAlign:'center' }}>
                                                                                  <CircularProgress sx={{ m:'auto' }} />
                                                                                  </ListItem>
                                                                                  </>

                                                                              }

                                                                          </List>
                                                                      
                                                                  }
                                                                  



                                                              </Box>

                                              </Grid>
                                              {/* search box */}


                      <Grid item xs={12} sm={12} md={8}>
                          
                      <Box sx={{ display: 'flex', borderRadius: 1, boxShadow: 1, mb: '1px', p: 1 ,alignItems:'center',justifyContent:'center' }} >

                                                        <Box width={'min(300px,50%)'} mx={1}>
                                                        <FormControl fullWidth  margin="normal">
                                                            <InputLabel id="category-label">{t('MEAL_TYPE')}</InputLabel>
                                                                <Select
                                                                required

                                                            labelId="category-label"
                                                            id="category"
                                                            name="category"
                                                            value={mealCategory}
                                                            label={t('MEAL_TYPE')}
                                                                onChange={ (event) =>  setMealCategory(event.target.value) }
                                                                // error={formik.touched.gender && Boolean(formik.errors.gender)}
                                                                // helperText={formik.touched.gender && formik.errors.gender}
                                                                >
                                                                <MenuItem value={0}  sx={{ display:'none' }}></MenuItem>

                                                                {mealCategories.map(category => 
                                                                    <MenuItem  key={category.id} value={category.id}>{category.name} </MenuItem>
                                                                )}
                                                        

                                                            </Select>
                                                        </FormControl>
                                                        </Box>


                                                        <Chip label={t('TOTAL_CALORIES_IS',{attribute:totalMealCalories})} />

                                                        </Box>

                                   
                                              <TableContainer component={Paper}>
                                                      <Table  aria-label="simple table" sx={{ width:'100%' }}>
                                                          <TableHead>
                                                          <TableRow>
                                                                  <TableCell align="center"  >{ t('FOOD')}</TableCell>
                                                                  <TableCell align="center" >{t('CALORIES')}</TableCell>
                                                                  <TableCell align="center" >{t('QUANTITY')}</TableCell>
                                                                  <TableCell align="center" ></TableCell>
                                                                  
                                                          </TableRow>
                                                          </TableHead>
                                                          <TableBody>
                                                          {mealItems.map((row ,id) => (
                                                              <TableRow
                                                              key={row.id}
                                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                              >
                                                              
                                                                      
                                                              <TableCell align="center"  valign='middle' >
                                                              
                                                                      <Avatar sx={{ my:1 ,display:'block',mx:'auto'}}  src={row.file_url}/>
                                                                      {row.name}
                                                              </TableCell>

                                                                  
                                                                  
                                                              <TableCell align="center"   valign='middle'>{row.total_calories}</TableCell>
                                                                  <TableCell align="center"  valign='middle' >
                                                                      <TextField
                                                                          type={'number'}
                                                                          minLength='1'
                                                                      label={t('QUANTITY')}
                                                                      id="outlined-start-adornment"
                                                                          sx={{ m: 1, width: '25ch' }}
                                                                          value={row.quantity}
                                                                          onChange={ (event)=>handleChangeQuantity( event,id)}
                                                                      InputProps={{
                                                                          startAdornment: <InputAdornment position="start">{ row.unit}</InputAdornment>,
                                                                          }}
                                                                          
                                                                      />

                                                                  </TableCell>
                                                                  
                                                                  <TableCell align="center"  valign='middle'>
                                                                  <IconButton onClick={()=> handleDeleteFromMealItems(id)} aria-label="delete" size="large">
                                                                          <DeleteIcon />
                                                                  </IconButton>
                                                                  </TableCell>


                                                              </TableRow>
                                                          ))}
                                                              

                                                          {
                                                                  mealItems.length < 1 &&
                                                                  
                                                                  <TableRow sx={{ border: 0 } }>
                                                                              <TableCell align="center"  colSpan={3}>
                                                                              { t('EMPTY') } 
                                                                              </TableCell>
                                                                  </TableRow>
                                                          }
                                                          </TableBody>
                                                      </Table>
                                               </TableContainer>
                          
                                              </Grid>
                                          </Grid>
                          
                                          <Box mt={3} >
                      
                                            <Button disabled={isSubmit} onClick={AddNewMeal} variant="contained" fullWidth> {t('SAVA') }</Button>
                                          </Box>
                                          {/* end */}

                              </Container>    
                      
                  </ListItem>
                  </List>
                  </Dialog>
            )
}




