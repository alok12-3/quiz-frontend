import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/classes`
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>All Classes</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            {classItem.className} - {classItem.section} - {classItem.year} -{" "}
            {classItem.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
