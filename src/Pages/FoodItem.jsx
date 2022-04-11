import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Paper, Button, Typography, Container, Grid, CircularProgress, InputAdornment, TextField } from '@mui/material'
import { getFoodById } from '../services/FoodServices'
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import Fade from 'react-reveal/Fade';


export default function FoodItem(props) {


    const [food, setFood] = useState({});
    const [foodMedia, setFoodMedia] = useState([]);
    const [checkFood, setCheckFood] = useState(false);

    
    const [t] = useTranslation();

    const param = useParams()

    const checkFoodCalories = (event) => {
        
        let newFood = { ...food };
        newFood.quantity = event.target.value;
        let total =  newFood.unit === 'GM' ?(parseFloat( newFood.quantity ) /100) *  parseFloat(newFood.calories) : parseFloat( newFood.quantity )  *  parseFloat(newFood.calories);
        newFood.total_calories = total > -1 ? total.toFixed(2) :0;
        
        setFood(newFood)

    }
    const getFood = async ()=>{

        try {
            let { data } = await getFoodById(param.id);

            let newFood = { ...data.data.food };
            newFood.quantity = newFood.unit === 'GM' ? 100 : 1;
            newFood.total_calories = newFood.calories.toFixed(2);

            setFood(newFood)
            setFoodMedia([...data.data.food.media])
            console.log(newFood)
        } catch (error) {
            
        }
        setCheckFood(true)
    }

    useEffect(() => {
        getFood()


    },[])
    return (
      <Fade bottom>
           <Container>
      


          

          { foodMedia.length >0 &&
     
                  <Box  height={'60vh'} padding={0} boxShadow={5}  bgcolor='background.paper' sx={{ direction:'ltr !important'
                   }}>
                  <Carousel   style={{ direction:'ltr !important' }}    autoPlay={true} infiniteLoop={true} interval={3000} showStatus={false}>
            {
                  foodMedia.map((media, id) =>
                
                      <Typography variant='div' key={id} p={0} width={'100%'} height="60vh"
                      sx={{  objectFit:'cover'}}
                       component={'img'} src={media.file_url}>

                      </Typography>
                  )
            }
                </Carousel>


                
                  </Box>
 
            }

    

         
                  <Box boxShadow={5} bgcolor='background.paper' >


                  { Object.keys(food).length > 0?
                     <Box p={2} py={4} >
                 <Typography   component={'h1'} variant='h3'  my={1} >

                  {  food.name}
                  </Typography>
                  
       
                          
                          <Typography  component={'div'} display='flex' alignItems={'center'} mb={2}>

                                      <TextField
                                         type={'number'}
                                        minLength='1'
                                         label={t('QUANTITY')}
                                           id="outlined-start-adornment"
                                           sx={{ m: 1, width: '25ch' }}
                                              value={food.quantity}
                                            onChange={ checkFoodCalories}
                                    InputProps={{
                                 startAdornment: <InputAdornment position="start">{t( food.unit)}</InputAdornment>,
                                       }}
                              />
                              
                              { `${food.total_calories}  ${t('CALORIES')}`}
                          </Typography>

                         <Typography   component={'p'} variant='body2'  p={1} mb={2} >

                              {food.description}
                              

                          </Typography>

                      </Box> :
                      
                      <Typography minHeight={'50vh'} pt={36} textAlign='center'> 
                          
                          {
                              checkFood === false ? <CircularProgress /> : t('NOT_FOUND')
                          }
                         

                          
                      </Typography>
                  }
             
        
                  </Box>
    


     
              

  


               


      
      </Container>  
      </Fade>
     
  )
}
