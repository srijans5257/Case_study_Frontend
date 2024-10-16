import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";
import api from "../api";

function WfhTaskAddition() {
    const { noteId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDate = queryParams.get("date");
    const [tasks_completed, setTasks_completed] = useState("");
    const [hours_requested, setHours_requested] = useState("");
    const [task, setTask] = useState(null);
    const navigate = useNavigate();
    const [isTaskLoaded, setIsTaskLoaded] = useState(false);
    useEffect(() => {
        api.get(`/api/taskaddition/${noteId}/${selectedDate}`)
            .then(response => {
                if (response.data.length > 0) {
                    setTask(response.data[0]);
                    setIsTaskLoaded(true); 
                }
            })
            .catch(error => {
                console.error("Error fetching task:", error);
            });
    }, [noteId, selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { tasks_completed, hours_requested, date: selectedDate };

        if (!task) {
            api.post(`/api/taskaddition/${noteId}/${selectedDate}/`, data)
                .then(response => {
                    console.log(response.data);
                    setTask(response.data);
                    setIsTaskLoaded(true); 
                })
                .catch(error => {
                    console.error("Error creating task:", error);
                });
        } else {
            api.put(`/api/tasks/${task.id}/`, data)
                .then(response => {
                    setTask(response.data);
                })
                .catch(error => {
                    console.error("Error updating task:", error);
                });
        }
    };
    const handleDelete = () => {
        api.delete(`/api/tasks/${task.id}/`)
            .then(() => {
                setTask(null);
                setIsTaskLoaded(false);
            })
            .catch(error => {
                console.error("Error deleting task:", error);
            });
    };
    const redirecthome=()=>{
        navigate("/")
    }
    return (
        <Box bg="linear-gradient(to bottom right, #1d253c, #12182a)" h="100vh">
            <Box display="flex" justifyContent="center">
                <Heading color="white">Task for {selectedDate}</Heading>
            </Box>
            {!isTaskLoaded?(<Box ><form onSubmit={handleSubmit}>
                <div>
                    <label>Tasks Completed</label>
                    <input
                        type="text"
                        value={tasks_completed}
                        onChange={(e) => setTasks_completed(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hours Requested</label>
                    <input
                        type="text"
                        value={hours_requested}
                        onChange={(e) => setHours_requested(e.target.value)}
                        required
                    />
                </div>
                <Box display="flex" justifyContent="Center">
                    <Button type="submit">Submit</Button>
                </Box>
            </form>
            <br/>
            <Box display="flex" justifyContent="center">
                <Button onClick={redirecthome}>Back to Home Page</Button>
            </Box>
            </Box>
            ):(
                <>
                    <div>
                        <Heading color="white">Task for Note {noteId}</Heading>
                        <p>Tasks Completed: {task.tasks_completed}</p>
                        <p>Hours Requested: {task.hours_requested}</p>
                        <p>Date: {task.date}</p>
                        <p>Status: {task.status}</p>
                        {task.status==='pending'&& <Button onClick={handleDelete}>Delete Task</Button>}
                    </div>
                    <br/>
                    <Button onClick={redirecthome}>Back to Home Page</Button>
                </>
            )}
        </Box>
    );
}

export default WfhTaskAddition;
