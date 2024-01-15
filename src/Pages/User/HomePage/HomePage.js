import "./styles.css";
import { useState, useEffect } from 'react';
import { db } from "../../../FireBase/FireBase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import getUsers from "../UserList";
import SideNav from '../../../Components/Navbar/SideNav'

function HomePage({ currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };

    fetchData();
  }, []);



  const User = users.filter(element => currentUser.uid === element.id);
  console.log('homepage filter user', User);

  const userTasksAssigned = User.map((user) => user.taskAssigned || User[0]?.taskAssigned || [])
  console.log('homepage usertaskarray', userTasksAssigned);

  const userId = User.map((user) => user.id);
  const name = User.map((user) => user.name);
  console.log('name', name)

  const toggleComplete = async (taskIndex) => {
    try {
      const userRef = doc(db, 'users', userId[0]);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error('User document not found.');
        return;
      }

      const updatedTasks = userDoc.data().taskAssigned.map((task, index) => {
        if (index === taskIndex) {
          return { ...task, statusOfTask: !task.statusOfTask };
        }
        return task;
      });

      await updateDoc(userRef, { taskAssigned: updatedTasks });
      // console.log('Tasks updated successfully.');

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <>
      <SideNav />
      <div className="Page-css">
        <h1>Home Page</h1>
        <h2>Hi, {name}</h2>
        <div className='asign-contanier'>
          <div className="task-list">
            <h1>Task Assigned</h1>
            <div className="list-container">
              <ul>
                {userTasksAssigned.length > 0 ? (
                  userTasksAssigned.map((element, index) => (
                    <div className="list-completed">
                      <li key={index} >
                        {element.length > 0 ? (
                          element.map((e, subIndex) => (
                            <div className="list-elements" key={subIndex}>
                              <input
                                type='checkbox'
                                className='inpt-chk'
                                checked={e.statusOfTask ? `checked` : ``}
                                onChange={() => toggleComplete(subIndex)}
                              />
                              <span className="lst-para">{e.task}</span>
                            </div>

                          ))
                        ) : (
                          <p>No Task has been assigned to you right now</p>
                        )}
                      </li>
                    </div>
                  ))
                ) : (
                  <p>No Task has been assigned to you right now</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default HomePage;