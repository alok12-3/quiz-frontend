import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import "./QuizApp.css";

function Quiz() {
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const fetchQuestions = async () => {
    try {
      setQuestions([]);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions`
      );
      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionClick = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions };
      if (newSelectedOptions[questionId] === option) {
        delete newSelectedOptions[questionId];
      } else {
        newSelectedOptions[questionId] = option;
      }
      return newSelectedOptions;
    });

    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      const index = newAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (index !== -1) {
        if (newAnswers[index].selectedOption === option) {
          newAnswers.splice(index, 1);
        } else {
          newAnswers[index].selectedOption = option;
        }
      } else {
        newAnswers.push({
          questionId,
          selectedOption: option,
          correctOption: questions.find((q) => q._id === questionId)
            .correctOption,
        });
      }
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submit`, {
        username,
        answers,
      });
      alert("Answers submitted successfully!");
    } catch (error) {
      console.error("Error submitting answers", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  const answeredCount = Object.keys(selectedOptions).length;
  const progressValue = (answeredCount / questions.length) * 100;

  return (
    <div className="quiz-container">
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="username-input"
      />
      <Progress value={progressValue} className="m-2 " />
      {questions.map((question) => (
        <div key={question._id} className="question-container">
          <p className="question-text">{question.question}</p>
          <div className="options-container">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option-container ${
                  selectedOptions[question._id] === option ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(question._id, option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="button-container">
        <Button onClick={handleSubmit} className="submit-button">
          Submit
        </Button>
        <Button onClick={fetchQuestions} className="refresh-button">
          Refresh Questions
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
