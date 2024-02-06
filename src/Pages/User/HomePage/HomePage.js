import "./styles.css";
import { useState, useEffect } from 'react';
import getUsers from "../UserList";
import SideNav from '../../../Components/Navbar/SideNav'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import UpdateTask from "../../../Components/UpdateTask/UpdateTask";
import PreviewIcon from '@mui/icons-material/Preview';
import ViewTask from "../../../Components/ViewTask/ViewTask";
import { useAppStore } from "../../../appStore";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: 'auto'
};

function HomePage({ user, admin }) {
  console.log("HomePage currentUser", user);
  const [users, setUsers] = useState([]);
  const [Updateindex, setUpdateindex] = useState('');
  const [ViewIndex, setViewIndex] = useState('');


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ViewOpen, setViewOpen] = useState(false);
  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);


  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, [users]);

  const User = users.filter(element => user.uid === element.id);

  const userTasksAssigned = User.map((user) => user.tasksAssigned || User[0]?.tasksAssigned || [])

  const name = User.map((user) => user.name);

  const handleUpdateButton = (index) => {
    handleOpen();
    setUpdateindex(index);
  }

  const handleViewButton = (index) => {
    handleViewOpen();
    setViewIndex(index);
  }

  const drawerOpen = useAppStore(state => state.drawerOpen);

  return (
    <>
      <SideNav user={user} admin={admin} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateTask user={user} index={Updateindex} onClose={handleClose} />
        </Box>
      </Modal>

      <Modal
        open={ViewOpen}
        onClose={handleViewClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ViewTask users={users} currentUser={user} taskIndex={ViewIndex} />
        </Box>
      </Modal>

      <div className={drawerOpen ? 'Page-css-open' : 'Page-css'}>

        <h2>Welcome, {name}</h2>
        <div className={drawerOpen ? 'task-list-open' : 'task-list'}>
          <div>
            <h1>Task(s) Assigned</h1>
            <div className="list-container">
              <table className={drawerOpen ? 'home-table-open' : 'home-table'}>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userTasksAssigned.length > 0 ? (
                    userTasksAssigned.map((element, index) => (
                      element.length > 0 ? (
                        element.map((e, subIndex) => (
                          <tr key={subIndex}>
                            <td>{e.task}</td>
                            <td>{e.statusOfTask}</td>
                            <td>{e.taskDescription}</td>
                            <td>{e.taskStartDate}</td>
                            <td>{e.taskEndDate}</td>
                            <td>
                              <div className="btn-homepage">
                                <button
                                  style={{ border: 'none', backgroundColor: 'transparent' }}
                                  onClick={() => handleUpdateButton(subIndex)}>
                                  <UpgradeIcon fontSize="large" />
                                </button>

                                <button
                                  style={{ border: 'none', backgroundColor: 'transparent' }}
                                  onClick={() => handleViewButton(subIndex)}>
                                  <PreviewIcon fontSize="large" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={index}>
                          <td colSpan="5">No Task has been assigned to you right now</td>
                        </tr>
                      )
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No Task has been assigned to you right now</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
