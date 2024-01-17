import "./AdminDashboard.css";
import getUsers from '../../User/UserList'
import { useState, useEffect } from 'react';
import SideNav from "../../../Components/Navbar/SideNav";
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../FireBase/FireBase";
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import GiveTask from "../GiveTask/GiveTask";
import EditTask from "../../../Components/EditTask/EditTask";


function AdminDashboard({ admin, user }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'lightblue',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [taskIndex, setTaskIndex] = useState('');
  const [userId, setUserId] = useState('');

  // console.log(admin)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  const User = users.filter((element) => user.uid === element.id);
  const name = User.map((user) => { return user.name });

  const filterUserTasks = (id) => {
    let AllTaskArray = [];
    const userFound = users.filter((element) => element.id === id);

    const tasksAssigned = userFound.map((user) => {
      return user.taskAssigned || []
    })

    tasksAssigned.map((elements) => {
      elements.map((task) => {
        AllTaskArray.push(task.task)
      })
    })
    return AllTaskArray;
  };

  const filterUserStatusOfTask = (id) => {
    let AllStatusArray = [];
    const userFound = users.filter((element) => element.id === id);
    const tasksAssigned = userFound.map((user) => {
      return user.taskAssigned || []
    })
    tasksAssigned.map((elements) => {
      elements.map((task) => {
        AllStatusArray.push(task.statusOfTask)
      })
    })
    return AllStatusArray;
  };

  const handleTaskDelete = async (userId, taskIndex) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        console.error('User document not found.');
        return;
      }
      const currentTasks = userDoc.data().taskAssigned || [];
      const updatedTasks = currentTasks.filter((task, index) => index !== taskIndex);
      await updateDoc(userRef, { taskAssigned: updatedTasks });
      const updatedData = await getUsers();
      setUsers(updatedData);
      console.log('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleModal = (index , id) => {
    setTaskIndex(index);
    setUserId(id);  
    setOpen(true);
  };

  var adminEmail = "umairkhalil024@gmail.com";

  return (
    <>
      <SideNav admin={admin} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditTask users={users} closeEvent = {handleClose} index = {taskIndex} id = {userId} /> 
        </Box>
      </Modal>

      <div className="admin-background">
        <h1>Admin dashboard</h1>
        <h3>Hello, {name}</h3>
        <div className='task-container'>
          <div className='user-container'>
            <br />
            <h3>List of Users</h3>
            <table className="taskTabel">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Assigned Task(s)</th>
                  <th>Status of Task</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='list'>
                    {user.email !== adminEmail && filterUserTasks(user.id).length > 0 && (
                      <>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td style={{ display: 'flex', flexDirection: 'column' }}>
                          {filterUserTasks(user.id).map((task, index) => (
                            <div key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: '8px' }}>{task}</span>
                              <br /> <br />

                            </div>
                          ))}
                        </td>
                        <td>
                          {filterUserStatusOfTask(user.id).map((status, index) => (
                            <div key={index} style={{ color: status ? 'green' : 'red' }}>
                              {status ? 'Completed' : 'Not Completed'}
                              <br /> <br />
                            </div>
                          ))}
                        </td>
                        <td>
                          {filterUserStatusOfTask(user.id).map((status, index) => (
                            <div>
                              <button onClick={() => handleTaskDelete(user.id, index)} style={{ background: 'none', border: 'none' }}><DeleteIcon /></button>
                              &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;
                              <button onClick={() => handleModal(index , user.id)} style={{ background: 'none', border: 'none' }}  ><EditIcon /> </button>  &nbsp; &nbsp;  &nbsp; &nbsp;
                              <br /> <br />
                            </div>
                          ))}

                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}


export default AdminDashboard;