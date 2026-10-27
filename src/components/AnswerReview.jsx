import { sampleData } from "../data/sampleData";

export default function AnswerReview({ answers }) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-2xl mx-auto">
      <div className="card-body gap-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Answer Review</h1>
          <p className="text-sm text-base-content/70">
            Question-by-question breakdown
          </p>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {sampleData.map((data, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === data.correctAnswer;
            const isUnanswered = userAnswer === "" || userAnswer === undefined;

            return (
              <div
                key={data.id}
                className={`p-4 rounded-box border transition-colors ${
                  isUnanswered
                    ? "border-warning/30 bg-warning/5"
                    : isCorrect
                      ? "border-success/30 bg-success/5"
                      : "border-error/30 bg-error/5"
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <p className="font-semibold text-base">
                    <span className="mr-2 text-primary">{index + 1}.</span>
                    {data.question}
                  </p>
                  <span
                    className={`badge badge-sm font-medium shrink-0 ${
                      isUnanswered
                        ? "badge-warning"
                        : isCorrect
                          ? "badge-success text-success-content"
                          : "badge-error text-error-content"
                    }`}
                  >
                    {isUnanswered
                      ? "Unanswered"
                      : isCorrect
                        ? "Correct"
                        : "Incorrect"}
                  </span>
                </div>

                <div className="text-sm space-y-1 mt-3 pl-4 border-l-2 border-base-300">
                  <p className="text-base-content/80">
                    <span className="font-medium">Your Answer:</span>{" "}
                    <span
                      className={
                        isCorrect
                          ? "text-success font-semibold"
                          : isUnanswered
                            ? "text-warning-content italic"
                            : "text-error font-semibold"
                      }
                    >
                      {userAnswer || "None"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="text-base-content/80">
                      <span className="font-medium">Correct Answer:</span>{" "}
                      <span className="text-success font-semibold">
                        {data.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
