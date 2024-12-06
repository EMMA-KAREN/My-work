import React, { useState } from 'react';

function GradesComponent() {
  const [grades, setGrades] = useState([
    { student: 'Alice', assignment1: 85, assignment2: 92 },
    { student: 'Bob', assignment1: 78, assignment2: 88 },
    { student: 'Charlie', assignment1: 95, assignment2: 90 },
  ]);

  return (
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Assignment 1</th>
          <th>Assignment 2</th>
          {/* ... more assignments as needed */}
          <th>Average</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((grade, index) => (
          <tr key={index}>
            <td>{grade.student}</td>
            <td>{grade.assignment1}</td>
            <td>{grade.assignment2}</td>
            {/* ... more grades as needed */}
            <td>{(grade.assignment1 + grade.assignment2) / 2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GradesComponent;