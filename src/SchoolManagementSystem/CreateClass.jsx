import React, { useState } from "react";
import axios from "axios";

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [quizId, setQuizId] = useState([]);
  const [studentsId, setStudents] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/schools`,
        {
          className,
          year,
          grade,
          section,
          schoolId,
          quizId,
          studentsId,
        }
      );
      console.log("Class created:", response.data);
      setIsCreated(true);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <input
          type="text"
          placeholder="School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button type="submit">Create Class</button>
      </form>

      {isCreated && <p>Class created successfully!</p>}
    </div>
  );
};

export default CreateClass;
