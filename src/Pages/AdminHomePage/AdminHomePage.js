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

    let AllStatusArray = [];
    const filterUserStatusOfTask = (id) => {
        const userFound = users.filter((element) => element.id === id);
        const tasksAssigned = userFound.map((user) => {
            return user.tasksAssigned || []
        })
        tasksAssigned.map((elements) => {
            elements.map((task) => {
                AllStatusArray.push(task.statusOfTask)
            })

        })

        return AllStatusArray;
    };

    let completeCount = 0;
    let inProgressCount = 0;
    let notCompletedCount = 0;
    
    users.map((user) => {
        let completeArray = [];
        let inProgressArray = [];
        let notCompletedArray = [];
    
        filterUserStatusOfTask(user.id).map((status) => {
            if (status === 'Completed') {
                completeArray.push(status);
            } else if (status === 'In-progress') {
                inProgressArray.push(status);
            } else if (status === 'Not Completed') {
                notCompletedArray.push(status);
            }
        });
    
        completeCount += completeArray.length;
        inProgressCount += inProgressArray.length;
        notCompletedCount += notCompletedArray.length;
    });
    
    console.log('in-progress', inProgressCount);
    console.log('completed task', completeCount);
    console.log('Notcompleted task', notCompletedCount);

    return (
        <div className='admin-home-background'>
            <SideNav admin={admin} />
            <div>
                <h1>Welcome, {name}</h1>
                <div className='information-container'>
                    <div className='count-card'>
                        <AssignmentIcon className='count-card-icon' />
                        <h2>Total Task(s)</h2>
                        <h3>{completeCount + inProgressCount + notCompletedCount}</h3>
                    </div>

                    <div className='count-card'>
                        <AssignmentLateIcon className='count-card-icon' />
                        <h2>In-Progress Task(s)</h2>
                        <h3>{inProgressCount}</h3>
                    </div>

                    <div className='count-card'>
                        <AssignmentTurnedInIcon className='count-card-icon' />
                        <h2>Complete Task(s)</h2>
                        <h3>{completeCount}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage;
