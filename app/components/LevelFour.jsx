/** @format */

/** @format */

import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import PulsatingButton from "@/components/ui/pulsating-button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import WrongAnswer from "./WrongAnswer";

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

  // -----------------------------------------------------

  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showYouAreCorrect, setShowYouAreCorrect] = useState(false);
  const [showCorrectAnswerTwo, setShowCorrectAnswerTwo] = useState(false);

  useEffect(() => {
    if (isWrong) {
      setShowWrongAnswer(true); // Show wrong answer
      const timer = setTimeout(() => {
        setShowWrongAnswer(false); // Hide wrong answer after 2 seconds
        setShowCorrectAnswer(true); // Show correct answer after 2 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout if needed
    }
  }, [isWrong]);

  useEffect(() => {
    if (showAnswer) {
      setShowYouAreCorrect(true); // Show wrong answer
      const timer = setTimeout(() => {
        setShowYouAreCorrect(false); // Hide wrong answer after 2 seconds
        setShowCorrectAnswerTwo(true); // Show correct answer after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout if needed
    }
  }, [showAnswer]);

  // -----------------------------------
  const answerVariant = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
  };
  //-----------------------------------------
  const audio = new Audio("/answer_appearnce.wav");

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
                        {currentQuestion.answers.map((option, index) => {
                          const isCorrectAnswer =
                            showCorrect &&
                            option.label === currentQuestion.correctAnswer;
                          const isWrongAnswer =
                            showWrong && option.label === lockOption;

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
                            <motion.div
                              key={option.label}
                              className={`w-96 h-20 ${bgColor} rounded-bl-[24px] rounded-tr-[24px] ${
                                lockOption === option.label
                                  ? "bg-transparent rounded-[24px]"
                                  : "bg-white"
                              } p-1 overflow-hidden`}
                              initial="hidden"
                              animate="visible"
                              variants={answerVariant}
                              transition={{
                                delay: index === 0 ? 3 : 3 + index * 1,
                                duration: 0.5,
                              }}
                              onAnimationComplete={() => {
                                // Play audio each time animation completes for an option
                                audio.currentTime = 0; // Reset to start
                                audio.play();
                              }}>
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
                                    className={`w-full flex items-center px-8 h-full rounded-bl-[20px] rounded-tr-[20px] relative z-10 text-white`}>
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
                                <div className="bg-green-600 w-32 h-32 -translate-y-24 -translate-x-12"></div>
                              )}
                            </motion.div>
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
            <div className="flex justify-center top-0">
              <AnimatePresence>
                {showWrongAnswer && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex w-screen px-20 items-center justify-center z-0 absolute top-10 text-center gap-20">
                    <div className="bg-red-500 h-1 w-full rounded-full"></div>
                    <h1 className="text-red-500 text-8xl font-semibold whitespace-nowrap shake">
                      Bad Luck
                    </h1>
                    <div className="bg-red-500 h-1 w-full rounded-full"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showCorrectAnswer && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex w-screen px-20 items-center justify-center z-0 absolute top-10 text-center gap-20">
                    <div className="bg-white h-1 w-full rounded-full"></div>
                    <h1 className="text-white text-8xl font-semibold whitespace-nowrap">
                      Correct answer is
                    </h1>
                    <div className="bg-white h-1 w-full rounded-full"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {showAnswer && (
                <>
                  <AnimatePresence>
                    {showYouAreCorrect && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex w-screen px-20 items-center justify-center z-0 absolute top-10 text-center gap-20">
                        <div className="bg-white h-1 w-full rounded-full"></div>
                        <h1 className="text-white text-8xl font-semibold whitespace-nowrap">
                          Yes, You are correct
                        </h1>
                        <div className="bg-white h-1 w-full rounded-full"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {showCorrectAnswerTwo && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex w-screen px-20 items-center justify-center z-0 absolute top-10 text-center gap-20">
                        <div className="bg-white h-1 w-full rounded-full"></div>
                        <h1 className="text-white text-8xl font-semibold whitespace-nowrap">
                          Answer is
                        </h1>
                        <div className="bg-white h-1 w-full rounded-full"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

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

                  // Determine background color based on various conditions
                  const bgColor = showAnswer
                    ? option.label === currentQuestion.correctAnswer
                      ? "bg-green-600" // Green for correct answer when time is finished
                      : option.label === lockOption
                      ? "bg-red-500" // Red for wrong answer
                      : "bg-white" // White for other answers
                    : isWrongAnswer
                    ? "bg-red-500" // Red for wrong answer
                    : option.label === currentQuestion.correctAnswer && isWrong
                    ? "bg-green-500" // Blue for correct answer when answer is wrong
                    : selectedOption === option.label
                    ? "bg-green-600" // Dark green for selected option
                    : "bg-white"; // Default background color

                  // Determine text color based on the answer's status
                  const textColor =
                    showAnswer && option.label === currentQuestion.correctAnswer
                      ? "text-white" // White text for correct answer when time is finished
                      : isCorrectAnswer || isWrongAnswer
                      ? "text-white" // White text for correct or wrong answers
                      : selectedOption === option.label
                      ? "text-white" // White text for selected option
                      : "text-green-600"; // Default text color for unselected options

                  // Determine border color based on the answer's status
                  const borderColor =
                    showAnswer && option.label === currentQuestion.correctAnswer
                      ? "border-white" // White border for the correct answer when time is finished
                      : isCorrectAnswer || isWrongAnswer
                      ? "border-white" // White border for correct or wrong answers
                      : selectedOption === option.label
                      ? "border-white" // White border for selected option
                      : "border-green-600"; // Default border color for unselected options

                  return (
                    <div
                      key={option.label}
                      className={`w-96 h-20 ${bgColor} ${borderColor} rounded-bl-[24px] rounded-tr-[24px] p-1 overflow-hidden ${
                        isWrongAnswer ? "shake" : ""
                      } ${
                        showAnswer &&
                        option.label === currentQuestion.correctAnswer
                          ? "answer-scaleUpDown-animation"
                          : ""
                      } ${
                        option.label === currentQuestion.correctAnswer &&
                        isWrong
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
                        <div
                          className={`w-full flex items-center px-8 h-full rounded-bl-[20px] rounded-tr-[20px] relative z-10 text-white `}>
                          {option.label}.{" "}
                          <span
                            className={`pl-16 ${
                              option.label === currentQuestion.correctAnswer &&
                              isWrong
                                ? "text-white"
                                : "text-green-600"
                            }  ${textColor}`}>
                            {option.value}
                          </span>
                        </div>
                      )}
                      {!isWrongAnswer ? (
                        <div
                          className={`${
                            option.label === currentQuestion.correctAnswer &&
                            isWrong
                              ? "bg-green-500"
                              : "bg-green-600"
                          }  w-32 h-32 -translate-y-24 -translate-x-12`}></div>
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
