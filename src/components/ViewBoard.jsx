import { sampleData } from "../data/sampleData";

export default function ViewBoard({
  correctCount,
  incorrectCount,
  unAnsweredCount,
  scorePercentage,
}) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md mx-auto">
      <div className="card-body items-center text-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-base-content/70">Your Score</h2>
          <div className="text-5xl font-extrabold text-primary my-2">
            {scorePercentage}%
          </div>
          <p className="text-xs text-base-content/60">
            Based on {sampleData.length} total questions
          </p>
        </div>

        <div className="w-full space-y-1">
          <div className="flex justify-between text-xs font-medium text-base-content/70">
            <span>Correct Answers</span>
            <span>
              {correctCount}/{sampleData.length}
            </span>
          </div>
          <progress
            className="progress progress-primary w-full h-3"
            value={correctCount}
            max={sampleData.length}
          ></progress>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full my-2">
          <div className="bg-success/10 border border-success/20 p-3 rounded-box flex flex-col items-center">
            <span className="text-xs text-success font-semibold uppercase tracking-wider">
              Correct
            </span>
            <span className="text-2xl font-bold text-success mt-1">
              {correctCount}
            </span>
          </div>

          <div className="bg-error/10 border border-error/20 p-3 rounded-box flex flex-col items-center">
            <span className="text-xs text-error font-semibold uppercase tracking-wider">
              Incorrect
            </span>
            <span className="text-2xl font-bold text-error mt-1">
              {incorrectCount}
            </span>
          </div>

          <div className="bg-warning/10 border border-warning/20 p-3 rounded-box flex flex-col items-center">
            <span className="text-xs text-warning-content font-semibold uppercase tracking-wider">
              Unanswered
            </span>
            <span className="text-2xl font-bold text-warning-content mt-1">
              {unAnsweredCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
