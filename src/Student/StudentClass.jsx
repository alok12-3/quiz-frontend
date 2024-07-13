// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import QuizFetch from "./quizfetch";

// const ClassDetails = ({ student }) => {
//   const [classDetails, setClassDetails] = useState(null);
//   const [quizzes, setQuizzes] = useState([]);
//   const [error, setError] = useState("");
//   const [quizIds, setQuizIds] = useState("");

//   useEffect(() => {
//     const fetchClassDetails = async () => {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/classes/by-ids`,
//           { classIds: [student.classId] }
//         );
//         setClassDetails(response.data[0]);
//       } catch (error) {
//         console.error("Error fetching class details:", error);
//         setError(
//           error.response
//             ? error.response.data.message
//             : "Failed to fetch class details"
//         );
//       }
//     };

//     if (student.classId) {
//       fetchClassDetails();
//     }
//   }, [student.classId]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       if (classDetails && classDetails.quizId.length > 0) {
//         try {
//           const response = await axios.post(
//             `${import.meta.env.VITE_BACKEND_URL}/api/quiz/by-ids`,
//             { quizId: classDetails.quizId }
//           );
//           setQuizzes(response.data);
//         } catch (error) {
//           console.error("Error fetching quizzes:", error);
//           setError(
//             error.response
//               ? error.response.data.message
//               : "Failed to fetch quizzes"
//           );
//         }
//       }
//     };

//     fetchQuizzes();
//   }, [classDetails]);

//   if (error) {
//     return <p style={{ color: "red" }}>{error}</p>;
//   }

//   if (!classDetails) {
//     return <p>Loading class details...</p>;
//   }

//   return (
//     <div>
//       <h2>Class Details</h2>
//       <p>Class Name: {classDetails.className}</p>
//       <p>Year: {classDetails.year}</p>
//       <p>Grade: {classDetails.grade}</p>
//       <p>Section: {classDetails.section}</p>

//       <h3>Quizzes</h3>
//       {quizzes.length > 0 ? (
//         quizzes.map((quiz) => (
//           <div key={quiz._id}>
//             <p>Quiz Name: {quiz.title}</p>
//             <button onClick={setQuizIds(quiz.id)} />
//           </div>
//         ))
//       ) : (
//         <p>No quizzes available</p>
//       )}
//       <h1>Quiz Details</h1>
//       <QuizFetch quizId={quizId} />
//     </div>
//   );
// };

// export default ClassDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import QuizFetch from "./quizfetch";

// const ClassDetails = ({ student }) => {
//   const [classDetails, setClassDetails] = useState(null);
//   const [quizzes, setQuizzes] = useState([]);
//   const [error, setError] = useState("");
//   const [quizId, setQuizId] = useState("");

//   useEffect(() => {
//     const fetchClassDetails = async () => {
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/classes/by-ids`,
//           { classIds: [student.classId] }
//         );
//         setClassDetails(response.data[0]);
//       } catch (error) {
//         console.error("Error fetching class details:", error);
//         setError(
//           error.response
//             ? error.response.data.message
//             : "Failed to fetch class details"
//         );
//       }
//     };

//     if (student.classId) {
//       fetchClassDetails();
//     }
//   }, [student.classId]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       if (classDetails && classDetails.quizId.length > 0) {
//         try {
//           const response = await axios.post(
//             `${import.meta.env.VITE_BACKEND_URL}/api/quiz/by-ids`,
//             { quizId: classDetails.quizId }
//           );
//           setQuizzes(response.data);
//         } catch (error) {
//           console.error("Error fetching quizzes:", error);
//           setError(
//             error.response
//               ? error.response.data.message
//               : "Failed to fetch quizzes"
//           );
//         }
//       }
//     };

//     fetchQuizzes();
//   }, [classDetails]);

//   if (error) {
//     return <p style={{ color: "red" }}>{error}</p>;
//   }

//   if (!classDetails) {
//     return <p>Loading class details...</p>;
//   }

//   return (
//     <div>
//       <h2>Class Details</h2>
//       <p>Class Name: {classDetails.className}</p>
//       <p>Year: {classDetails.year}</p>
//       <p>Grade: {classDetails.grade}</p>
//       <p>Section: {classDetails.section}</p>

//       <h3>Quizzes</h3>
//       {quizzes.length > 0 ? (
//         quizzes.map((quiz) => (
//           <div key={quiz._id}>
//             <p>Quiz Name: {quiz.title}</p>
//             <button onClick={() => setQuizId(quiz._id)}>View Quiz</button>
//           </div>
//         ))
//       ) : (
//         <p>No quizzes available</p>
//       )}
//       {quizId && (
//         <>
//           <h1>Quiz Details</h1>
//           <QuizFetch quizId={quizId} studentId={student._id} />
//         </>
//       )}
//     </div>
//   );
// };

// export default ClassDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizFetch from "./quizfetch";

const ClassDetails = ({ student }) => {
  const [classDetails, setClassDetails] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState("");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/classes/by-ids`,
          { classIds: [student.classId] }
        );
        setClassDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching class details:", error);
        setError(
          error.response
            ? error.response.data.message
            : "Failed to fetch class details"
        );
      }
    };

    if (student.classId) {
      fetchClassDetails();
    }
  }, [student.classId]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (classDetails && classDetails.quizId.length > 0) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/quiz/by-ids`,
            { quizId: classDetails.quizId }
          );
          setQuizzes(response.data);
        } catch (error) {
          console.error("Error fetching quizzes:", error);
          setError(
            error.response
              ? error.response.data.message
              : "Failed to fetch quizzes"
          );
        }
      }
    };

    fetchQuizzes();
  }, [classDetails]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!classDetails) {
    return <p>Loading class details...</p>;
  }

  return (
    <div>
      <h2>Class Details</h2>
      <p>Class Name: {classDetails.className}</p>
      <p>Year: {classDetails.year}</p>
      <p>Grade: {classDetails.grade}</p>
      <p>Section: {classDetails.section}</p>

      <h3>Quizzes</h3>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id}>
            <p>Quiz Name: {quiz.title}</p>
            <button onClick={() => setSelectedQuizId(quiz._id)}>
              Take Quiz
            </button>
          </div>
        ))
      ) : (
        <p>No quizzes available</p>
      )}

      {selectedQuizId && (
        <div>
          <h1>Quiz Details</h1>
          <QuizFetch quizIds={selectedQuizId} studentId={student._id} />
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
