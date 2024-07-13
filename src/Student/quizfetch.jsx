// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Question from "./questiondisplay";

// const QuizFetch = ({ quizId }) => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizId}/questions`
//         );
//         setQuestions(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [quizId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {questions.map((question) => (
//         <Question key={question._id} question={question} />
//       ))}
//     </div>
//   );
// };

// export default QuizFetch;

import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizFetch = ({ quizIds, studentId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizIds}/questions`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizIds]);

  const handleInputChange = (questionId, questionstring, answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (a) => a.questionId === questionId
      );
      if (existingAnswer) {
        return prevAnswers.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a
        );
      } else {
        return [...prevAnswers, { questionId, questionstring, answer }];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/responses`, {
        studentId,
        quizId: quizIds,
        answers,
      });
      alert("Responses submitted successfully!");
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("Failed to submit responses");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {questions.map((question) => (
        <div key={question._id}>
          <p>{question.question}</p>
          {question.questionType === "mcq" ? (
            <div>
              {question.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={option}
                    name={question._id}
                    value={option}
                    onChange={(e) =>
                      handleInputChange(
                        question._id,
                        question.question,
                        e.target.value
                      )
                    }
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) =>
                handleInputChange(
                  question._id,
                  question.question,
                  e.target.value
                )
              }
            />
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizFetch;
