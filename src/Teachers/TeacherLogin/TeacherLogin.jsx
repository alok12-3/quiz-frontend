import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLogin = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([""]);
  const [classSections, setClassSections] = useState([
    { class: "", section: "" },
  ]);
  const [schoolId, setSchoolId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubjectsChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const handleClassSectionChange = (index, field, value) => {
    const updatedClassSections = [...classSections];
    updatedClassSections[index][field] = value;
    setClassSections(updatedClassSections);
  };

  const addClassSection = () => {
    setClassSections([...classSections, { class: "", section: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/teachers`,
        {
          username,
          name,
          subjects,
          class: classSections.map((section) => section.class),
          section: classSections.map((section) => section.section),
          schoolId,
        }
      );
      navigate(`/teacher/${response.data.username}`);
    } catch (error) {
      console.error("Error creating teacher", error);
      setError(
        error.response ? error.response.data.message : "Error creating teacher"
      );
    }
  };

  return (
    <div>
      <h2>Create Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subjects:</label>
          {subjects.map((subject, index) => (
            <input
              key={index}
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => handleSubjectsChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addSubject}>
            Add Subject
          </button>
        </div>
        <div>
          <label>Class Sections:</label>
          {classSections.map((section, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Class"
                value={section.class}
                onChange={(e) =>
                  handleClassSectionChange(index, "class", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Section"
                value={section.section}
                onChange={(e) =>
                  handleClassSectionChange(index, "section", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={addClassSection}>
            Add Class Section
          </button>
        </div>
        <div>
          <label>School ID:</label>
          <input
            type="text"
            placeholder="School ID"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Create Teacher</button>
      </form>
    </div>
  );
};

export default TeacherLogin;
