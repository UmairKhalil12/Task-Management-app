import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { FormLabel, MenuItem } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import "./UpdateTask.css"
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../FireBase/FireBase';

function UpdateTask({ user, index }) {
    console.log(user);
    const [StartTime, setStartTime] = useState('');
    const [EndTime, setEndTime] = useState('');
    const [UpdateTaskDescription, setUpdateTaskDescription] = useState('');
    const [LocationSelect, setLocationSelect] = useState('');
    const [Status, setStatus] = useState('');

    const handleUpdateTaskDescription = (event) => {
        setUpdateTaskDescription(event.target.value)
    }

    const handleStartTime = (event) => {
        setStartTime(event.target.value);
    }

    const handleEndTime = (event) => {
        setEndTime(event.target.value);
    }

    const handleChange = (event) => {
        setLocationSelect(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const currentDate = new Date();
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), StartTime.split(':')[0], StartTime.split(':')[1]);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), EndTime.split(':')[0], EndTime.split(':')[1]);
    const timeDifferenceInMilliseconds = end - start;
    const hoursDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60);
    const hours = Math.floor(hoursDifference);
    const minutes = Math.round((hoursDifference % 1) * 60);

    const AssignTaskClick = async (event) => {
        event.preventDefault();
        console.log(user.uid);

        const userDocRef = doc(db, 'users', user.uid);

        try {
            const userSnapshot = await getDoc(userDocRef);
            const currentTasks = userSnapshot.data().taskAssigned || [];

            const newTask = {
                statusOfTask: Status,
                taskUpdateStartTime: StartTime,
                taskUpdateEndTime: EndTime,
                taskUpdateDescription: UpdateTaskDescription
            };

            const updatedTasks = [...currentTasks, newTask];

            await setDoc(userDocRef, { taskAssigned: updatedTasks }, { merge: true });

            window.alert('Task assigned successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            window.alert('Error assigning task. Please check the console for details.');
        }
    };

    return (
        <div>
            <div className='update-task-container'>
                <div className='update-task-container-2'>
                    <h3>Updating Task</h3>
                    <FormLabel htmlFor='task' sx={{ color: 'black', width: '200px' }}>Task Description</FormLabel> <br />
                    <TextareaAutosize
                        id="filled-multiline-flexible"
                        value={UpdateTaskDescription}
                        onChange={handleUpdateTaskDescription}
                        minRows={4}
                        style={{ width: '100%', backgroundColor: 'transparent' }}
                    />

                    <br /> <br />

                    <div className='date-container-main'>
                        <div className='container-2'>
                            <FormLabel htmlFor='startTime' sx={{ color: 'black' }}>Start Time</FormLabel> <br />
                            <TextField
                                id="standard-basic"
                                value={StartTime}
                                variant="outlined"
                                size='small'
                                onChange={handleStartTime}
                                type='time'
                                fullWidth
                            />
                        </div>

                        &nbsp; &nbsp;

                        <div className='container-2'>
                            <FormLabel htmlFor='endTime' sx={{ color: 'black' }}>End Time</FormLabel> <br />
                            <TextField
                                id="standard-basic"
                                value={EndTime}
                                variant="outlined"
                                size='small'
                                onChange={handleEndTime}
                                type='time'
                                fullWidth
                            />
                        </div>
                    </div>

                    <br /> <br />

                    <div className='date-container-main'>
                        <div className='container-2'>
                            <FormLabel htmlFor='endDate' sx={{ color: 'black' }}>hours</FormLabel> <br />
                            <TextField
                                id="standard-basic"
                                variant="outlined"
                                size='small'
                                value={`${hours} hour(s) and ${minutes} minute(s)`}
                                type='string'
                                fullWidth
                                disabled
                            />

                        </div>
                        &nbsp; &nbsp;
                        <div className='container-2'>
                            <FormLabel htmlFor='location' sx={{ color: 'black' }}> Select Location</FormLabel> <br />
                            <Select
                                labelId="demo-simple-select-label"
                                size='small'
                                id="demo-simple-select"
                                value={LocationSelect}
                                label={LocationSelect}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Home">Home</MenuItem>
                                <MenuItem value="Office">Office</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <br /> <br />

                    <FormLabel htmlFor='taskStatus' sx={{ color: 'black' }}> Select Status of task</FormLabel> <br />
                    <Select
                        labelId="demo-simple-select-label"
                        size='small'
                        id="demo-simple-select"
                        value={Status}
                        label={Status}
                        onChange={handleStatusChange}
                        fullWidth
                    >
                        <MenuItem value="In-Progress">In-Progress</MenuItem>
                        <MenuItem value="Not Completed">Not Completed</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                    <br /> <br />
                    <Button type='submit' sx={{ border: '1px solid #3576D2' }} onClick={AssignTaskClick} >Update Task</Button>
                    <br /> <br />
                </div>
            </div>




        </div >
    )
}

export default UpdateTask
