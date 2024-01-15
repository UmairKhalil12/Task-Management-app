import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/FireBase';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LeftDrawer = ({ open, onClose, admin }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      auth.signOut();
      window.alert("Successfully signed out");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: '200px',
        '& .MuiDrawer-paper': {
          width: '200px',
          transition: 'width 0.3s ease-in-out',
          backgroundColor: '#ADBFF2',
        },
      }}
    >
      <div style={{ padding: '16px', backgroundColor: '#283593', color: '#fff' }}>
        <h2>Task Management</h2>
      </div>
      <List>
        {admin ? <ListItem button onClick={() => navigate('/home')}> <HomeIcon /> &nbsp; &nbsp;  Home  </ListItem>
          :
          <ListItem button onClick={() => navigate('/home')}> <HomeIcon /> &nbsp; &nbsp; Home  </ListItem>}

        {admin ? <ListItem button onClick={() => navigate('/admin')}> <ListIcon /> &nbsp; &nbsp; View Task   </ListItem> : null}

        {admin ? <ListItem button onClick={() => navigate('/assigntask')}> <AddTaskIcon /> &nbsp; &nbsp; Assign Task   </ListItem> : null}
      </List>
      <List>
        <hr style={{ border: '1px solid grey' }} />
        <ListItem button onClick={handleSignOut}>
          <ExitToAppIcon /> &nbsp; &nbsp;
          SignOut
        </ListItem>
      </List>
    </Drawer>
  );
};

const SideNav = ({ admin }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          zIndex: 1200,
          top: 0,
          left: 0,
          padding: '8px',
          borderRadius: '0 0 4px 4px',
          cursor: 'pointer',
          backgroundColor: '#283593',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon style={{ marginRight: '8px' }} />
        <h2>Task Management</h2>
      </div>
      <LeftDrawer open={drawerOpen} admin={admin} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default SideNav;
