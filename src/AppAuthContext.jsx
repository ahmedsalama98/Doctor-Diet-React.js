import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import { AuthCheck } from "./services/AuthServices";


export const  AppAuthContext = React.createContext({});

const AppAuthContextProvider = (props) => {
    let AuthInterface = {
        Auth: false,
        user:{}
    };
    const [AppAuth, setAppAuth] = useState(AuthInterface);
    const [checkAuth, setCheckAuth] = useState(false);


    const AppSpinner = () => {
        
        return (
            <Box sx={{ bgcolor: 'text.secondary', height:'100vh'  , width:'100%', display:'flex', alignItems:'center' , justifyContent:'center' , flexDirection:'column'}}>
        <Avatar sx={{ width:"100px", height:"100px",}} variant="square" src='logo.png'></Avatar>
            <Typography fontFamily={'Caveat ,cursive'}  fontSize={40} fontWeight={1000}  component='span'>
            Doctor-Diet
            </Typography>
      
                <CircularProgress />

            </Box>
        )
    }


 
    useEffect(() => {

        // AuthTokenInterceptor(AppSettings.lang);
        const getUser = async () => {
            try {
                let { data } = await AuthCheck();
                setAppAuth({ Auth: true, user: data.data.user })
                // toast.success('Authenticated')
                
              
      
            } catch (e) {
              // toast.error('Not Authenticated')
            }
      
      
            setCheckAuth(true)
        };
        getUser()
    },[])
    return (
        <AppAuthContext.Provider value={{ AppAuth, setAppAuth }}>
            {checkAuth === false ? <AppSpinner />
                : props.children
           }
        </AppAuthContext.Provider>
    )





}

export default AppAuthContextProvider;