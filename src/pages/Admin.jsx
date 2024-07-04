import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "./AdminPanel.css";

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
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/questions`, {
        question,
        options,
        correctOption,
      });

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
    <div className="admin-panel">
      <h2 className="title">Admin Panel</h2>
      {error && (
        <Alert status="error" className="alert">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert status="success" className="alert">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question"
          className="textarea"
        />
        {options.map((option, index) => (
          <Input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="input"
          />
        ))}
        <Input
          type="text"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          placeholder="Correct option"
          className="input"
        />
        <Button type="submit" className="submit-button">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Admin;
