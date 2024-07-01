import { useState } from "react";
import axios from "axios";

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle change in option fields
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.some((option) => !option) || !correctOption) {
      setError(
        "Please fill out all fields and ensure there are no empty options."
      );
      return;
    }

    try {
      await axios.post(
        "https://quiz-backend-1-yerh.onrender.com/api/questions",
        {
          question,
          options,
          correctOption,
        }
      );

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOption("");
      setError("");
      setSuccess("Question submitted successfully!");
    } catch (error) {
      console.error("There was an error submitting the question!", error);
      setError("There was an error submitting the question. Please try again.");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <input
          type="text"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          placeholder="Correct option"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Admin;
