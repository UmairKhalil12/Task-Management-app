import AdminHomePage from "../../AdminHomePage/AdminHomePage";
import { useState, useEffect } from "react";
import getUsers from "../UserList";
import "./Dashboard.css"

export default function Dashboard({ user, admin }) {
    console.log(user, 'dashboard');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUsers();
            setUsers(userData);
        };

        fetchData();
    }, []);

    let completeCount = 0;
    let inProgressCount = 0;
    let notCompletedCount = 0;

    const filterUserStatusOfTask = (id) => {
        const userFound = users.filter((element) => element.id === id);
        const tasksAssigned = userFound.map((user) => {
            return user.tasksAssigned || []
        })
        tasksAssigned.map((elements) => {
            elements.map((task) => {
                if (task.statusOfTask === 'Completed') {
                    completeCount += 1
                } else if (task.statusOfTask === 'In-progress') {
                    inProgressCount += 1
                } else if (task.statusOfTask === 'Not Completed') {
                    notCompletedCount += 1
                }
                else {
                    return
                }
            })
        })
    };

    filterUserStatusOfTask(user.uid)

    return (

        <>
            <AdminHomePage user={user} admin={admin} />
            <br/> <br/> 
            <div className="dashboard-background ">
                <div className="dashboard">
                    <div className='count-card'>
                        <h2>Task to do(s)</h2>
                        <h3>{inProgressCount + completeCount + notCompletedCount}</h3>
                    </div>

                    &nbsp; &nbsp; 

                    <div className='count-card'>
                        <h2>Remaining Task(s)</h2>
                        <h3>{inProgressCount + completeCount + notCompletedCount - completeCount}</h3>
                    </div>
                </div>
            </div>
        </>

    )
}