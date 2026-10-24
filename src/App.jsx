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

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const answeredQuestions = answers.filter((answer) => answer !== "").length;

  const percentageAnsweredQuestions = Math.floor(
    (answeredQuestions / answers.length) * 100,
  );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">
          Quiz App
        </h1>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body gap-6">
            <div className="bg-base-200 p-4 rounded-box">
              <h2 className="text-lg font-semibold mb-2">Quiz Progress</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span>
                    {`${answeredQuestions}/${answers.length}`}{" "}
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
                    <br />
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
                <button
                  className="btn btn-primary"
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === sampleData.length - 1}
                >
                  Next
                </button>
              </div>
              <p className="text-sm font-medium text-right text-base-content/70">
                Question {currentQuestion.id} of {sampleData.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
