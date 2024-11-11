/** @format */

import { useState, useEffect } from "react";

export default function ProgressBar({ loaderColor, borderColor }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000; // Total duration in milliseconds
    const intervalDuration = 25; // Interval duration in milliseconds
    const increment = (intervalDuration / totalDuration) * 100; // Calculate increment percentage

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + increment; // Apply calculated increment
      });
    }, intervalDuration);

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className={`border-4 ${borderColor} rounded-full p-3`}>
      <div className="w-[1200px] bg-green-500 rounded-full">
        <div
          className={`${loaderColor} h-5 rounded-full transition-width duration-100 ease-linear`}
          style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
