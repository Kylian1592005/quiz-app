import { useState } from "react";
import { sampleData } from "./data/sampleData";
import Submission from "./components/Submission";

function App() {
  const [answers, setAnswers] = useState(() =>
    Array.from({ length: sampleData.length }, () => ""),
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = sampleData[currentQuestionIndex];
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);
  const [viewBoard, setViewBoard] = useState(false);

  const nextQuestion = () => {
    if (currentQuestionIndex < answers.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const answeredQuestions = answers.filter((answer) => answer !== "");

  const percentageAnsweredQuestions = Math.floor(
    (answeredQuestions.length / answers.length) * 100,
  );

  const handleSubmit = () => {
    if (submitted) return;
    if (answeredQuestions.length < answers.length) {
      setWarning(true);
    } else {
      setSubmitted(true);
    }
  };

  const handleBackTo = () => {
    const targetIndex = answers.findIndex((answer) => answer === "");
    if (targetIndex !== -1) {
      setCurrentQuestionIndex(targetIndex);
      setWarning(false);
    } else {
      setCurrentQuestionIndex(sampleData.length - 1);
    }
  };

  const handleSubmitAnyway = () => {
    setWarning(false);
    setSubmitted(true);
  };

  const handleViewBoard = () => {
    setViewBoard(true);
  };

  /*const correctAnswers = sampleData.filter((data, index) => {
    return answers[index] === data.correctAnswer;
  });

  const incorrectAnswers = sampleData.filter((data, index) => {
    return answers[index] !== "" && answers[index] !== data.correctAnswer;
  });

  const unansweredAnswers = sampleData.filter((_, index) => {
    return answers[index] === "";
  });
  const correctCount = correctAnswers.length;
  const incorrectCount = incorrectAnswers.length;
  const unAnsweredCount = unansweredAnswers.length; */

  const { correctCount, incorrectCount, unAnsweredCount } = sampleData.reduce(
    (acc, data, index) => {
      const userAnswer = answers[index];

      if (userAnswer === "") {
        acc.unAnsweredCount++;
      } else if (userAnswer === data.correctAnswer) {
        acc.correctCount++;
      } else {
        acc.incorrectCount++;
      }

      return acc;
    },
    { correctCount: 0, incorrectCount: 0, unAnsweredCount: 0 },
  );

  const scorePercentage = Math.round(correctCount / answers.length) * 100;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">
          Quiz App
        </h1>

        {submitted ? (
          <Submission
            viewBoard={viewBoard}
            onViewBoard={handleViewBoard}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            unAnsweredCount={unAnsweredCount}
            scorePercentage={scorePercentage}
          />
        ) : (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body gap-6">
              <div className="bg-base-200 p-4 rounded-box">
                <h2 className="text-lg font-semibold mb-2">Quiz Progress</h2>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>
                      {`${answeredQuestions.length}/${answers.length}`}{" "}
                      <span>Questions answered</span>
                    </span>
                    <p className="text-right font-medium">
                      {percentageAnsweredQuestions}% completed
                    </p>
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={answeredQuestions}
                    max={answers.length}
                  ></progress>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl font-medium">
                  <span className="mr-2 text-primary font-bold">
                    {currentQuestion.id}.
                  </span>
                  {currentQuestion.question}
                </p>

                <div className="space-y-2 mt-4">
                  {currentQuestion.options.map((opt) => (
                    <div key={opt}>
                      <label
                        htmlFor={opt}
                        className={`label cursor-pointer justify-start gap-3 p-3 rounded-lg border border-base-300 hover:bg-base-200 transition-colors ${
                          answers[currentQuestionIndex] === opt
                            ? "bg-base-200 border-primary"
                            : ""
                        }`}
                      >
                        <input
                          className="radio radio-primary"
                          type="radio"
                          id={opt}
                          name="options"
                          disabled={submitted === true}
                          value={opt}
                          checked={answers[currentQuestionIndex] === opt}
                          onChange={(e) =>
                            handleAnswerChange(
                              currentQuestionIndex,
                              e.target.value,
                            )
                          }
                        />
                        <span className="label-text text-base font-medium px-2">
                          {opt}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-actions justify-between items-center pt-4 border-t border-base-200">
                <div className="flex gap-2">
                  <button
                    className="btn btn-outline"
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Prev
                  </button>
                  {currentQuestionIndex === answers.length - 1 ? (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit Quiz
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={nextQuestion}>
                      Next
                    </button>
                  )}
                </div>
                <p className="text-sm font-medium text-right text-base-content/70">
                  Question {currentQuestion.id} of {answers.length}
                </p>
              </div>

              {warning && (
                <div className="alert alert-warning shadow-md mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="font-medium text-sm">
                      Some questions are unanswered. Submit anyway?
                    </span>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={handleBackTo}
                    >
                      Go to unanswered
                    </button>
                    <button
                      className="btn btn-sm btn-neutral"
                      onClick={handleSubmitAnyway}
                    >
                      Submit Anyway
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
