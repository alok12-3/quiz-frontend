import React from "react";

const BookmarksSection = ({ teacher }) => {
  if (!teacher || !teacher.bookmarkedQuestions) {
    return <div>No bookmarked questions available.</div>;
  }

  return (
    <div>
      <h2>Bookmarked Questions</h2>
      <ul>
        {teacher.bookmarkedQuestions.length > 0 ? (
          teacher.bookmarkedQuestions.map((question) => (
            <li key={question._id}>{question.question}</li>
          ))
        ) : (
          <li>No bookmarked questions.</li>
        )}
      </ul>
    </div>
  );
};

export default BookmarksSection;
