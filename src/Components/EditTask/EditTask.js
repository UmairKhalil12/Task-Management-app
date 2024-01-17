import React, { useState } from 'react'
import { FormLabel } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close"
import "./EditTask.css";
import { doc, getDoc, update, updateDoc } from 'firebase/firestore';
import { db } from '../../FireBase/FireBase';

export default function EditTask({ users, closeEvent, index, id }) {

    const adminEmail = "umairkhalil024@gmail.com";

    // const [select, setSelect] = useState('Choose user to assign task');
    const [task, setTask] = useState('');
    const handleTaskChange = (event) => {
        setTask(event.target.value);
    }

    // const handleChange = (event) => {
    //     setSelect(event.target.value);
    // };


    const EditTaskClick = async () => {
        console.log('select', id);
        console.log('index', index);

        try {
            const userRef = doc(db, 'users', id);
            const taskSnapshot = await getDoc(userRef); // Use 'getDoc' for document snapshot

            if (taskSnapshot.exists()) {
                const updatedTasks = taskSnapshot.data().taskAssigned || [];
                updatedTasks[index] = {
                    task: task,
                    statusOfTask: false,
                };

                await updateDoc(userRef, { taskAssigned: updatedTasks }); // Use 'updateDoc' for updating document

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
                    /> <br /> <br />
                    { /* <FormLabel htmlFor='task' sx={{ color: 'black' }}> Select user</FormLabel>  &nbsp; &nbsp;
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
                        <br /> <br /> */}
                    <Button type='submit' sx={{ color: 'black', border: '1px solid black' }} onClick={EditTaskClick}>Edit Task</Button>
                    <br /> <br />
                </div>
            </div>
        </>
    )
}