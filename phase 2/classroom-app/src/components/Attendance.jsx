import React, { useState } from 'react';

function AttendanceComponent() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', present: false },
    { id: 2, name: 'Bob', present: false },
    { id: 3, name: 'Charlie', present: false },
  ]);

  const handleAttendanceChange = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          <label>
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => handleAttendanceChange(student.id)}
            />
            {student.name}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default AttendanceComponent;