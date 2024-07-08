import React from "react";
import CreateClass from "./CreateClass";
import ClassList from "./ClassList";

const SchoolManagement = () => {
  return (
    <div>
      <h1>School Management System</h1>
      <h2>Create Class</h2>
      <CreateClass />
      <ClassList />
    </div>
  );
};

export default SchoolManagement;
