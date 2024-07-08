import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherClasses = ({ classIds }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/classes/by-ids`,
          { classIds }
        );
        setClasses(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [classIds]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Classes</h1>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>{classItem.className}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherClasses;
