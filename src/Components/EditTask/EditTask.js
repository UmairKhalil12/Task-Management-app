import React, { useState } from 'react'
import { FormLabel, TextareaAutosize } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close"
import "./EditTask.css";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../FireBase/FireBase';

export default function EditTask({ users, closeEvent, index, id }) {

    const adminEmail = "umairkhalil024@gmail.com";

    const [task, setTask] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [TaskDescription, SetTaskDescription] = useState('');

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }

    const handleTaskDescription = (event) => {
        SetTaskDescription(event.target.value);
    }

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    const EditTaskClick = async () => {
        console.log('select', id);
        console.log('index', index);

        try {
            const userRef = doc(db, 'users', id);
            const taskSnapshot = await getDoc(userRef);

            if (taskSnapshot.exists()) {
                const existingData = taskSnapshot.data();
                const updatedTasks = existingData.tasksAssigned || [];

                // Update only the task at the specified index
                updatedTasks[index] = {
                    ...updatedTasks[index],
                    task: task,
                    taskStartDate: StartDate,
                    taskEndDate: EndDate,
                    taskDescription: TaskDescription
                };

                await updateDoc(userRef, {
                    tasksAssigned: updatedTasks,
                });

                console.log('Task edited successfully.');
                window.alert('Task edited successfully');
            } else {
                console.error('Selected user not found.');
                window.alert('Selected user not found');
            }
        } catch (error) {
            console.error('Error while editing task:', error);
            window.alert('Error while editing task');
        }

        closeEvent();
    };

    const startDateObj = new Date(StartDate);
    const endDateObj = new Date(EndDate);

    return (
        <>
            <div className='give-Edittask-container'>
                <div className='give-Edittask-container-2'>
                    <IconButton style={{ position: 'absolute', right: '0', top: '0' }}
                        onClick={closeEvent}
                    >
                        <CloseIcon />
                    </IconButton>
                    <h3>Assigning Task</h3>
                    <br /> <br />
                    <FormLabel htmlFor='task' sx={{ color: 'black' }}>Enter Task</FormLabel> <br />
                    <TextField
                        id="standard-basic"
                        value={task}
                        label={task}
                        variant="outlined"
                        size='small'
                        onChange={handleTaskChange}
                        type='string'
                        fullWidth
                    /> <br /> <br />

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
                    <Button type='submit' sx={{ color: 'black', border: '1px solid black' }} onClick={EditTaskClick}>Edit Task</Button>
                    <br /> <br />
                </div>
            </div>
        </>
    )
}