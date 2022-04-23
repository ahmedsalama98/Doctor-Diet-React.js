import { Avatar, Chip, CircularProgress, Container, Grid, Paper, TextField } from '@mui/material'
import React ,{useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
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
import { getFoodCategories } from '../services/FoodServices';
import LinearProgress from '@mui/material/LinearProgress';
import { AppAuthContext } from '../AppAuthContext';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function AddMeal(props) {
    // const [openAddMeal, setOpenAddMeal] = React.useState(true);
    const openAddMeal = props.openAddMeal;
    const setOpenAddMeal = props.setOpenAddMeal;

    const [t] = useTranslation();
    const [openSearchMenu, setOpenSearchMenu] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [searchChecking, setSearchChecking] = useState(null);
    const [mealItems, setMealItems] = useState([]);
    const [totalMealCalories, setTotalMealCalories] = useState(0);
    const [progress, setProgress] = useState(0);
    const [mealCategories, setMealCategories] = useState([]);
    const [mealCategory, setMealCategory] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const { AppAuth, setAppAuth } = useContext(AppAuthContext);
    const [foodCategories, setFoodCategories] = useState([]);


    const USER = AppAuth.user;
    const [foodFilters, setFoodFilters] = useState({
        search: '' ,
        category_id:0 ,
        calories: 0,  
    });
    
    const calories = [
        20, 30,40,50, 60,70,80,90,100,150,200,250,300,350,400,500,
    ];
    

      const getCategoriesFood = async () => {
    
        try {
          let { data } = await getFoodCategories();
          
        
          setFoodCategories([...data.data.categories])
          
        } catch (error) {
          
          console.log(error.response.data)
        }
      }
    
  


    const handleClickOpen = () => {
      setOpenAddMeal(true);
    };
    const handleClose = () => {
        setOpenAddMeal(false);
    };

    const handleFoodSearch = (event) => {
    
        let newSearchFilter ={...foodFilters , [event.target.name ]:event.target.value} 
        setFoodFilters(newSearchFilter)
        console.log(newSearchFilter)
    
      }
    
    
    const getSearchQuery = () => {
        let query = `?search=${foodFilters.search}&category_id=${foodFilters.category_id}&calories=${foodFilters.calories}`
        return query;
    }
    const handleSearch = async () => {
      
        setOpenSearchMenu(true)
        setSearchChecking(false)
        console.log(getSearchQuery())
        try {
            let  { data } = await foodSearchForAddNewMeal(getSearchQuery());
   

            setSearchItems([...data.data.foods])
            console.log(data)

           
        }catch (error) {
        console.log(error.response.data)

        }

        setSearchChecking(true)
    }

    useEffect(() => {
        handleSearch()
    },[foodFilters])
    const addMealItemToCart = (item) => {
        let isExitsInMealItem = mealItems.some(el => el.id === item.id);
        if (!isExitsInMealItem) {
            item.quantity = item.unit === 'GM' ? 100 : 1;
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
        getCategoriesFood()
  
    },[])


    const handleUpdateProgress = () => {
        
            let total = 0;
            mealItems.forEach(item =>  total += parseFloat(item.total_calories))
            setTotalMealCalories(total.toFixed(2))
        
    }
    useEffect(() => {
        
        handleUpdateProgress()
    }, [mealItems])
    
    useEffect(() => {
        
        let target = USER.daily_use_target;
        let using = USER.using_today;

        let percentage = ((using + parseFloat(totalMealCalories)) / target) * 100;
        setProgress(percentage.toFixed(2))

    }, [totalMealCalories])
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
        handleUpdateProgress()
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
                          <Box onSubmit={(e) => e.preventDefault()} component={'form'} sx={{borderRadius:1 , py: 3 ,px:1.5, boxShadow:1, minHeight:'110px', display:'flex' ,alignItems:'center' , flexDirection:'column'}}>
                        
                                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">{t('CATEGORY')}</InputLabel>
                                  <Select
                                  sx={{ mb:1.5 }} 
                                    
                                            labelId="demo-simple-select-label"
                                            id="search_category"
                                            name='category_id'
                                            value={foodFilters.category_id}
                                            label={t('CATEGORY')}
                                            onChange={handleFoodSearch}
                                        >

                                            <MenuItem value={0}  >{t('ALL')}</MenuItem>
                                
                                            
                                        
                                            {
                                            foodCategories.map((category, id) =>   
                                                <MenuItem value={category.id} key={id}>{category.name}</MenuItem>
                                                
                                            )
                                            }
                                        </Select>
                                        </FormControl>
                        
                              <FormControl fullWidth >
                                                                <InputLabel id="demo-simple-select-label">{ t('CALORIES')}</InputLabel>
                                  <Select
                                                                        sx={{ mb:1.5 }} 

                                                                labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    onChange={handleFoodSearch}
                                                                    name='calories'
                                                                value={foodFilters.calories}
                                                                label={ t('CALORIES')}
                                                                >
                                                                    <MenuItem selected  value={0} >{t('ALL')}</MenuItem>

                                                                    {
                                                                    calories.map((cal, id) =>   
                                                                        <MenuItem value={cal} key={id}>{ t('MORE_THAN_ATT' , {attribute:cal})  }</MenuItem>
                                                                        
                                                                    )
                                                                    }
                                                                
                                                        

                                                            </Select>
                                                            </FormControl>
                                                          
                              

                                                              <TextField
                                                                  fullWidth
                                                                 
                                                                  value={foodFilters.search}
                                                                  autoFocus
                                                                  id="search"
                                                                  name='search'
                                                                  label={t('SEARCH')}
                                                                  type="text"
                                                                  variant="outlined"
                                                                  onChange={handleFoodSearch}
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
                                                                          startAdornment: <InputAdornment position="start">{t( row.unit)}</InputAdornment>,
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




