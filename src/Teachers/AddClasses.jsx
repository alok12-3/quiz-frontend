import React, { useEffect, useState } from "react";
import axios from "axios";

const AddClasses = ({ teacher }) => {
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

  const handleClassSelection = (classId) => {
    setSelectedClasses((prevSelected) => {
      if (prevSelected.includes(classId)) {
        return prevSelected.filter((id) => id !== classId);
      } else {
        return [...prevSelected, classId];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes/add-teacher`,
        {
          teacherId: teacher._id,
          classIds: selectedClasses,
        }
      );
      alert("Classes updated successfully");
    } catch (error) {
      console.error("Error updating classes", error);
    }
  };

  return (
    <div>
      <h2>Add Classes</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            <label>
              <input
                type="checkbox"
                value={classItem._id}
                onChange={() => handleClassSelection(classItem._id)}
              />
              {classItem.className} - {classItem.section}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddClasses;
