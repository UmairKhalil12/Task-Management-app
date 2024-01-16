import React, { useState } from 'react'
import { FormLabel} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../FireBase/FireBase';
import { doc } from 'firebase/firestore';
import { useEffect } from "react";
import getUsers from '../../User/UserList'
import SideNav from '../../../Components/Navbar/SideNav';
import "./GiveTask.css"

function GiveTask({admin}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUsers();
            setUsers(userData);
        };

        fetchData();
    }, []);

    const adminEmail = "umairkhalil024@gmail.com";

    const [select, setSelect] = useState('Choose user to assign task');
    const [task, setTask] = useState('');
    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    const AssignTaskClick = async (event) => {
        event.preventDefault();
        console.log(select);

        const userDocRef = doc(db, 'users', select);

        try {
            const userSnapshot = await getDoc(userDocRef);
            const currentTasks = userSnapshot.data().taskAssigned || [];

            const newTask = { task: task, statusOfTask: false };

            const updatedTasks = currentTasks.filter(taskObj => taskObj.task !== newTask.task);

            updatedTasks.push(newTask);

            await updateDoc(userDocRef, {
                taskAssigned: updatedTasks
            });

            window.alert('Task assigned successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            window.alert('Error assigning task. Please check the console for details.');
        }

    };


    return (
        <>
        <SideNav admin={admin} />
            <div className='give-task-container'>
                <div className='give-task-container-2'>
                    <h3>Assigning Task</h3>
                    <br/> <br/>
                    <FormLabel htmlFor='task' sx={{color : 'black'}}>Enter Task</FormLabel> <br />
                    <TextField
                        id="standard-basic"
                        value={task}
                        label={task}
                        variant="outlined"
                        size='small'
                        onChange={handleTaskChange}
                        type='string'
                    /> <br/> <br/>
                    <FormLabel htmlFor='task' sx={{color : 'black'}}> Select user</FormLabel>  &nbsp; &nbsp; 
                    <Select
                        labelId="demo-simple-select-label"
                        size='small'
                        id="demo-simple-select"
                        value={select}
                        label={select}
                        onChange={handleChange}
                    >
                        {users.length > 0 ? (
                            users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.email === adminEmail ? null : user.email}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>No user found</MenuItem>
                        )}
                    </Select>
                    <br/> <br/> 
                    <Button type='submit' sx={{ color: 'black', border: '1px solid black' }} onClick={AssignTaskClick}>Assign Task</Button>
                    <br/> <br/> 
                </div>
            </div>
        </>
    )
}

export default GiveTask
