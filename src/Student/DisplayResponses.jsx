import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayResponses = ({ studentId }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/responses/student/${studentId}`
        );
        setResponses(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching responses");
        setLoading(false);
      }
    };

    fetchResponses();
  }, [studentId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {responses.map((response) => (
        <div key={response._id} className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Quizzes:{" "}
            {response.quizzes.map((quiz) => quiz.quiz.title).join(", ")}
          </h3>
          {response.quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="mb-4 p-4 border border-gray-200 rounded-lg shadow"
            >
              <h4 className="text-lg font-semibold mb-2">
                Quiz: {quiz.quiz.title}
              </h4>
              {quiz.answers.map((answer) => (
                <div key={answer._id} className="mb-2 p-2 bg-gray-50 rounded">
                  <p className="font-medium">
                    Question: {answer.questionstring}
                  </p>
                  <p className="text-gray-700">Answer: {answer.answer}</p>
                  <p className="text-gray-600">
                    Gemini Response: {answer.geminiresponse}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DisplayResponses;
