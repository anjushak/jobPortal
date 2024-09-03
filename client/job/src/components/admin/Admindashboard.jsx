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
    {/* <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/admin/allusers">
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem button component={Link} to="/admin/getall">
        <ListItemIcon><WorkIcon  /></ListItemIcon>
        <ListItemText primary="Jobs" />
      </ListItem>
      <ListItem button component={Link} to="/admin/applications">
        <ListItemIcon><AssignmentIcon /></ListItemIcon>
        <ListItemText primary="Applications" />
      </ListItem>
    </List> */}
<AppBar position="static">
        <Toolbar>
          <IconButton color="black"  backgroundColor="black" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />Admin Panel
          </IconButton>
          
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