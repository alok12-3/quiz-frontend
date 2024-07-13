import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClassDetails from "./StudentClass";

const StudentDashboard = () => {
  const { username } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/student/${username}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
        setError(
          error.response
            ? error.response.data.message
            : "Failed to fetch student"
        );
      }
    };
    fetchStudent();
  }, [username]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {student.name}</h1>
      <p>Username: {student.username}</p>
      <p>Class: {student.class}</p>
      <p>Section: {student.section}</p>
      <p>Age: {student.age}</p>
      <p>Address: {student.address}</p>
      <p>Phone Number: {student.phoneNumber}</p>
      <p>School ID: {student.schoolId}</p>
      {/* Add more fields as necessary */}
      <ClassDetails student={student} />
    </div>
  );
};

export default StudentDashboard;
