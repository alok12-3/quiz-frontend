import { useState, useEffect } from "react";
import axios from "axios";

function Quiz() {
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const fetchQuestions = async () => {
    try {
      setQuestions([]);
      const res = await axios.get(
        "https://quiz-backend-1-yerh.onrender.com/api/questions"
      );
      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, selectedOption, correctOption) => {
    const newAnswers = [...answers];
    const index = newAnswers.findIndex(
      (answer) => answer.questionId === questionId
    );
    if (index !== -1) {
      newAnswers[index].selectedOption = selectedOption;
    } else {
      newAnswers.push({ questionId, selectedOption, correctOption });
    }
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://quiz-backend-1-yerh.onrender.com/api/submit", {
        username,
        answers,
      });
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      {questions.map((question) => (
        <div key={question._id}>
          <p>{question.question}</p>
          {question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                onChange={() =>
                  handleAnswerChange(
                    question._id,
                    option,
                    question.correctOption
                  )
                }
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={fetchQuestions}>Refresh Questions</button>
    </div>
  );
}

export default Quiz;
