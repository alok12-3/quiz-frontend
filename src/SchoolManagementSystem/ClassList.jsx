// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ClassList = () => {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/classes`
//         );
//         setClasses(response.data);
//       } catch (error) {
//         console.error("Error fetching classes", error);
//       }
//     };
//     fetchClasses();
//   }, []);

//   return (
//     <div>
//       <h2>All Classes</h2>
//       <ul>
//         {classes.map((classItem) => (
//           <li key={classItem._id}>
//             {classItem.className} - {classItem.section} - {classItem.year} -{" "}
//             {classItem.grade} - {classItem._id}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ClassList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassList = ({ teacherId, onUpdate }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

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

  const handleAddClass = async (classId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/teachers/${teacherId}/classes`,
        { classIds: [classId] }
      );
      onUpdate();
    } catch (error) {
      console.error("Error adding class to teacher:", error);
    }
  };

  return (
    <div>
      <h2>All Classes</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            {classItem.className} - {classItem.section} - {classItem.year} -{" "}
            {classItem.grade} - {classItem._id}
            <button onClick={() => handleAddClass(classItem._id)}>
              Add Class
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
