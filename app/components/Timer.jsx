/** @format */

import { useState, useEffect } from "react";

function Timer({ isActive, onTimeRemainingChange, onTimeFinished, appearDelay }) {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10); // Start countdown from 10 seconds

  useEffect(() => {
    if (!isActive) return;

    const duration = 10 * 1000; // 10 seconds in milliseconds
    const interval = 50; // Update interval in milliseconds

    let startTime = Date.now();

    const timer = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const newProgress = (timeElapsed / duration) * 100;
      const newTimeRemaining = Math.ceil(10 - timeElapsed / 1000); // Countdown from 10 seconds

      if (newProgress >= 100 || newTimeRemaining <= 0) {
        setProgress(100);
        setTimeRemaining(0);
        clearInterval(timer);
        if (onTimeFinished) {
          onTimeFinished(); // Notify parent when the timer finishes
        }
      } else {
        setProgress(newProgress);
        setTimeRemaining(newTimeRemaining);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isActive]);

  // Pass timeRemaining to the parent via the callback
  useEffect(() => {
    if (onTimeRemainingChange) {
      onTimeRemainingChange(timeRemaining); // Pass timeRemaining to the parent
    }
  }, [timeRemaining, onTimeRemainingChange]);

  return (
    <div
      className="w-[1200px] absolute bottom-10 fade-in " style={{ "--fade-delay": `${appearDelay}s` }}>
      <div className="w-full border-4 border-white rounded-full p-3">
        <div className="h-4 w-full bg-green-500 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-white transition-all duration-100 rounded-full"
          />
        </div>
      </div>
      <div className="text-center uppercase text-white mt-4">
        <p className="text-2xl font-semibold">
          You have{" "}
          <span className="text-5xl mx-4 font-bold">{timeRemaining}</span>{" "}
          seconds
        </p>
      </div>
    </div>
  );
}

export default Timer;
