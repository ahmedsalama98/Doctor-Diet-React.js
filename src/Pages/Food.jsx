
import { Container, Paper, TextField ,Box, Grid, CircularProgress, Chip, Link } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams ,useSearchParams ,Link as RouterLink} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getFoodCategories, getFoodsWithFilters } from '../services/FoodServices';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from '@mui/material/PaginationItem';
const Food = () => {
   
  const navigate = useNavigate()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const [foodCategories, setFoodCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodsChecking, setFoodsFoodsChecking] = useState(false);
  
  const [paginate,setPagination] = useState({});


  const location = useLocation()
  const [t, i18n] = useTranslation();

  const calories = [
    20,50,100,150,200,250,300,350,400,500,600,700,900,1000
  ];
  const [foodFilters, setFoodFilters] = useState({
    search: searchParams.get('search')!= null? searchParams.get('search') :'' ,
    category_id: searchParams.get('category_id') != null? searchParams.get('category_id') :0 ,
    calories: searchParams.get('calories') != null ? searchParams.get('calories') : 0,
    page: searchParams.get('page')!= null? searchParams.get('page') :1,

  });
 

  

  const handleFoodSearch = (event) => {
    

    let newSearchFilter ={...foodFilters , [event.target.name ]:event.target.value} 
    setSearchParams(newSearchFilter)
    setFoodFilters(newSearchFilter)

  }

 

  const handleChangePagination = (event, value) => {
    let newSearchFilter = { ...foodFilters, page: value } 
    setSearchParams(newSearchFilter)
    setFoodFilters(newSearchFilter)
  };

  const getCategories = async () => {
    
    console.log(location.search)
    try {
      let { data } = await getFoodCategories();
      
      setFoodCategories([...data.data.categories])
      
    } catch (error) {
      
      console.log(error.response.data)
    }
  }


  const getFoods = async () => {
    setFoodsFoodsChecking(false)

    try {
      let { data } = await getFoodsWithFilters(location.search);
      setFoods([...data.data.foods])

      setPagination({...data.data.paginate})
      console.log(data)
      
    } catch (error) {
      
      console.log(error.response.data)
    }

    setFoodsFoodsChecking(true)
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getFoods()
  },[searchParams])
  
  return (
    <Container maxWidth='lg' sx={{ pt:'4px'  ,}}>
      

      {/* search Box */}
      <Paper sx={{ boxShadow:2  , p:'10px' ,} }> 
        

      
  
        
        <Grid container spacing={1}>

        <Grid item xs={12} sm={12} md={8}>
          <TextField
               type="search"
              fullWidth
          id="search_input"
              label={t('SEARCH')}
              name="search"
              onChange={handleFoodSearch}

          value={foodFilters.search}
        />

          </Grid>
        <Grid item xs={12} sm={12} md={2}>
                <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">{t('CATEGORY')}</InputLabel>
              <Select
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

          </Grid>


          <Grid item xs={12} sm={12} md={2}>
            
          <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">{ t('CALORIES')}</InputLabel>
          <Select
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

          </Grid>
          
        </Grid>



        
      </Paper>
      {/* search Box */}



      <Paper sx={{minHeight:'88vh' ,}}>

      
      
      { foodsChecking === true && foods.length < 1 &&
          <Typography sx={{ textAlign: 'center' }} mt={.5} pt={5}>
                    
                   { t('EMPTY')}
            </Typography>
      }
       { foodsChecking === false &&
          <Typography sx={{ textAlign: 'center' }} mt={.5} pt={5}>
                    
                  <CircularProgress />
            </Typography>
      }
        <Grid container spacing={5}  mt={.5} px={4} pb={4}  justifyContent='center'>
          
        {foods.map((food, id) =>
            
            <Grid key={food.id} item xs={12} sm={6} md={6} lg={4} >
          
          <Card sx={{ width:{ xs:'min(400px,100%)', sm:'100%',md:'300px'}  ,boxShadow:3 ,m:'auto'}} >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={food.file_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {food.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
       
              <Chip color="primary" variant='outlined' label={    `${food.calories}   ${t('CALORIES')} ${t('PER_' + food.unit)} `} />               
        

        </Typography>

  
      </CardContent>
      <CardActions>
                
                <Link underline="none" to={'/food/'+ food.id} component={RouterLink} > {t('SHOW_DETAILS')}  </Link>
      </CardActions>
    </Card>
            </Grid>
          )}
   
   
          
          <Grid item display={'flex'}  justifyContent="center" xs={12} sm={12}  md={12}>
            
     
            {foods.length > 0 && paginate.lastPage >1&&
              
              <Pagination
              onChange={handleChangePagination}
              count={parseInt(paginate.lastPage)}
              page={parseInt(foodFilters.page)}
            renderItem={(item) => (
             <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />

            }
          </Grid>

      </Grid>

    
        
 
      </Paper>


   </Container>
  )
}

export default Food;