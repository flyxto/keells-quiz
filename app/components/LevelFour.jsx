/** @format */

/** @format */

import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import PulsatingButton from "@/components/ui/pulsating-button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LevelFour({
  isActive,
  showAnswer,
  levelFour,
  currentQuestion,
  showCorrect,
  showWrong,
  lockOption,
  questionIndex,
  setLockOption,
  isTimeFinished,
  setIsTimeFinished,
  pauseAnimation,
  isWrong,
}) {
  // const [isTimeFinished, setIsTimeFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [imageAnimationFinished, setImageAnimationFinished] = useState(false);
  //----------------------------------------------------
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  const selectedOption = "";

  const handleImageAnimationEnd = () => {
    setImageAnimationFinished(true);
  };

  const handleTimeFinished = () => {
    setIsTimeFinished(true);
  };

  const handleTimeRemainingChange = (newTimeRemaining) => {
    setTimeRemaining(newTimeRemaining);
  };

  useEffect(() => {
    if (showAnswer) {
      // Reset the lockOption after time finishes
      setLockOption(false);
    }
  }, [showAnswer, setLockOption]);

  return (
    <div
      className={`w-screen flex flex-col h-screen /bg-green-800
      } justify-center items-center`}>
      {!showAnswer && !isWrong ? (
        <>
          {!isTimeFinished ? (
            <>
              <Image
                src={"/images/levelThree_start_screen.png"}
                width={900}
                height={900}
                alt="level 2 image"
                className={`${
                  !pauseAnimation ? "image-scaleUp-animation" : "hidden"
                } ${levelFour && !pauseAnimation ? "scale-down-fade-out" : ""}`}
                onAnimationEnd={handleImageAnimationEnd}
              />

              {levelFour && imageAnimationFinished && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, display: "none" }} // Initially, the component won't take up space
                    animate={{ opacity: 1, display: "flex" }} // After animation starts, it will be visible and take space
                    transition={{ delay: 1 }} // Fade-in starts after 2 seconds
                    className="flex flex-col justify-center items-center">
                    <div className="translate-y-28 ">
                      <div className="bg-white w-[1000px] h-48 rounded-bl-[40px] rounded-tr-[40px] p-2 mt-10 -translate-y-48">
                        <div className="border-4 border-green-600 w-full h-full rounded-bl-[38px] rounded-tr-[38px] flex justify-center items-center text-center ">
                          <p className="text-6xl font-bold text-green-600">
                            {currentQuestion.question}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-40 gap-y-10 w-[1000px] justify-between -translate-y-36 text-3xl font-bold text-green-600">
                        {currentQuestion.answers.map((option) => {
                          const isCorrectAnswer =
                            showCorrect &&
                            option.label === currentQuestion.correctAnswer;
                          const isWrongAnswer =
                            showWrong && option.label === lockOption;

                          // If time is finished, show the correct answer with a green background
                          const bgColor = isTimeFinished
                            ? option.label === currentQuestion.correctAnswer
                              ? "bg-green-500"
                              : "bg-white"
                            : isCorrectAnswer
                            ? "bg-green-500"
                            : isWrongAnswer
                            ? "bg-red-500"
                            : selectedOption === option.label
                            ? "bg-green-600"
                            : lockOption === option.label
                            ? "bg-transparent"
                            : "bg-white";

                          const textColor =
                            isCorrectAnswer || isWrongAnswer
                              ? "text-white"
                              : selectedOption === option.label
                              ? "text-white"
                              : "text-green-600";

                          return (
                            <div
                              key={option.label}
                              className={`w-96 h-20 ${bgColor} rounded-bl-[24px] rounded-tr-[24px] ${
                                lockOption === option.label
                                  ? "bg-transparent rounded-[24px]"
                                  : "bg-white"
                              } p-1 overflow-hidden`}>
                              {lockOption === option.label &&
                              !showCorrect &&
                              !showWrong ? (
                                <PulsatingButton>
                                  {option.label}.{" "}
                                  <span className="pl-12">{option.value}</span>
                                </PulsatingButton>
                              ) : (
                                <>
                                  <div
                                    className={`
                                    } w-full flex items-center px-8 h-full rounded-bl-[20px] rounded-tr-[20px] relative z-10 text-white`}>
                                    {option.label}.{" "}
                                    <span className="pl-16 text-green-600">
                                      {option.value}
                                    </span>
                                  </div>
                                </>
                              )}
                              {lockOption === option.label ? (
                                <></>
                              ) : (
                                <div className="bg-green-600 w-32 h-32  -translate-y-24 -translate-x-12"></div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {!isTimeFinished ? (
                      <Timer
                        key={questionIndex} // This will reset the timer whenever questionIndex changes
                        isActive={isActive}
                        onTimeRemainingChange={handleTimeRemainingChange}
                        onTimeFinished={handleTimeFinished}
                      />
                    ) : (
                      <div className="flex w-screen px-20 items-center gap-20">
                        <div className="bg-white h-1 w-full rounded-full"></div>
                        <h1 className="text-white text-9xl font-semibold w-full text-center whitespace-nowrap shake">
                          Time`s Up
                        </h1>
                        <div className="bg-white h-1 w-full rounded-full"></div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center">
                <div className="translate-y-28">
                  <div className="bg-white w-[1000px] h-48 rounded-bl-[40px] rounded-tr-[40px] p-2 mt-10 -translate-y-48">
                    <div className="border-4 border-green-600 w-full h-full rounded-bl-[38px] rounded-tr-[38px] flex justify-center items-center text-center">
                      <p className="text-6xl font-bold text-green-600">
                        {currentQuestion.question}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-40 gap-y-10 w-[1000px] justify-between -translate-y-36 text-3xl font-bold text-green-600">
                    {currentQuestion.answers.map((option) => {
                      const isCorrectAnswer =
                        isTimeFinished &&
                        option.label === currentQuestion.correctAnswer;
                      const isWrongAnswer =
                        showWrong && option.label === lockOption;

                      // If time is finished, show the correct answer with a green background
                      const bgColor = "bg-white";

                      // Text color logic to ensure correct answers show white text when time is up
                      const textColor = "text-green-600"; // Green text for other options

                      // Border color logic
                      const borderColor = "border-green-600"; // Green border for other options

                      return (
                        <div
                          key={option.label}
                          className={`w-96 h-20 ${
                            lockOption === option.label
                              ? "bg-transparent rounded-[24px]"
                              : "bg-white"
                          } rounded-bl-[24px] rounded-tr-[24px] p-1 overflow-hidden`}>
                          {lockOption === option.label &&
                          !showCorrect &&
                          !showWrong ? (
                            <PulsatingButton>
                              {option.label}.{" "}
                              <span className="pl-12">{option.value}</span>
                            </PulsatingButton>
                          ) : (
                            <>
                              <div
                                className={`
                                    } w-full flex items-center px-8 h-full rounded-bl-[20px] rounded-tr-[20px] relative z-10 text-white`}>
                                {option.label}.{" "}
                                <span className="pl-16 text-green-600">
                                  {option.value}
                                </span>
                              </div>
                            </>
                          )}
                          {lockOption === option.label ? (
                            <></>
                          ) : (
                            <div className="bg-green-600 w-32 h-32  -translate-y-24 -translate-x-12"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 1, display: "flex" }} // Initially, the component won't take up space
                    animate={{ opacity: 0, display: "none" }} // After animation starts, it will be visible and take space
                    transition={{ delay: 5 }}
                    className="flex w-screen px-20 items-center gap-20 absolute bottom-16">
                    <div className="bg-white h-1 w-full rounded-full"></div>
                    <h1 className="text-white text-9xl font-semibold w-full text-center whitespace-nowrap shake">
                      Time`s Up
                    </h1>
                    <div className="bg-white h-1 w-full rounded-full"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, display: "none" }} // Initially, the component won't take up space
                animate={{ opacity: 1, display: "flex" }} // After animation starts, it will be visible and take space
                transition={{ duration: 0.5 }}
                className="flex w-screen px-20 items-center gap-20 absolute top-10">
                <div className="bg-white h-1 w-full rounded-full"></div>
                <h1 className="text-white text-8xl font-semibold w-full text-center whitespace-nowrap shake">
                  {showAnswer ? "Answer is" : "Wrong Answer!"}
                </h1>
                <div className="bg-white h-1 w-full rounded-full"></div>
              </motion.div>
            </AnimatePresence>
            <div className="translate-y-28">
              <div className="bg-white w-[1000px] h-48 rounded-bl-[40px] rounded-tr-[40px] p-2 mt-10 -translate-y-48">
                <div className="border-4 border-green-600 w-full h-full rounded-bl-[38px] rounded-tr-[38px] flex justify-center items-center text-center">
                  <p className="text-6xl font-bold text-green-600">
                    {currentQuestion.question}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-40 gap-y-10 w-[1000px] justify-between -translate-y-36 text-3xl font-bold text-green-600">
                {currentQuestion.answers.map((option) => {
                  const isCorrectAnswer =
                    showCorrect &&
                    option.label === currentQuestion.correctAnswer;
                  const isWrongAnswer = isWrong && option.label === lockOption;

                  // If time is finished, show the correct answer with a green background
                  // Background color logic
                  const bgColor = showAnswer
                    ? // If the answer is shown
                      option.label === currentQuestion.correctAnswer
                      ? "bg-green-600" // Green for correct answer
                      : option.label === lockOption
                      ? "bg-red-500" // Red for wrong answer
                      : "bg-white" // White for other answers
                    : isCorrectAnswer
                    ? "bg-green-500" // Green for correct answer while time is still active
                    : isWrongAnswer
                    ? "bg-red-500" // Red for wrong answer
                    : selectedOption === option.label
                    ? "bg-green-600" // Dark green for selected option
                    : lockOption === option.label
                    ? "bg-transparent" // Transparent for locked options
                    : "bg-white"; // Default background color

                  // Text color logic to ensure correct answers show white text when time is up
                  const textColor =
                    showAnswer && option.label === currentQuestion.correctAnswer
                      ? "text-white" // White text for correct answer when time is up
                      : isCorrectAnswer || isWrongAnswer
                      ? "text-white" // White text for correct or wrong answers
                      : selectedOption === option.label
                      ? "text-white" // White text for selected option
                      : "text-green-600"; // Green text for other options

                  // Border color logic
                  const borderColor =
                    showAnswer && option.label === currentQuestion.correctAnswer
                      ? "border-white" // White border for the correct answer when time is up
                      : isCorrectAnswer || isWrongAnswer
                      ? "border-white" // White border for correct or wrong answers
                      : selectedOption === option.label
                      ? "border-white" // White border for selected option
                      : "border-green-600"; // Green border for other options

                  return (
                    <div
                      key={option.label}
                      className={`w-96 h-20 ${bgColor} rounded-bl-[24px] rounded-tr-[24px] p-1 overflow-hidden ${
                        isWrongAnswer ? "shake" : ""
                      }  ${
                        showAnswer &&
                        option.label === currentQuestion.correctAnswer
                          ? "answer-scaleUpDown-animation"
                          : ""
                      }`}>
                      {lockOption === option.label &&
                      !showCorrect &&
                      !isWrong ? (
                        <PulsatingButton>
                          {option.label}.{" "}
                          <span className="pl-12">{option.value}</span>
                        </PulsatingButton>
                      ) : (
                        <>
                          <div
                            className={` w-full flex items-center px-8 h-full rounded-bl-[20px] rounded-tr-[20px] relative z-10 text-white`}>
                            {option.label}.{" "}
                            <span
                              className={`pl-16 text-green-600 ${textColor}`}>
                              {option.value}
                            </span>
                          </div>
                        </>
                      )}
                      {!isWrongAnswer ? (
                        <div className="bg-green-600 w-32 h-32  -translate-y-24 -translate-x-12"></div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
