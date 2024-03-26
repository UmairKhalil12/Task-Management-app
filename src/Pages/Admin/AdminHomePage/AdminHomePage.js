import { useState, useEffect } from 'react';
import getUsers from '../../User/UserList';
import './AdminHomePage.css'
import SideNav from '../../../Components/Navbar/SideNav'
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

    let completeArray = [];
    let inCompleteArray = [];

    users.forEach((user, userIndex) => {
        filterUserStatusOfTask(user.id).forEach((status, index) => {
            if (status === false) {
                inCompleteArray.push(status)
            }
            else {
                completeArray.push(status)
            }
        })
    })

    console.log('inCompleteArray', inCompleteArray);
    console.log('CompleteArray', completeArray);



    return (
        <div className='admin-home-background'>
            <SideNav admin={admin} />
            <div>
                <h1>Welcome , {name}</h1>
                <div className='information-container'>

                    <div className='count-total-task'>
                        <h2>Total Task(s)</h2>
                        <AssignmentIcon fontSize='large' />
                        <h3>{inCompleteArray.length + completeArray.length}</h3>

                    </div>

                    <div className='count-incomplete-task'>
                        <h2>In-Complete task(s)</h2>
                        <AssignmentLateIcon fontSize='large' />
                        <h3>{inCompleteArray.length}</h3>
                    </div>

                    <div className='count-completed-task'>
                        <h2>Complete task(s)</h2>
                        <AssignmentTurnedInIcon fontSize='large' />
                        <h3>{completeArray.length}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage
