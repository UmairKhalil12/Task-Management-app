import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/FireBase';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './SideNav.css';

const LeftDrawer = ({ open, onClose, admin }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      auth.signOut();
      window.alert('Successfully signed out');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="drawer-container"
    >
      <div>
        <List>
          {admin ? (
            <ListItem button onClick={() => navigate('/home')}>
              <HomeIcon /> &nbsp; &nbsp; Home
            </ListItem>
          ) : (
            <ListItem button onClick={() => navigate('/home')}>
              <HomeIcon /> &nbsp; &nbsp; Home
            </ListItem>
          )}

          {admin ? (
            <ListItem button onClick={() => navigate('/admin')}>
              <ListIcon /> &nbsp; &nbsp; View Task
            </ListItem>
          ) : null}

          {admin ? (
            <ListItem button onClick={() => navigate('/assigntask')}>
              <AddTaskIcon /> &nbsp; &nbsp; Assign Task
            </ListItem>
          ) : null}
        </List>
        <List>
          <hr className="divider" />
          <ListItem button onClick={handleSignOut}>
            <ExitToAppIcon /> &nbsp; &nbsp; SignOut
          </ListItem>
        </List>
      </div>
    </Modal>
  );
};

const SideNav = ({ admin }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="menu-icon-container"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        {drawerOpen ? (
          <ArrowBackIcon style={{ marginRight: '8px' }} />
        ) : (
          <MenuIcon style={{ marginRight: '8px' }} />
        )}
      </div>
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} admin={admin} />
    </div>
  );
};

export default SideNav;
