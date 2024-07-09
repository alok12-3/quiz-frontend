import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignQuizToClassList = ({ teacher, classIds }) => {
  const [classes, setClasses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL); // Log backend URL for verification

    const fetchClasses = async () => {
      setLoadingClasses(true);
      setError("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/classes/by-ids`,
          { classIds }
        );
        setClasses(response.data);
      } catch (err) {
        setError(`Error fetching classes: ${err.message}`);
      } finally {
        setLoadingClasses(false);
      }
    };

    const fetchQuizzes = async () => {
      setLoadingQuizzes(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes`
        );
        setQuizzes(response.data);
      } catch (err) {
        setError(`Error fetching quizzes: ${err.message}`);
      } finally {
        setLoadingQuizzes(false);
      }
    };

    fetchClasses();
    fetchQuizzes();
  }, [teacher, classIds]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleQuizChange = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const handleAssign = async () => {
    console.log("Selected Class ID:", selectedClass);
    console.log("Selected Quiz ID:", selectedQuiz);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/classes/${selectedClass}/add-quiz`,
        { quizId: selectedQuiz }
      );
      console.log("Response from server:", response);
      alert("Quiz assigned successfully");
    } catch (err) {
      console.error("Error assigning quiz:", err);
      setError(`Error assigning quiz: ${err.message}`);
      alert("Failed to assign quiz");
    }
  };

  return (
    <div>
      <h2>Assign Quiz to Class</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Select Class:
          <select
            value={selectedClass}
            onChange={handleClassChange}
            disabled={loadingClasses || !!error}
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.className}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Quiz:
          <select
            value={selectedQuiz}
            onChange={handleQuizChange}
            disabled={loadingQuizzes || !!error}
          >
            <option value="">Select Quiz</option>
            {quizzes.map((quiz) => (
              <option key={quiz._id} value={quiz._id}>
                {quiz.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={handleAssign}
        disabled={!selectedClass || !selectedQuiz || !!error}
      >
        Assign Quiz
      </button>
      {loadingClasses && <p>Loading classes...</p>}
      {loadingQuizzes && <p>Loading quizzes...</p>}
    </div>
  );
};

export default AssignQuizToClassList;
