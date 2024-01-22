
export default function ViewTask({ users, currentUser }) {
    console.log('viewtask',currentUser);
    const User = users.filter(element => currentUser.uid === element.id);
    const userTasksAssigned = User.map((user) => user.tasksAssigned || User[0]?.tasksAssigned || [])
    return (
        <div className="ViewTask">
            <div className="task-list">
                <div>
                    <h1>Updated Task View</h1>
                    <div className="list-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Total Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTasksAssigned.length > 0 ? (
                                    userTasksAssigned.map((element, index) => (
                                        element.length > 0 ? (
                                            element.map((e, subIndex) => (
                                                <tr key={subIndex}>
                                                    <td>{e.task}</td>
                                                    <td>{e.statusOfTask}</td>
                                                    <td>{e.taskUpdateDescription}</td>
                                                    <td>{e.taskUpdateLocation}</td>
                                                    <td>{e.taskUpdateDate}</td>
                                                    <td>{e.taskUpdateStartTime}</td>
                                                    <td>{e.taskUpdateEndTime}</td>
                                                    <td>{e.taskUpdateHours}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr key={index}>
                                                <td colSpan="5">No Task has been assigned to you right now</td>
                                            </tr>
                                        )
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No Task has been assigned to you right now</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}