import { Container, Grid, Paper, Alert, Link, Divider ,Button } from '@mui/material';
import React ,{useState ,useEffect ,useContext} from 'react'
import HomeLanding from '../components/HomeLanding';
import { useTranslation } from 'react-i18next';
import { getFoodCategories } from '../services/FoodServices';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Spin from 'react-reveal/Spin';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AppSettingsContext } from '../AppSettingsContext';



export default function Home() {
  const [t] = useTranslation();
  const [foodCategories, setFoodCategories] = useState([]);
  const { AppSettings } = useContext(AppSettingsContext);

  const slider_settings = {
    rtl: AppSettings.lang === 'ar' ? true :false ,
    arrows:false,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  
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
 
  

              
 
<Slider {...slider_settings}>
{ foodCategories.map((category ,id)=>

<div key={id}>
<Box component={'div'} sx={{ display:'flex' , flexDirection:'column' ,justifyContent:'center', alignItems:'center', my:2 }}>
     
    <Spin>
    <Avatar sx={{ width:'150px',height:'150px' }} alt ={category.name}  src={category.file_url}/>
    </Spin>

   
   


      <Link  to={'/food?category_id=' + category.id} component={RouteLink} underline="hover" m={'auto'} my={4} >{category.name}</Link>

</Box>
</div>



 )



 }
</Slider>
          






            <Fade left>
          <Box py={5} mt={5} textAlign='center'>
            
              <Button  variant='contained' to='/contact-us' component={RouteLink} > {t('CONTACT_US')} </Button>
          </Box>
          </Fade>
          </Paper>
 
        </Container>
        
           

      </>
    
  )
}
