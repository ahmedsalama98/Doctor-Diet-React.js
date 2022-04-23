import React , {useContext, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import './App.css';
import Header from './components/Header';
import { AppSettingsContext } from './AppSettingsContext';
import Food from './Pages/Food';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import GuestMiddleware from './middleware/GuestMiddleware';
import AuthMiddleware from './middleware/AuthMiddleware';
import Profile from './Pages/Profile';
import Footer from './components/Footer';
import FoodItem from './Pages/FoodItem';
import ContactUs from './Pages/ContactUs';





function App() {

  
  const { AppSettings } = useContext(AppSettingsContext);
  const left = AppSettings.lang === 'en' ? 'left' : 'right';
  const right = AppSettings.lang === 'en' ? 'right' : 'left';
  const direction = AppSettings.lang === 'ar' ? 'rtl' : 'ltr';
  const theme = createTheme({
    direction,
    
    left,
    right,
    palette: {
      mode: AppSettings.mode,
    },
  })
console.log(theme)
  useEffect(() => {

  //   // AuthTokenInterceptor(AppSettings.lang);
  // alert()
}, [AppSettings])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div id="top"></div>
      <Paper  sx={{ minHeight: '90vh' , m:0,P:0 , bgcolor:AppSettings.mode =='dark' ?'grey.900':'grey.200', borderRadius:0,
    background:'url(/background-1.jpg) fixed center center',
    backgroundSize:'cover',
    }} dir={AppSettings.lang ==='ar'?'rtl':'ltr'}>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/food/:id" element={<FoodItem />} />
          <Route path="/login" element={ <GuestMiddleware> <Login /></GuestMiddleware>} />
          <Route path="/signup" element={ <GuestMiddleware> <SignUp /> </GuestMiddleware>} />
          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="/profile/" element={<AuthMiddleware><Profile /></AuthMiddleware>} />

          <Route path="/profile/:action/" element={ <AuthMiddleware><Profile /></AuthMiddleware>} />

      </Routes>
      </Paper>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={AppSettings.lang ==='ar'?true :false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>

  );
}


export default App;
