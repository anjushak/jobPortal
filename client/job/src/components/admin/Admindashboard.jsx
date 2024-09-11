import React, { useContext, useState } from 'react'
import { AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { removeToken } from '../../localstorage/Localdb';
import toast from 'react-hot-toast';
import { MyContext } from '../..';
import { CiUser } from 'react-icons/ci';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#f4f4f4',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#d3d3d3',
  },
}));

const Admindashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate=useNavigate();
  const {setAuthorized,isAuthorized} = useContext(MyContext)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const logout= async () => {
    try{

       removeToken()
       toast.success('logout successfully');
       setAuthorized(false);
       navigate("/login");
    }catch(error){
    toast.error(error.data.message);
    isAuthorized(true)
    }
  };

  return (
    <div>
  
      <AppBar position="static" style={{ background: "#1c727c" }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />

            </IconButton>
            <Typography variant="h6" style={{ marginLeft: '12px',fontWeight: 'bold', color: '#fff'  }}>
              
              Admin 
            </Typography>
          </div>
           
          
            <div style={{ display: 'flex', alignItems: 'center' }}>
             
              <ul className='nav-dropdown1' style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li onClick={logout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <IoMdLogOut size={30} style={{ marginRight: '8px' }} />
                  <Typography>Logout</Typography>
                </li>
              </ul>
            </div>
          
          
        </Toolbar>
       
      </AppBar>

<StyledDrawer variant="temporary" open={drawerOpen} onClose={toggleDrawer} ModalProps={{keepMounted:true}}>
      <Toolbar />
      <div>
        <Typography variant="h6" style={{ padding: '16px',color:'green'}}>
          
          Admin Panel
        </Typography>
      </div>
      <Divider />
      <List>
        <StyledListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" style={{ color: '#333' }} />
        </StyledListItem>
        <StyledListItem button component={Link} to="/admin/allusers">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Users" style={{ color: '#333' }} />
        </StyledListItem>
        <StyledListItem button component={Link} to="/admin/getalljobs">
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="Jobs" style={{ color: '#333' }} />
        </StyledListItem>
        <StyledListItem button component={Link} to="/admin/applications">
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Applications" style={{ color: '#333' }} />
        </StyledListItem>
        <button onClick={logout}><IoMdLogOut /></button>
      </List>
    </StyledDrawer>
  </div>
  )
}

export default Admindashboard