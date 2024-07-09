import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeacherStudent from "../TeacherStudent/TeacherStudent";
import QuestionsSection from "../QuestionSection";
import CreateQuiz from "../CreateQuiz";
import BookmarksSection from "../Bookmark";
import ClassList from "../../SchoolManagementSystem/ClassList";
import TeacherClasses from "../TeacherClasses";
import AssignQuizToClassList from "../AssignQuiz";

const TeacherDashboard = () => {
  const { username } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/teachers/username/${username}`
        );
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher", error);
      }
    };
    fetchTeacher();
  }, [username]);

  const handleUpdate = async () => {
    // Refetch teacher data after update
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/teachers/username/${username}`
    );
    setTeacher(response.data);
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {teacher.username}</h1>
      <h1>{teacher._id}</h1>
      <h1>classes of {teacher.username}</h1>
      <TeacherClasses classIds={teacher.className} />

      <QuestionsSection teacher={teacher} setTeacher={setTeacher} />
      <CreateQuiz teacher={teacher} />
      <BookmarksSection teacher={teacher} />
      <AssignQuizToClassList teacherId={teacher} classIds={teacher.className} />
      <ClassList teacherId={teacher._id} onUpdate={handleUpdate} />
    </div>
  );
};

export default TeacherDashboard;

//<TeacherStudent teacher={teacher} setTeacher={setTeacher} />

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import TeacherStudent from "../TeacherStudent/TeacherStudent";
// import QuestionsSection from "../QuestionSection";
// import CreateQuiz from "../CreateQuiz";
// import BookmarksSection from "../Bookmark";
// import TeacherClasses from "../TeacherClasses";
// import AssignQuizToClassList from "../AssignQuiz";
// import ClassList from "../../SchoolManagementSystem/ClassList";

// const TeacherDashboard = () => {
//   const { username } = useParams();
//   const [teacher, setTeacher] = useState(null);

//   useEffect(() => {
//     const fetchTeacher = async () => {
//       try {
//         const response = await axios.get(
//           `${
//             import.meta.env.VITE_BACKEND_URL
//           }/api/teachers/username/${username}`
//         );
//         setTeacher(response.data);
//       } catch (error) {
//         console.error("Error fetching teacher", error);
//       }
//     };
//     fetchTeacher();
//   }, [username]);

//   const handleUpdate = async () => {
//     // Refetch teacher data after update
//     const response = await axios.get(
//       `${import.meta.env.VITE_BACKEND_URL}/api/teachers/username/${username}`
//     );
//     setTeacher(response.data);
//   };

//   if (!teacher) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {teacher.username}</h1>
//       <h1>{teacher._id}</h1>
//       <h1>Classes of {teacher.username}</h1>
//       <TeacherClasses classIds={teacher.className} />
//       <TeacherStudent teacher={teacher} setTeacher={setTeacher} />
//       <QuestionsSection teacher={teacher} setTeacher={setTeacher} />
//       <CreateQuiz teacher={teacher} />
//       <BookmarksSection teacher={teacher} />
//       <AssignQuizToClassList teacherId={teacher} classIds={teacher.className} />
//       <ClassList teacherId={teacher._id} onUpdate={handleUpdate} />
//     </div>
//   );
// };

// export default TeacherDashboard;
