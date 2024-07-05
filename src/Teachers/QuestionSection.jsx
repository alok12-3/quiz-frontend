import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionsSection = ({ teacher, setTeacher }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleViewQuestion = async (questionId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/teachers/question/${questionId}`
      );
      setSelectedQuestion(response.data);
    } catch (error) {
      console.error("Error fetching question details", error);
    }
  };

  const handleBookmark = async (questionId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/teachers/${
          teacher._id
        }/bookmark-question`,
        { questionId }
      );
      setTeacher(response.data);
    } catch (error) {
      console.error("Error bookmarking question", error);
    }
  };

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            {question.question}
            <button onClick={() => handleViewQuestion(question._id)}>
              View
            </button>
            <button onClick={() => handleBookmark(question._id)}>
              Bookmark
            </button>
          </li>
        ))}
      </ul>
      {selectedQuestion && (
        <div>
          <h3>{selectedQuestion.question}</h3>
          <h3>{selectedQuestion.difficulty}</h3>
          <h3>{selectedQuestion.subject}</h3>
          <h3>{selectedQuestion.chapter}</h3>
          <h3>{selectedQuestion.topic}</h3>
          <p>{selectedQuestion.answerOfQuestion}</p>
        </div>
      )}

      <div></div>
    </div>
  );
};

export default QuestionsSection;
