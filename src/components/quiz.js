import React, { useState, useEffect, useCallback } from 'react';
import Question from './question';
import Login from './Login';  // Import the Login component

const questions = [ 
  {
    "question": "1. What is Java?",
    "type": "radio",
    "options": ["A programming language", "A coffee brand", "A type of dance", "A car model"],
    "answer": "A programming language"
  },
  {
    "question": "2. Which company developed Java?",
    "type": "dropdown",
    "options": ["Microsoft", "Apple", "Sun Microsystems", "IBM"],
    "answer": "Sun Microsystems"
  },
  {
    "question": "3. Select the primitive data types in Java:",
    "type": "checkbox",
    "options": ["int", "String", "boolean", "List"],
    "answer": ["int", "boolean"]
  },
  {
    "question": "4. What does JVM stand for?",
    "type": "text",
    "answer": "Java Virtual Machine"
  },
  {
    "question": "5. Which of these is not a Java feature?",
    "type": "radio",
    "options": ["Object-oriented", "Use of pointers", "Portable", "Dynamic"],
    "answer": "Use of pointers"
  },
  {
    "question": "6. Which keyword is used to define a subclass in Java?",
    "type": "dropdown",
    "options": ["extends", "implements", "inherits", "subclass"],
    "answer": "extends"
  },
  {
    "question": "7. Which of the following is not a valid access modifier in Java?",
    "type": "radio",
    "options": ["public", "private", "protected", "final"],
    "answer": "final"
  },
  {
    "question": "8. What is the default value of a boolean variable in Java?",
    "type": "radio",
    "options": ["true", "false", "0", "null"],
    "answer": "false"
  },
  {
    "question": "9. Which method is used to start a thread in Java?",
    "type": "dropdown",
    "options": ["run()", "execute()", "start()", "begin()"],
    "answer": "start()"
  },
  {
    "question": "10. Select all valid ways to create a String object in Java:",
    "type": "checkbox",
    "options": ["new String()", "String literal", "String()", "new StringBuilder()"],
    "answer": ["new String()", "String literal"]
  },
  {
    "question": "11. What is the size of an int variable in Java?",
    "type": "radio",
    "options": ["16 bits", "32 bits", "64 bits", "128 bits"],
    "answer": "32 bits"
  },
  {
    "question": "12. Which of the following is not a type of loop in Java?",
    "type": "dropdown",
    "options": ["for", "while", "do-while", "repeat"],
    "answer": "repeat"
  },
  {
    "question": "13. How many catch blocks can be associated with one try block in Java?",
    "type": "text",
    "answer": "multiple"
  },
  {
    "question": "14. Which of the following is used to handle exceptions in Java?",
    "type": "radio",
    "options": ["try", "catch", "finally", "All of the above"],
    "answer": "All of the above"
  },
  {
    "question": "15. Select the keywords used for synchronization in Java:",
    "type": "checkbox",
    "options": ["synchronized", "volatile", "atomic", "transient"],
    "answer": ["synchronized", "volatile"]
  },
  {
    "question": "16. What is the parent class of all classes in Java?",
    "type": "text",
    "answer": "Object"
  },
  {
    "question": "17. Which package contains the String class?",
    "type": "radio",
    "options": ["java.util", "java.io", "java.lang", "java.net"],
    "answer": "java.lang"
  },
  {
    "question": "18. Which of the following statements are true about interfaces in Java?",
    "type": "checkbox",
    "options": ["Interfaces can contain method implementations.", "Interfaces can extend multiple interfaces.", "Interfaces can be instantiated.", "Interfaces can contain constants."],
    "answer": ["Interfaces can extend multiple interfaces.", "Interfaces can contain constants."]
  },
  {
    "question": "19. Which of these is a valid constructor for a class named 'Person'?",
    "type": "dropdown",
    "options": ["Person()", "void Person()", "public void Person()", "None of the above"],
    "answer": "Person()"
  },
  {
    "question": "20. What does the 'final' keyword mean when applied to a variable?",
    "type": "radio",
    "options": ["The variable cannot be changed.", "The variable is thread-safe.", "The variable is private.", "The variable is volatile."],
    "answer": "The variable cannot be changed."
  }
 ];

const Quiz = () => {
  const questionsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = useCallback(() => {
    let newScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (question.type === 'text') {
        if (userAnswer && userAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
          newScore++;
        }
      } else if (question.type === 'radio' || question.type === 'dropdown') {
        if (userAnswer === question.answer) {
          newScore++;
        }
      } else if (question.type === 'checkbox') {
        if (
          userAnswer &&
          question.answer &&
          userAnswer.length === question.answer.length &&
          userAnswer.every((value) => question.answer.includes(value))
        ) {
          newScore++;
        }
      }
    });
    setScore(newScore);
  }, [userAnswers]);

  useEffect(() => {
    if (score !== null) {
      return; // Don't start timer if quiz is over
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, handleSubmit]);

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  const handleNextPage = () => {
    if ((currentPage + 1) * questionsPerPage < questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} />;
  }

  return (
    <div id="quiz-container">
      {score === null ? (
        <form id="quiz-form">
          <div id="timer">Time Left: {timeLeft} seconds</div>
          <div id="questions-container">
            {currentQuestions.map((question, index) => (
              <Question
                key={index}
                question={question}
                index={startIndex + index}
                onAnswerChange={handleAnswerChange}
                userAnswer={userAnswers[startIndex + index]}
              />
            ))}
          </div>
          <div id="pagination-controls">
            {currentPage > 0 && <button type="button" onClick={handlePrevPage}>Previous</button>}
            {(currentPage + 1) * questionsPerPage < questions.length && (
              <button type="button" onClick={handleNextPage}>Next</button>
            )}
            {(currentPage + 1) * questionsPerPage >= questions.length && (
              <button type="button" id="submit-btn" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </form>
      ) : (
        <div id="score-popup">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button type="button" onClick={() => {
            setScore(null);
            setTimeLeft(300);
            setUserAnswers(Array(questions.length).fill(''));
            setCurrentPage(0);
          }}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
