import React from "react";
import StudentCreation from "./StudentCreation";
import LoginStudent from "./StudentLogin";

const StudentsLoginPage = () => {
  return (
    <div>
      <LoginStudent />
      <StudentCreation />
    </div>
  );
};

export default StudentsLoginPage;
