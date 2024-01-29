import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListIcon from '@mui/icons-material/List';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../FireBase/FireBase';
import './SideNav.css';

const Sidebar = ({ open, onClose, admin, Users }) => {
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
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <div className="top-menu">
        <div className="menu-icon-container" onClick={onClose}>
          {open ? <ArrowBackIcon /> : <MenuIcon />}
        </div>
      </div>
      <List>

        <ListItem button onClick={() => navigate('/home')}>
          {open ? <HomeIcon /> : <HomeIcon />} &nbsp; &nbsp;
          {open && <span className="text">Home</span>}
        </ListItem>



        <ListItem button onClick={() => navigate('/viewtask')}>
          {open ? <ListIcon /> : <ListIcon />} &nbsp; &nbsp;
          {open && <span className="text">View Task</span>}
        </ListItem>


        {admin && (
          <ListItem button onClick={() => navigate('/assigntask')}>
            {open ? <AddTaskIcon /> : <AddTaskIcon />} &nbsp; &nbsp;
            {open && <span className="text">Assign Task</span>}
          </ListItem>
        )}

        <hr className='divider' />

        <ListItem button onClick={handleSignOut}>
          {open ? <ExitToAppIcon /> : <ExitToAppIcon />} &nbsp; &nbsp;
          {open && <span className="text">Sign Out</span>}
        </ListItem>
      </List>
    </div>
  );
};

const SideNav = ({ admin }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(!drawerOpen)} admin={admin} />

    </div>
  );
};

export default SideNav;
