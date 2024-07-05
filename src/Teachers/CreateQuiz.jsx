import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CreateQuiz.css";

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

const CreateQuiz = ({ teacher }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filters, setFilters] = useState({
    board: "",
    class: "",
    subject: "",
    chapter: "",
    topic: "",
    questionType: "",
    difficulty: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/questions`
        );
        setQuestions(response.data);
        setFilteredQuestions(response.data); // Initialize with all questions
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [filters]);

  const handleAddQuestion = (question) => {
    setSelectedQuestions((prev) => [...prev, question]);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/teachers/${
          teacher._id
        }/create-quiz`,
        {
          title,
          questions: selectedQuestions,
        }
      );
      console.log("Quiz created", response.data);
      setTitle("");
      setSelectedQuestions([]);
    } catch (error) {
      console.error("Error creating quiz", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterQuestions = () => {
    let filtered = questions;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter(
          (question) => question[key] === filters[key]
        );
      }
    });
    setFilteredQuestions(filtered);
  };

  const getDropdownOptions = (type) => {
    switch (type) {
      case "subject":
        return filters.board && filters.class
          ? boardClassSubjectChapterMap[filters.board][filters.class]
              ?.subjects || []
          : [];
      case "chapter":
        return filters.board && filters.class && filters.subject
          ? boardClassSubjectChapterMap[filters.board][filters.class]?.chapters[
              filters.subject
            ] || []
          : [];
      default:
        return [];
    }
  };

  return (
    <div className="create-quiz-container">
      <div className="filters">
        <h3>Filters</h3>
        <select
          name="board"
          onChange={handleFilterChange}
          value={filters.board}
        >
          <option value="">All Boards</option>
          <option value="ncert">NCERT</option>
          <option value="icse">ICSE</option>
        </select>
        <select
          name="class"
          onChange={handleFilterChange}
          value={filters.class}
        >
          <option value="">All Classes</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
        <select
          name="subject"
          onChange={handleFilterChange}
          value={filters.subject}
        >
          <option value="">All Subjects</option>
          {getDropdownOptions("subject").map((subject) => (
            <option key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="chapter"
          onChange={handleFilterChange}
          value={filters.chapter}
        >
          <option value="">All Chapters</option>
          {getDropdownOptions("chapter").map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
        <select
          name="questionType"
          onChange={handleFilterChange}
          value={filters.questionType}
        >
          <option value="">All Question Types</option>
          <option value="mcq">MCQ</option>
          <option value="short answer">Short Answer</option>
          <option value="long answer">Long Answer</option>
          <option value="medium answer">Medium Answer</option>
          <option value="very long answer">Very Long Answer</option>
          <option value="fill">Fill in the Blanks</option>
          <option value="match">Match the Following</option>
        </select>
        <select
          name="difficulty"
          onChange={handleFilterChange}
          value={filters.difficulty}
        >
          <option value="">All Difficulty Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="questions-list">
        <h3>Questions List</h3>
        <ul>
          {filteredQuestions.map((question) => (
            <li key={question._id}>
              {question.question}
              <button onClick={() => handleAddQuestion(question._id)}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="selected-questions">
        <h3>Selected Questions</h3>
        <ul>
          {selectedQuestions.map((questionId) => {
            const question = questions.find((q) => q._id === questionId);
            return <li key={questionId}>{question?.question}</li>;
          })}
        </ul>
      </div>

      <div className="quiz-details">
        <form onSubmit={handleCreateQuiz}>
          <label>
            Quiz Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
