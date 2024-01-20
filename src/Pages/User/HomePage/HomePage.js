import "./styles.css";
import { useState, useEffect } from 'react';
import { db } from "../../../FireBase/FireBase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import getUsers from "../UserList";
import SideNav from '../../../Components/Navbar/SideNav'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import UpdateTask from "../../../Components/UpdateTask/UpdateTask";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HomePage({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [Updateindex, setUpdateindex] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  const User = users.filter(element => currentUser.uid === element.id);
  // console.log('homepage filter user', User);

  const userTasksAssigned = User.map((user) => user.taskAssigned || User[0]?.taskAssigned || [])
  // console.log('homepage usertaskarray', userTasksAssigned);

  const userId = User.map((user) => user.id);
  const name = User.map((user) => user.name);
  // console.log('name', name)

  const handleUpdateButton = (index) => {
    handleOpen();
    setUpdateindex(index);
  }

  // const toggleComplete = async (taskIndex) => {
  //   try {
  //     const userRef = doc(db, 'users', userId[0]);
  //     const userDoc = await getDoc(userRef);

  //     if (!userDoc.exists()) {
  //       console.error('User document not found.');
  //       return;
  //     }

  //     const updatedTasks = userDoc.data().taskAssigned.map((task, index) => {
  //       if (index === taskIndex) {
  //         return { ...task, statusOfTask: !task.statusOfTask };
  //       }
  //       return task;
  //     });

  //     await updateDoc(userRef, { taskAssigned: updatedTasks });
  //     // console.log('Tasks updated successfully.');

  //   } catch (error) {
  //     console.error('Error updating task status:', error);
  //   }
  // };

  return (
    <>
      <SideNav />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateTask user={currentUser} index= {Updateindex} />
        </Box>
      </Modal>

      <div className="Page-css">

        <h1>Home Page</h1>
        <h2>Welcome, {name}</h2>
        <div className="task-list">
          <div>
            <h1>Task Assigned</h1>
            <div className="list-container">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Update </th>
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
                            <td> <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => handleUpdateButton(index)}> <UpgradeIcon fontSize="large" /> </button></td>
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
