//*************************************************orignal**************************** */
import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizFetch = ({ quizIds, studentId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [images, setImages] = useState({});

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

  const handleImageChange = (questionId, questionstring, event) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prevImages) => ({
        ...prevImages,
        [questionId]: { file, questionstring },
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("studentId", studentId);
      formData.append("quizId", quizIds);

      Object.keys(images).forEach((questionId) => {
        formData.append("images", images[questionId].file);
        formData.append("questionIds", questionId);
        formData.append("questionstrings", images[questionId].questionstring);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/responses`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageChange(question._id, question.question, e)
            }
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuizFetch;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const QuizFetch = ({ quizIds, studentId }) => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [images, setImages] = useState({});
//   const [imageUrls, setImageUrls] = useState({});

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizIds}/questions`
//         );
//         setQuestions(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [quizIds]);

//   const handleImageChange = (questionId, questionstring, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImages((prevImages) => ({
//         ...prevImages,
//         [questionId]: { file, questionstring },
//       }));
//     }
//   };

//   const uploadImageToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "quizapp");
//     formData.append("cloud_name", "dummrfevq");

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/dummrfevq/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.secure_url;
//     } catch (err) {
//       console.error("Upload failed:", err);
//       throw err;
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const imageUploadPromises = Object.keys(images).map(
//         async (questionId) => {
//           const { file } = images[questionId];
//           const imageUrl = await uploadImageToCloudinary(file);
//           setImageUrls((prevUrls) => ({
//             ...prevUrls,
//             [questionId]: imageUrl,
//           }));
//         }
//       );

//       await Promise.all(imageUploadPromises);

//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/responses`,
//         {
//           studentId,
//           quizId: quizIds,
//           imageUrls,
//           questionIds: Object.keys(images),
//           questionstrings: Object.values(images).map(
//             (img) => img.questionstring
//           ),
//         }
//       );

//       alert("Responses submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting responses:", error);
//       alert("Failed to submit responses");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {questions.map((question) => (
//         <div key={question._id}>
//           <p>{question.question}</p>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) =>
//               handleImageChange(question._id, question.question, e)
//             }
//           />
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default QuizFetch;

//****************************************************************************************************88 */
