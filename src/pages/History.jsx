import { useState } from "react";
import axios from "axios";

function History() {
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `https://quiz-backend-1-yerh.onrender.com/api/history/${username}`
      );
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching history:", error);
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
      <button onClick={fetchHistory}>Fetch History</button>
      {history.map((entry, index) => (
        <div key={index}>
          {entry.answers.map((answer, idx) => (
            <div key={idx}>
              <h3>Question: {answer.question}</h3>
              <p>Your Answer: {answer.selectedOption}</p>
              <p>Correct Answer: {answer.correctOption}</p>
              <p>
                Result:{" "}
                {answer.selectedOption === answer.correctOption
                  ? "Correct"
                  : "Incorrect"}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default History;
