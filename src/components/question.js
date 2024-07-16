import React from 'react';

const Question = ({ question, index, onAnswerChange, userAnswer }) => {
  const handleChange = (event) => {
    const { value, type, checked } = event.target;

    if (type === 'checkbox') {
      let updatedAnswers = [...(userAnswer || [])];
      if (checked) {
        updatedAnswers.push(value);
      } else {
        updatedAnswers = updatedAnswers.filter((answer) => answer !== value);
      }
      onAnswerChange(index, updatedAnswers);
    } else {
      onAnswerChange(index, value);
    }
  };

  return (
    <div className="question">
      <p>{question.question}</p>
      {question.type === 'radio' && question.options.map((option, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              checked={userAnswer === option}
              onChange={handleChange}
            />
            {option}
          </label>
        </div>
      ))}
      {question.type === 'checkbox' && question.options.map((option, idx) => (
        <div key={idx}>
          <label>
            <input
              type="checkbox"
              name={`question-${index}`}
              value={option}
              checked={userAnswer && userAnswer.includes(option)}
              onChange={handleChange}
            />
            {option}
          </label>
        </div>
      ))}
      {question.type === 'dropdown' && (
        <select value={userAnswer} onChange={handleChange}>
          <option value="">Select an option</option>
          {question.options.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
        </select>
      )}
      {question.type === 'text' && (
        <input
          type="text"
          value={userAnswer}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Question;
