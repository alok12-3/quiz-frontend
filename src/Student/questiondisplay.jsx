// import React from "react";

// const Question = ({ question }) => {
//   const renderQuestion = () => {
//     switch (question.questionType) {
//       case "mcq":
//         return (
//           <div>
//             <p>{question.question}</p>
//             {question.options.map((option, index) => (
//               <div key={index}>
//                 <input
//                   type="radio"
//                   id={option}
//                   name={question._id}
//                   value={option}
//                 />
//                 <label htmlFor={option}>{option}</label>
//               </div>
//             ))}
//           </div>
//         );
//       default:
//         return (
//           <div>
//             <p>{question.question}</p>
//             <input type="text" placeholder="Your answer" />
//           </div>
//         );
//     }
//   };

//   return <div>{renderQuestion()}</div>;
// };

// export default Question;

import React from "react";

const Question = ({ question, handleInputChange }) => {
  const renderQuestion = () => {
    switch (question.questionType) {
      case "mcq":
        return (
          <div>
            <p>{question.question}</p>
            {question.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name={question._id}
                  value={option}
                  onChange={(e) =>
                    handleInputChange(
                      question._id,
                      question.question,
                      e.target.value
                    )
                  }
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div>
            <p>{question.question}</p>
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) =>
                handleInputChange(
                  question._id,
                  question.question,
                  e.target.value
                )
              }
            />
          </div>
        );
    }
  };

  return <div>{renderQuestion()}</div>;
};

export default Question;
