import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherStudent = ({ teacher, setTeacher }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    username: "",
    name: "",
    class: "",
    section: "",
    age: "",
    address: "",
    phoneNumber: "",
    schoolId: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/teachers/${
            teacher._id
          }/students`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, [teacher]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/teachers/${
          teacher._id
        }/students`,
        newStudent
      );
      setStudents([...students, response.data]);
      setNewStudent({
        username: "",
        name: "",
        class: "",
        section: "",
        age: "",
        address: "",
        phoneNumber: "",
        schoolId: "",
      });
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} - Class {student.class} {student.section}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newStudent.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={newStudent.class}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={newStudent.section}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newStudent.age}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newStudent.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={newStudent.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="schoolId"
          placeholder="School ID"
          value={newStudent.schoolId}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default TeacherStudent;
