
import StudentList from '../components/StudentList';
import Attendance from '../components/Attendance';
import Assignment from '../components/Assignment';
import Grades from '../components/Grades';

function Main() {
  return (
    <div>
      <h1>Classroom App</h1>
      <StudentList />
      <Attendance />
      <Assignment />
      <Grades />
    </div>
  );
}

export default Main;