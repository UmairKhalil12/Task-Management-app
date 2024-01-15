import "./AdminDashboard.css";
import getUsers from '../../User/UserList'
import { useState, useEffect } from 'react';
import SideNav from "../../../Components/Navbar/SideNav";
import DeleteIcon from '@mui/icons-material/Delete';
import { arrayRemove, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../FireBase/FireBase";


function AdminDashboard({ admin, user }) {
  const [users, setUsers] = useState([]);
  console.log(admin)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);

  // const CurrentUserId = user.uid;
  // console.log("currentUserID ", CurrentUserId);


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

    const tasksArray = tasksAssigned.map((elements) => {
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

      // Create a new array excluding the task at taskIndex
      const updatedTasks = currentTasks.filter((task, index) => index !== taskIndex);

      await updateDoc(userRef, { taskAssigned: updatedTasks });

      // Fetch updated data
      const updatedData = await getUsers();
      setUsers(updatedData);

      console.log('Task deleted successfully.');

    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  var adminEmail = "umairkhalil024@gmail.com";

  return (
    <>
      <SideNav admin={admin} />

      <div className="admin-background">
        <h1>Admin dashboard</h1>
        <h3>Hello , {name}</h3>
        <div className='task-container'>
          <div className='user-container'>
            <br />
            <h3>List of Users</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id} className='list'>
                  {user.email !== adminEmail && filterUserTasks(user.id).length > 0 && (
                    <>
                      <b>{user.name}</b>
                      <br />
                      <b><i>Task(s) Assigned</i></b>
                      <br /> <br />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {filterUserTasks(user.id).map((task, index) => (
                          <div key={index}>
                            {task}
                            <span style={{ marginLeft: '8px', color: filterUserStatusOfTask(user.id)[index] ? 'green' : 'red' }}>
                              {filterUserStatusOfTask(user.id)[index] ? 'Completed' : 'Not Completed'}
                            </span>
                            <button onClick={() => handleTaskDelete(user.id, index)} style={{ float: 'right', background: 'none', border: 'none' }}><DeleteIcon /></button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </li>
              ))}

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;