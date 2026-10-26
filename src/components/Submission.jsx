import ViewBoard from "./ViewBoard";

export default function Submission({ viewBoard, onViewBoard }) {
  return (
    <div>
      {viewBoard ? (
        <ViewBoard />
      ) : (
        <div className="hero min-h-[50vh] bg-base-200 rounded-box p-6">
          <div className="hero-content text-center">
            <div className="max-w-md card bg-base-100 shadow-xl p-8 border border-base-300">
              <div className="flex justify-center mb-4">
                <div className="avatar placeholder">
                  <div className="bg-success text-success-content w-16 rounded-full">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              </div>

              <div className="alert alert-success shadow-sm mb-6 flex justify-center">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold">
                  Quiz Submitted Successfully!
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight mb-2">
                Thank you for participating!
              </h2>
              <p className="text-base-content/70 mb-6 text-sm">
                Your responses have been recorded. You can now close this window
                or review your overall performance dashboard.
              </p>

              <div className="card-actions justify-center gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary btn-sm md:btn-md"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={onViewBoard}
                  className="btn btn-outline btn-sm md:btn-md"
                >
                  View Scoreboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
