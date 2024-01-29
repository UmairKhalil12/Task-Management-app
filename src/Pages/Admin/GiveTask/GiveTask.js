import React, { useState } from 'react'
import { FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../FireBase/FireBase';
import { doc } from 'firebase/firestore';
import { useEffect } from "react";
import getUsers from '../../User/UserList'
import SideNav from '../../../Components/Navbar/SideNav';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import "./GiveTask.css"

function GiveTask({ admin }) {
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
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [TaskDescription, SetTaskDescription] = useState('');

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }

    const handleTaskDescription = (event) => {
        SetTaskDescription(event.target.value);
    }

    const AssignTaskClick = async (event) => {
        event.preventDefault();
        console.log(select);

        const userDocRef = doc(db, 'users', select);

        try {
            const userSnapshot = await getDoc(userDocRef);
        
            const newTask = {
                task: task,
                statusOfTask: 'In-progress',
                taskStartDate: StartDate,
                taskEndDate: EndDate,
                taskDescription: TaskDescription
            };
             
            await updateDoc(userDocRef, {
                tasksAssigned: arrayUnion(newTask)
            });

            window.alert('Task assigned successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            window.alert('Error assigning task. Please check the console for details.');
        }

    };

    const startDateObj = new Date(StartDate);
    const endDateObj = new Date(EndDate);


    return (
        <>
            <SideNav admin={admin} />
            <div className='give-task-container'>
                <div className='give-task-container-2'>
                    <h3>Assigning Task</h3>

                    <FormLabel htmlFor='task' sx={{ color: 'black', width: '200px' }}>Enter Task</FormLabel> <br />
                    <TextField
                        id="standard-basic"
                        value={task}
                        variant="outlined"
                        size='small'
                        onChange={handleTaskChange}
                        type='string'
                        fullWidth
                    />
                    <br /> <br />

                    <FormLabel htmlFor='task' sx={{ color: 'black', width: '200px' }}>Task Description</FormLabel> <br />
                    <TextareaAutosize
                        id="filled-multiline-flexible"
                        value={TaskDescription}
                        onChange={handleTaskDescription}
                        minRows={4}
                        style={{ width: '100%', backgroundColor: 'transparent' }}
                    />

                    <br /> <br />

                    <div className='date-container-main'>

                        <div className='date-container'>
                            <FormLabel htmlFor='startTask' sx={{ color: 'black' }}>Start Date</FormLabel> <br />
                            <TextField
                                id="standard-basic"
                                value={StartDate}
                                variant="outlined"
                                size='small'
                                onChange={handleStartDateChange}
                                type='date'
                                fullWidth
                            />
                        </div>

                        &nbsp; &nbsp;

                        <div className='date-container'>
                            <FormLabel htmlFor='endDate' sx={{ color: 'black' }}>End Date</FormLabel> <br />
                            <TextField
                                id="standard-basic"
                                value={EndDate}
                                variant="outlined"
                                size='small'
                                onChange={handleEndDateChange}
                                type='date'
                                fullWidth
                            />
                        </div>

                        &nbsp; &nbsp;

                        <div className='date-container'>
                            <FormLabel htmlFor='endDate' sx={{ color: 'black' }}>days</FormLabel> <br />
                            <TextField
                                id="standard-basic"
                                variant="outlined"
                                size='small'
                                value={Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)).toString()}
                                type='string'
                                fullWidth
                                disabled
                            />
                        </div>

                    </div>

                    <br /> <br />

                    <FormLabel htmlFor='task' sx={{ color: 'black' }}> Select user</FormLabel>  &nbsp; &nbsp;
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
                                    {user.email}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem>No user found</MenuItem>
                        )}
                    </Select>

                    <br /> <br />
                    <Button type='submit' sx={{ border: '1px solid #3576D2' }} onClick={AssignTaskClick}>Assign Task</Button>
                    <br /> <br />
                </div>
            </div>
        </>
    )
}

export default GiveTask
