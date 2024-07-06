import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeacherStudent from "../TeacherStudent/TeacherStudent";
import QuestionsSection from "../QuestionSection";
import CreateQuiz from "../CreateQuiz";
import BookmarksSection from "../Bookmark";

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

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {teacher.username}</h1>
      <TeacherStudent teacher={teacher} setTeacher={setTeacher} />
      <QuestionsSection teacher={teacher} setTeacher={setTeacher} />
      <CreateQuiz teacher={teacher} />
      <BookmarksSection teacher={teacher} />
    </div>
  );
};

export default TeacherDashboard;

// <QuestionsSection teacher={teacher} setTeacher={setTeacher} />
//<CreateQuiz teacher={teacher} />

//<BookmarksSection teacher={teacher} />
