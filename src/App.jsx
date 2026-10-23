import { useState } from "react";
import { sampleData } from "./data/sampleData";

function App() {
  const [answers, setAnswers] = useState(() =>
    Array.from({ length: sampleData.length }, () => ""),
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = sampleData[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex < sampleData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <div>
        <div>
          <p>
            <span className="mr-2">{currentQuestion.id}.</span>
            {currentQuestion.question}
          </p>
          {currentQuestion.options.map((opt) => (
            <div key={opt}>
              <input
                className="mx-2"
                type="radio"
                id={opt}
                name="options"
                value={opt}
                checked={answers[currentQuestionIndex] === opt}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setAnswers((prev) => {
                    const updatedAnswers = [...prev];
                    updatedAnswers[currentQuestionIndex] = newValue;
                    return updatedAnswers;
                  });
                }}
              />
              <label htmlFor={opt} className="px-2">
                {opt}
              </label>
              <br />
            </div>
          ))}
        </div>
      </div>
      <button onClick={previousQuestion}>Prev</button>
      <button onClick={nextQuestion}>Next</button>
      <p>
        Question {currentQuestion.id} of {sampleData.length}
      </p>
    </div>
  );
}

export default App;
