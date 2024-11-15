/** @format */

import React, { useState } from "react";
import Timer from "./Timer";
import Image from "next/image";
import { motion, animate, AnimatePresence } from "framer-motion";

const question = "1 + 1 = ?";
const answer = "2";

export default function LevelTwo({ isActive, levelTwo, showAnswer, isWrong }) {
  const [isTimeFinished, setIsTimeFinished] = useState(false); // State to track if time is finished
  const [timeRemaining, setTimeRemaining] = useState(5); // Track time remaining
  const [imageAnimationFinished, setImageAnimationFinished] = useState(false);

  const handleImageAnimationEnd = () => {
    setImageAnimationFinished(true);
  };

  // Callback to handle the timer finishing
  const handleTimeFinished = () => {
    setIsTimeFinished(true);
  };

  // Callback to update timeRemaining
  const handleTimeRemainingChange = (newTimeRemaining) => {
    setTimeRemaining(newTimeRemaining);
  };

  return (
    <div className="w-screen flex h-screen justify-center items-center flex-col">
      {!showAnswer && !isWrong ? (
        <>
          {!isTimeFinished ? (
            <>
              <Image
                src={"/images/levelTwo_start_screen.png"}
                width={900}
                height={900}
                alt="level 2 image"
                className={`image-scaleUp-animation ${
                  levelTwo && "image-scaleDown-MoveUp"
                }`}
                onAnimationEnd={handleImageAnimationEnd}
              />
              -
              {imageAnimationFinished && levelTwo && (
                <>
                  <div className="bg-white w-[1000px] h-48 rounded-bl-[40px] rounded-tr-[40px] p-2 appearAnimation">
                    <div className=" border-4 border-green-600 w-full h-full rounded-bl-[38px] rounded-tr-[38px] flex justify-center items-center text-center">
                      <p className="text-6xl font-bold text-green-600">
                        {question}
                      </p>
                    </div>
                  </div>
                  <Timer
                    isActive={isActive}
                    onTimeRemainingChange={handleTimeRemainingChange}
                    onTimeFinished={handleTimeFinished} // Pass callback to handle when the timer finishes
                  />
                </>
              )}
            </>
          ) : (
            <div className="flex w-screen px-20 items-center gap-20">
              <div className="bg-white h-1 w-full rounded-full"></div>
              <h1 className="text-white text-9xl font-semibold w-full text-center whitespace-nowrap shake">
                Time`s Up
              </h1>
              <div className="bg-white h-1 w-full rounded-full"></div>
            </div>
          )}
        </>
      ) : (
        <>
          {showAnswer ? (
            <>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 1, display: "flex" }} // Initially, the component won't take up space
                  animate={{ opacity: 0, display: "none" }} // After animation starts, it will be visible and take space
                  transition={{ delay: 3 }}
                  className="flex w-screen px-20 items-center gap-20 absolute">
                  <div className="bg-white h-1 w-full rounded-full"></div>
                  <h1 className="text-white text-9xl font-semibold w-full text-center whitespace-nowrap answer-scaleUpDown-animation">
                    Yes, You are correct
                  </h1>
                  <div className="bg-white h-1 w-full rounded-full"></div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, display: "none" }} // Initially, the component won't take up space
                  animate={{ opacity: 1, display: "flex" }} // After animation starts, it will be visible and take space
                  transition={{ delay: 3 }}
                  className="flex w-screen px-20 items-center justify-center text-center gap-20 absolute top-52">
                  <div className="bg-white h-1 w-full rounded-full"></div>
                  <h1 className="text-white text-8xl font-semibold   whitespace-nowrap">
                    Answer is
                  </h1>
                  <div className="bg-white h-1 w-full rounded-full"></div>
                </motion.div>
              </AnimatePresence>
              <div
                className="bg-white w-[1000px] h-48 rounded-bl-[40px] rounded-tr-[40px] p-2 fade-in"
                style={{ "--fade-delay": "3.5s" }}>
                <div className=" border-4 border-green-600 w-full h-full rounded-bl-[38px] rounded-tr-[38px] flex justify-center items-center text-center">
                  <p className="text-6xl font-bold text-green-600">{answer}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 1, display: "flex" }} // Initially, the component won't take up space
                  animate={{ opacity: 0, display: "none" }} // After animation starts, it will be visible and take space
                  transition={{ delay: 3 }}
                  className="flex w-screen px-20 items-center gap-20 absolute">
                  <div className="bg-red-500 h-1 w-full rounded-full"></div>
                  <h1 className="text-red-500 text-9xl font-semibold w-full text-center whitespace-nowrap shake">
                    Bad luck
                  </h1>
                  <div className="bg-red-500 h-1 w-full rounded-full"></div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, display: "none" }} // Initially, the component won't take up space
                  animate={{ opacity: 1, display: "flex" }} // After animation starts, it will be visible and take space
                  transition={{ delay: 3 }}
                  className="flex-col items-center">
                  <div className="flex w-screen px-20 items-center gap-20 -translate-y-20">
                    <div className="bg-white h-1 w-full rounded-full"></div>
                    <h1 className="text-white text-7xl font-semibold w-full text-center whitespace-nowrap shake">
                      Correct Answer is
                    </h1>
                    <div className="bg-white h-1 w-full rounded-full"></div>
                  </div>
                  <div
                    className="bg-white w-[1000px] h-48 rounded-bl-[40px] rounded-tr-[40px] p-2 fade-in"
                    style={{ "--fade-delay": "0.5s" }}>
                    <div className=" border-4 border-green-600 w-full h-full rounded-bl-[38px] rounded-tr-[38px] flex justify-center items-center text-center">
                      <p className="text-6xl font-bold text-green-600">
                        {answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </>
      )}
    </div>
  );
}
