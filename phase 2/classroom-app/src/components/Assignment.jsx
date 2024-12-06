import React, { useState } from 'react';

function AssignmentComponent() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (event) => {
    setNewAssignment({ ...newAssignment, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAssignments([...assignments, newAssignment]);
    setNewAssignment({ title: '', description: '', dueDate: '' });
  };

  return (
    <div>
      <h2>Assignments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newAssignment.title}
          onChange={handleChange}
        />
        {/* ... other input fields for description and due date */}
        <button type="submit">Add Assignment</button>
      </form>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>Due Date: {assignment.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentComponent;