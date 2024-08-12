import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ id: null, title: '', description: '', status: 'To Do', userId: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setCurrentUserId(userData.id);
      setNewTask((prevTask) => ({ ...prevTask, userId: userData.id }));
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/task', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      toast.error('Error fetching tasks');
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (isEditing) {
        // Update existing task
        await axios.put(`http://localhost:4000/task/${newTask.id}`, newTask, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Task updated successfully');
        setIsEditing(false);
      } else {
        // Create new task
        await axios.post('http://localhost:4000/task', newTask, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Task added successfully');
      }
      setNewTask({ title: '', description: '', status: 'To Do', userId: newTask.userId });
      fetchTasks();
    } catch (error) {
      toast.error('Error saving task');
    }
  };

  const handleEdit = (task) => {
    if (task.userId === currentUserId) {
      setNewTask(task);
      setIsEditing(true);
    } else {
      toast.error('You are not authorized to edit this task');
    }
  };

  const handleCancelEdit = () => {
    setNewTask({ title: '', description: '', status: 'To Do', userId: newTask.userId });
    setIsEditing(false);
  };

  const handleDelete = async (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully');
  };
  

  return (
    <Container>
      <h2 className="my-4">Task Manager</h2>
      <Row>
        <Col md={6}>
          <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Task' : 'Add Task'}
            </Button>
            {isEditing && (
              <Button variant="secondary" className="ms-2" onClick={handleCancelEdit}>
                Cancel
              </Button>
            )}
          </Form>
        </Col>
        <Col md={6}>
          <h3>Task List</h3>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item key={task.id}>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <small>Status: {task.status}</small>
                <small className="d-block mt-2">User ID: {task.userId}</small>
                {task.userId === currentUserId && (
                  <>
                    <Button variant="warning" className="ms-2" onClick={() => handleEdit(task)}>
                      Edit
                    </Button>
                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(task.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default TaskManager;
