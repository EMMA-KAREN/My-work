import React, { useState } from 'react';

function StudentList() {
  const [students] = useState([
    { id: 1, name: 'Alice', rollNumber: 101 },
    { id: 2, name: 'Bob', rollNumber: 102 },
    { id: 3, name: 'Charlie', rollNumber: 103 },
  ]);

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          <a href={`/student/${student.id}`}>{student.name}</a>
        </li>
      ))}
    </ul>
  );
}

export default StudentList;