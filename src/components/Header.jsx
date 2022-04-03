
import React , {useEffect , useState , useContext}  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MaterialUISwitch from './ModeSwitch';
import { AppSettingsContext } from '../AppSettingsContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { AuthLogout } from '../services/AuthServices';
import { deleteCurrentAuthToken } from '../services/TokenServices';
import { AppAuthContext } from '../AppAuthContext';


const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { AppSettings } = useContext(AppSettingsContext);
  const { toggleAppMode } = useContext(AppSettingsContext);
  const { setAppLang } = useContext(AppSettingsContext);
  const { AppAuth ,setAppAuth} = useContext(AppAuthContext);
  const [t, i18n] = useTranslation();
  const pages =t('APP_MAIN_PAGES',{ returnObjects: true });
  const settings = t('APP_USER_MENU_AUTH',{ returnObjects: true });
  const settings_guest = t('APP_USER_MENU_Guest', { returnObjects: true });
  const [AppName, setAppName] = React.useState('');

  



  const AppNameAnimate = () => {
    
    let i = 0;
    let Logo = 'Doctor-Diet';
    let LogoLength = Logo.length;
    let LogoNew = '';
    const AnimateWithInterval = () => {
      
      if (i < LogoLength && LogoLength != LogoNew.length)  {
      
        LogoNew = LogoNew + Logo[i];
        setAppName(LogoNew )
        setTimeout(AnimateWithInterval, 600)
        i++;

      } else {
        LogoNew = '';
        i = 0;
        setAppName(Logo[i])
        setTimeout(AnimateWithInterval, 600)
      }

    }

  
    AnimateWithInterval()

  }
  useEffect(() => {
    AppNameAnimate()
  },[])
  let navigate = useNavigate()
  let {pathname} =useLocation()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleToggleAppMode = () => {
    toggleAppMode()
    
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
 
   
  };
  const handleChangeLang = (lang) => {
    setAppLang(lang)
    handleClose()
  }
  const handleNavigateToRoute = (route) => {
    navigate(route)
    handleCloseNavMenu()
  }


  const handleCloseUserMenuAndNavigate =(route)=>{

    if (route == '/logout') {

      handleLogOut()


      return
    }
    handleCloseUserMenu()
    navigate(route);
  }

  const handleLogOut = async () => {
    
    try {
      
      let { data } = await AuthLogout();
      setAppAuth({Auth:false, user:null})
      console.log(data)
      deleteCurrentAuthToken()
      // navigate('/');
    } catch (error) {
      
      console.log(error)
    }
  }
  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="lg">
     

        <Toolbar disableGutters>
          <Typography
            variant="div"
            noWrap
            component="div"
          
            sx={{  mx: 2, display: { xs: 'none', md: 'flex' ,alignItems:'center',flexDirection:'column'} }}
            
          >
        
            <Avatar variant="square" src='logo.png'></Avatar>
            <Typography sx={{  width:'90px '  }} fontFamily={'Caveat ,cursive'}  fontSize={16} fontWeight={1000}  component='span'>
            {AppName}
            </Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none',margin:'auto' },
              }}
            >
              {pages.map((page ,id) => (
                <MenuItem className='active' key={id} onClick={()=> handleNavigateToRoute(page.PageRoute)}>
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}

              {AppAuth.Auth === false ? 
             
             settings_guest.map((page ,id) => (
              <MenuItem className='active' key={id} onClick={()=> handleNavigateToRoute(page.PageRoute)}>
                <Typography textAlign="center">{page.pageName}</Typography>
              </MenuItem>
            ))
          
            : ''}
            </Menu>
          </Box>


          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' ,alignItems:'center'} ,flexDirection:'column'}}
          >

   
            <Avatar variant="square" src='logo.png'></Avatar>
            <Typography sx={{  width:'60px '  }} fontFamily={'Caveat ,cursive'}  fontSize={16} fontWeight={1000}  component='span'>
              {AppName}
            </Typography>
           
          </Typography>

  
          
 


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page ,id) => (
              <Button
                key={id}
                onClick={()=> handleNavigateToRoute(page.PageRoute)}
                    sx={{ my: 2, display: 'block' , justifyContent:'end'}}
              
                color='primary'
                variant={pathname ===page.PageRoute ?'outlined':''}
              >
                {page.pageName}
              </Button>
            ))}

            {AppAuth.Auth === false ? 
             settings_guest.map((page ,id) => (
              <Button
                key={id}
                onClick={()=> handleNavigateToRoute(page.PageRoute)}
                    sx={{ my: 2, display: 'block' , justifyContent:'end'}}
              
                color='primary'
                variant={pathname ===page.PageRoute ?'outlined':''}
              >
                {page.pageName}
              </Button>
            ))
            : ''}
          </Box>

        
          
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            

            
          {/* settings box */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } ,justifyContent:'end'}}>
          
          <MaterialUISwitch sx={{ m: 1 }} onChange={handleToggleAppMode} checked ={AppSettings.mode =='dark'?true:false}></MaterialUISwitch>
          
                  {/* lang */}
    
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                         <IconButton
                              id="fade-button"
                              aria-controls={open ? 'fade-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick}
                            >
                
                                <Typography component='p' variant='p'  sx={{ display:'flex',fontSize:17,fontWeight:700, alignItems: 'center' }}>
                                <LanguageIcon  /> 
                                {AppSettings.lang == 'ar' ? 'العربيه' : 'English'}
                                </Typography>
                         
                        </IconButton>
                        
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                        >
                          <MenuItem onClick={()=>handleChangeLang('en')} >English</MenuItem>
                          <MenuItem onClick={()=>handleChangeLang('ar')} >العربيه</MenuItem>
                        </Menu>
            

                 </Box>
            {/* lang */}
            
            
          
          </Box>

          {/* settings box */}
          
            
            {/* Auth */}
 
            {/* isLogin */}
            {AppAuth.Auth ===true ? <>
        
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'success'}} alt={AppAuth.user.name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

        
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting ,id) => (
              <MenuItem key={id} onClick={()=> handleCloseUserMenuAndNavigate(setting.PageRoute)}>
                <Typography textAlign="center">{setting.pageName}</Typography>
              </MenuItem>
            ))}
          </Menu>
            </>
              
              : 
              // isLogin
              <>
                {/* Guest */}
                <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'success'}} alt={''} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

        
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings_guest.map((setting,id) => (
                        <MenuItem key={id} onClick={()=> handleCloseUserMenuAndNavigate(setting.PageRoute)}>
                          <Typography textAlign="center">{setting.pageName}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>

                  {/* Guest */}
              </>
          }

            {/* Auth */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
