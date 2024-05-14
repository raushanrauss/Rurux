import { useEffect, useState } from "react";

// Define an interface for the structure of each student object
interface Student {
  name: string;
  email: string;
  stream: string;
  subject: string;
}

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]); // Specify Student[] as the type for students
  console.log(students);

  useEffect(() => {
    fetch("https://rurux-1.onrender.com/studentList")
      .then((res) => res.json())
      .then((res) => setStudents(res.students))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Stream</th>
            <th className="px-4 py-2">Subject</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: Student, index: number) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.stream}</td>
              <td className="border px-4 py-2">{student.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
