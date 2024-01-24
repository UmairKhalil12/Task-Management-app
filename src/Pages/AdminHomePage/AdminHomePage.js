import { useState, useEffect } from 'react';
import getUsers from '../User/UserList';
import './AdminHomePage.css';
import SideNav from '../../Components/Navbar/SideNav';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';

function AdminHomePage({ user, admin }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUsers();
            setUsers(userData);
        };

        fetchData();
    }, []);

    const User = users.filter((element) => user.uid === element.id);
    const name = User.map((user) => { return user.name });

    const Users = users.filter((element) => element.email !== 'umairkhalil024@gmail.com');
    console.log('homepage other than admin ', Users);

    let AllStatusArray = [];
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

    users.map((user) => {
        filterUserStatusOfTask(user.id)
    })

    console.log('in-progress', inProgressCount);
    console.log('completed task', completeCount);
    console.log('Notcompleted task', notCompletedCount);

    return (
        <>
            <div className='admin-home-background'>
                <SideNav admin={admin} Users = {Users} />
                <div>
                    <div className='information-container'>
                        <div className='count-card'>
                            <AssignmentIcon className='count-card-icon' />
                            <h2>Total Task(s)</h2>
                            <h3>{inProgressCount + completeCount + notCompletedCount}</h3>
                        </div>

                        <div className='count-card'>
                            <AssignmentLateIcon className='count-card-icon' />
                            <h2>In-Progress Task(s)</h2>
                            <h3>{inProgressCount}</h3>
                        </div>

                        <div className='count-card'>
                            <AssignmentIcon className='count-card-icon' />
                            <h2>Not Completed Task(s)</h2>
                            <h3>{notCompletedCount}</h3>
                        </div>

                        <div className='count-card'>
                            <AssignmentTurnedInIcon className='count-card-icon' />
                            <h2>Completed Task(s)</h2>
                            <h3>{completeCount}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHomePage;
