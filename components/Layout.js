import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { app, database, storage, auth } from '../firebaseConfig';
// import { auth } from '../firebase';
import * as Icons from '@material-ui/icons/'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useRouter } from 'next/router'
import { auth } from "../firebase2";
import { setCookie, deleteCookie } from 'cookies-next';
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Button } from '@mui/material';
const drawerWidth = 240;
var mdIcon = 0
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});
export default function Layout({ children, home, user, setuser, name }) {
  const router = useRouter()
  const { asPath } = useRouter()
  
  // const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open_ = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = async () => {
    console.log("logout");
    await signOut(auth);
    deleteCookie('user')
    localStorage.removeItem('user')
    router.push('/Login')
  };

  function capitalizeFirstLetter(str) {
    return str[0]?.toUpperCase() + str.slice(1);
  }

  function appBarLabel(label) {
    return (
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
      </Toolbar>
    );
  }
  useEffect(() => {
    console.log(router.pathname);
  }, [])
  console.log(":>",asPath.indexOf("/adm"))
  if (asPath.includes("/Login")){
    return (
      <ThemeProvider theme={darkTheme}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CssBaseline />
          {children}
        </Box>
      </ThemeProvider>
    )
  }
  if (asPath.includes("/adm",2)){
    return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={6} sm={6} md={6} >
              <Typography variant="h6" noWrap component="div">
              Arteweb 
            </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6}  >
              <Typography variant="h7" noWrap component="div" align="right">
              <Button
                startIcon={<AccountCircleIcon />}
                id="basic-button"
                variant="text"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
              {user?.displayName} 
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open_}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Typography>
            </Grid>
          </Grid>
          
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            ['Enviar', 'AddAPhoto', `/${user?.displayName}/adm/create`], 
            ['Listar', 'PhotoLibrary', `/${user?.displayName}/adm/list`], 
            ['Login', 'AccountBox', '/Login'], 
            ['Novo usuario', 'AcUnit', '/SignUp ']
          ].map(([text, icon, link], index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Link href={link}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>  
                  
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }} >
                      {React.createElement(Icons[icon])}
                    </ListItemIcon>
                
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
    )
  }else{
    return (
      <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <AppBar position="fixed" color="primary" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          {/* <AutoAwesomeIcon sx={{ display: { md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { md: 'flex' },
              flexGrow: 1,
              textAlign: "center",
              fontFamily: 'Arial',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          {capitalizeFirstLetter(asPath.split("/")[1])}

          </Typography>
          </Toolbar>
          </Container>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{marginTop: "60px"}}>
            {children}
        </Box>
        {/* <AppBar position="static" color="primary">
          {appBarLabel('default')}
        </AppBar> */}
      </ThemeProvider>
        {/* <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {capitalizeFirstLetter(location.pathname.split("/")[1])}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
        </Box> */}
      </>



      
    );
  }
}
export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      name: "req.headers" 
    }
  };
};