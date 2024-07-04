import React, { useState, useEffect } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [formData, setFormData] = useState({
    board: "",
    class: "",
    subject: "",
    chapter: "",
    topic: "",
    question: "",
    questionType: "",
    options: ["", "", "", ""],
    correctOption: "",
    answerOfQuestion: "",
    difficulty: "medium",
  });

  const boardClassSubjectChapterMap = {
    ncert: {
      9: {
        subjects: ["maths", "science", "social science"],
        chapters: {
          maths: [
            "Number Systems",
            "Polynomials",
            "Coordinate Geometry",
            "Linear Equations in Two Variables",
            "Introduction to Euclid’s Geometry",
            "Lines and Angles",
            "Triangles",
            "Quadrilaterals",
            "Areas of Parallelograms and Triangles",
            "Circles",
            "Constructions",
            "Heron’s Formula",
            "Surface Areas and Volumes",
            "Statistics",
            "Probability",
          ],
          science: [
            "Matter in Our Surroundings",
            "Is Matter Around Us Pure",
            "Atoms and Molecules",
            "Structure of the Atom",
            "The Fundamental Unit of Life",
            "Tissues",
            "Diversity in Living Organisms",
            "Motion",
            "Force and Laws of Motion",
            "Gravitation",
            "Work and Energy",
            "Sound",
            "Why Do We Fall Ill?",
            "Natural Resources",
            "Improvement in Food Resources",
          ],
          social_science: [
            "The French Revolution",
            "Socialism in Europe and the Russian Revolution",
            "Nazism and the Rise of Hitler",
            "Forest Society and Colonialism",
            "Pastoralists in the Modern World",
          ],
        },
      },
      10: {
        subjects: ["maths", "science", "social science"],
        chapters: {
          maths: [
            "Real Numbers",
            "Polynomials",
            "Pair of Linear Equations in Two Variables",
            "Quadratic Equations",
            "Arithmetic Progressions",
            "Triangles",
            "Coordinate Geometry",
            "Introduction to Trigonometry",
            "Applications of Trigonometry",
            "Circles",
            "Constructions",
            "Areas Related to Circles",
            "Surface Areas and Volumes",
            "Statistics",
            "Probability",
          ],
          science: [
            "Chemical Reactions and Equations",
            "Acids, Bases, and Salts",
            "Metals and Non-metals",
            "Carbon and its Compounds",
            "Periodic Classification of Elements",
            "Life Processes",
            "Control and Coordination",
            "How do Organisms Reproduce?",
            "Heredity and Evolution",
            "Light: Reflection and Refraction",
            "Human Eye and Colourful World",
            "Electricity",
            "Magnetic Effects of Electric Current",
            "Sources of Energy",
            "Our Environment",
            "Management of Natural Resources",
          ],
          social_science: [
            "The Rise of Nationalism in Europe",
            "The Nationalist Movement in Indo-China",
            "Nationalism in India",
            "The Making of a Global World",
            "The Age of Industrialisation",
            "Work, Life and Leisure",
            "Print Culture and the Modern World",
            "Novels, Society and History",
          ],
        },
      },
    },
    icse: {
      9: {
        subjects: ["maths", "science", "social science"],
        chapters: {
          maths: [
            "Rational and Irrational Numbers",
            "Compound Interest",
            "Expansions",
            "Factorization",
            "Simultaneous Linear Equations",
            "Indices",
            "Logarithms",
            "Triangle and its Properties",
            "Mid-point Theorem",
            "Pythagoras Theorem",
            "Rectilinear Figures",
            "Theorem of Areas",
            "Coordinate Geometry",
            "Mensuration",
            "Trigonometry",
            "Statistics",
          ],
          science: [
            "Plant and Animal Physiology",
            "Diversity in Living Organisms",
            "Human Anatomy and Physiology",
            "Health and Hygiene",
            "Nutrition in Plants and Animals",
            "Ecology and Ecosystem",
            "Acids, Bases, and Salts",
            "Atoms and Molecules",
            "Structure of the Atom",
            "Chemical Reactions",
            "Motion and Measurement",
            "Force and Pressure",
            "Work, Energy, and Power",
            "Sound",
            "Light",
          ],
          social_science: [
            "The Harappan Civilization",
            "The Vedic Period",
            "Jainism and Buddhism",
            "The Mauryan Empire",
            "The Gupta Empire",
            "The Sangam Age",
            "Medieval India",
            "The Mughal Empire",
            "The Maratha Empire",
            "Modern India",
          ],
        },
      },
      10: {
        subjects: ["maths", "science", "social science"],
        chapters: {
          maths: [
            "Goods and Services Tax",
            "Banking",
            "Linear Inequations",
            "Quadratic Equations",
            "Ratio and Proportion",
            "Matrices",
            "Arithmetic Progression",
            "Geometric Progression",
            "Mensuration",
            "Trigonometry",
            "Coordinate Geometry",
            "Statistics",
            "Probability",
          ],
          science: [
            "Chemical Substances - Nature and Behaviour",
            "World of Living",
            "Natural Phenomena",
            "Effects of Current",
            "Natural Resources",
          ],
          social_science: [
            "The First War of Independence",
            "Growth of Nationalism",
            "First Phase of the Indian National Movement",
            "Second Phase of the Indian National Movement",
            "The First World War and the Russian Revolution",
            "The Second World War",
            "Post-War World and India",
          ],
        },
      },
    },
  };

  useEffect(() => {
    setSelectedSubject("");
    setSelectedChapter("");
  }, [selectedBoard, selectedClass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions`,
        formData
      );
      alert("Question submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting question.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Board:</label>
        <select
          name="board"
          value={selectedBoard}
          onChange={(e) => {
            setSelectedBoard(e.target.value);
            handleChange(e);
          }}
        >
          <option value="">Select Board</option>
          {Object.keys(boardClassSubjectChapterMap).map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>

      {selectedBoard && (
        <div>
          <label>Class:</label>
          <select
            name="class"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              handleChange(e);
            }}
          >
            <option value="">Select Class</option>
            {Object.keys(boardClassSubjectChapterMap[selectedBoard]).map(
              (cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {selectedBoard && selectedClass && (
        <div>
          <label>Subject:</label>
          <select
            name="subject"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              handleChange(e);
            }}
          >
            <option value="">Select Subject</option>
            {boardClassSubjectChapterMap[selectedBoard][
              selectedClass
            ].subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBoard && selectedClass && selectedSubject && (
        <div>
          <label>Chapter:</label>
          <select
            name="chapter"
            value={selectedChapter}
            onChange={(e) => {
              setSelectedChapter(e.target.value);
              handleChange(e);
            }}
          >
            <option value="">Select Chapter</option>
            {boardClassSubjectChapterMap[selectedBoard][selectedClass].chapters[
              selectedSubject
            ].map((chapter) => (
              <option key={chapter} value={chapter}>
                {chapter}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBoard && selectedClass && selectedSubject && selectedChapter && (
        <>
          <div>
            <label>Topic:</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Question:</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Question Type:</label>
            <select
              name="questionType"
              value={selectedQuestionType}
              onChange={(e) => {
                setSelectedQuestionType(e.target.value);
                handleChange(e);
              }}
            >
              <option value="">Select Question Type</option>
              <option value="mcq">MCQ</option>
              <option value="short answer">Short Answer</option>
              <option value="long answer">Long Answer</option>
              <option value="medium answer">Medium Answer</option>
              <option value="very long answer">Very Long Answer</option>
              <option value="fill">Fill in the Blank</option>
              <option value="match">Match</option>
            </select>
          </div>

          {selectedQuestionType === "mcq" ? (
            <>
              <div>
                <label>Option 1:</label>
                <input
                  type="text"
                  value={formData.options[0]}
                  onChange={(e) => handleOptionChange(0, e.target.value)}
                />
              </div>
              <div>
                <label>Option 2:</label>
                <input
                  type="text"
                  value={formData.options[1]}
                  onChange={(e) => handleOptionChange(1, e.target.value)}
                />
              </div>
              <div>
                <label>Option 3:</label>
                <input
                  type="text"
                  value={formData.options[2]}
                  onChange={(e) => handleOptionChange(2, e.target.value)}
                />
              </div>
              <div>
                <label>Option 4:</label>
                <input
                  type="text"
                  value={formData.options[3]}
                  onChange={(e) => handleOptionChange(3, e.target.value)}
                />
              </div>
              <div>
                <label>Correct Option:</label>
                <input
                  type="text"
                  name="correctOption"
                  value={formData.correctOption}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <div>
              <label>Answer:</label>
              <input
                type="text"
                name="answerOfQuestion"
                value={formData.answerOfQuestion}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label>Difficulty:</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button type="submit">Submit Question</button>
        </>
      )}
    </form>
  );
};

export default QuestionForm;
