import { useState, useEffect } from 'react';
import getUsers from '../User/UserList';
import './Dashboard.css';
import SideNav from '../../Components/Navbar/SideNav';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useAppStore } from '../../appStore';

function Dashboard({ user, admin }) {

    const drawerOpen = useAppStore(state => state.drawerOpen);

    const [users, setUsers] = useState([]);

    console.log(admin, 'admin adminhomepage');
    console.log(user, 'admin adminhomepage');

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

    let completeCountSpecific = 0;
    let inProgressCountSpecific = 0;
    let notCompletedCountSpecific = 0;

    const filterUserStatusOfTask2 = (id) => {
        const userFound = users.filter((element) => element.id === id);
        const tasksAssigned = userFound.map((user) => {
            return user.tasksAssigned || []
        })
        tasksAssigned.map((elements) => {
            elements.map((task) => {
                if (task.statusOfTask === 'Completed') {
                    completeCountSpecific += 1
                } else if (task.statusOfTask === 'In-progress') {
                    inProgressCountSpecific += 1
                } else if (task.statusOfTask === 'Not Completed') {
                    notCompletedCountSpecific += 1
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

    filterUserStatusOfTask2(user.uid);

    console.log('in-progress count specific', inProgressCountSpecific);
    console.log('completed task count Specific', completeCountSpecific);
    console.log('NotcompletedCountSpecific task', notCompletedCountSpecific);

    return (
        <>
            <div className={drawerOpen ? 'admin-home-background-open' : 'admin-home-background'}>
                <SideNav admin={admin} Users={Users} />
                <div>
                    <h1>Dashboard</h1>
                    <div className='information-container'>
                        <div className={drawerOpen ? 'count-card-open' : 'count-card'}>
                            <AssignmentIcon className='count-card-icon' />
                            <h2>Total Task(s)</h2>
                            <h3>{inProgressCount + completeCount + notCompletedCount}</h3>
                        </div>

                        <div className={drawerOpen ? 'count-card-open' : 'count-card'}>
                            <AssignmentLateIcon className='count-card-icon' />
                            <h2>In-Progress Task(s)</h2>
                            <h3>{inProgressCount}</h3>
                        </div>

                        <div className={drawerOpen ? 'count-card-open' : 'count-card'}>
                            <AssignmentTurnedInIcon className='count-card-icon' />
                            <h2>Completed Task(s)</h2>
                            <h3>{completeCount}</h3>
                        </div>

                        <div>
                            <div className={drawerOpen ? 'count-card-2-open' : 'count-card-2'}>
                                <h3>Your task(s) to do</h3>
                                <h4><b>{inProgressCountSpecific + notCompletedCountSpecific}</b></h4>
                            </div>

                            <br />

                            <div className={drawerOpen ? 'count-card-2-open' : 'count-card-2'}>
                                <h3>Not Completed Task</h3>
                                <h4><b>{notCompletedCountSpecific}</b></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
