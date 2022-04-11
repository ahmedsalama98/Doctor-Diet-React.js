import { Container, Grid, Paper, Alert, Link, Divider ,Button } from '@mui/material';
import React ,{useState} from 'react'
import HomeLanding from '../components/HomeLanding';
import { useTranslation } from 'react-i18next';
import { getFoodCategories } from '../services/FoodServices';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Spin from 'react-reveal/Spin';
import TransitionGroup from 'react-transition-group/TransitionGroup';




export default function Home() {
  const [t] = useTranslation();
  const [foodCategories, setFoodCategories] = useState([]);

  
  const getCategoriesFood = async () => {
    
    try {
      let { data } = await getFoodCategories();
      
      setFoodCategories([...data.data.categories])
      console.log(data);
      
    } catch (error) {
      
      console.log(error.response.data)
    }
  }

  useEffect(()=>{
    getCategoriesFood()
    navigator.mediaDevices.getUserMedia({audio:true});
  },[])



    return (
      <>
       
       <HomeLanding />
       <Divider />
        <Container >

          
          <Paper  sx={{ py:10}}>


          <Typography component={'h2'} variant="h5" mb={5} textAlign="center"> 
             {t('FOOD_Categories')}
           </Typography>
           <TransitionGroup>
       <Grid container spacing={1} >
  

              
 
        { foodCategories.map((category ,id)=>

      
       <Grid key={id} item xs={6} sm={6} md={4}> 
     
       <Fade bottom>
 <RouteLink style={{   textDecoration:'none'}} to={'/food?category_id=' + category.id} >

         <Box sx={{ display:'flex' , flexDirection:'column' ,justifyContent:'center', alignItems:'center', my:2 }}>
            
            <Spin>
               <Avatar sx={{ width:'150px',height:'150px' }} alt ={category.name}  src={category.file_url}/>
            </Spin>
             
             
                <Typography component={Link} variant="p" underline="hover" my={1}> 
                {category.name}
                </Typography>
          
         </Box>
         </RouteLink> 
            </Fade>    
      </Grid>
      
        )



        }
          


        </Grid>
        </TransitionGroup>

        <Divider />


             <Fade left>
          <Box py={5} mt={5} textAlign='center'>
              <Button variant='contained' to='/contact-us' component={RouteLink} > {t('CONTACT_US')} </Button>
          </Box>
          </Fade>
          </Paper>
 
        </Container>
        
           

      </>
    
  )
}
