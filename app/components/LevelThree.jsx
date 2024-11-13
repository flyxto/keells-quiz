/** @format */

import React, { useState } from "react";
import Timer from "./Timer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const question = "1 + 1 = ?";
const answer = "2";

export default function LevelTwo({
  isActive,
  levelThree,
  showAnswer,
  isWrong,
}) {
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
                  levelThree && "image-scaleDown-MoveUp"
                }`}
                onAnimationEnd={handleImageAnimationEnd}
              />
              {levelThree && imageAnimationFinished && (
                <>
                  <div className="bg-white w-96 h-96 rounded-[40px] p-2 mt-10 appearAnimation">
                    <div className=" border-4 border-green-600 w-full h-full rounded-[38px] flex justify-center items-center text-center">
                      <Image
                        src={"/images/half_image.png"}
                        width={300}
                        height={300}
                        alt="level 2 image"
                        className="self-center"
                      />
                    </div>
                  </div>
                  <Timer
                    isActive={isActive}
                    onTimeFinished={handleTimeFinished} // Pass callback to handle when the timer finishes
                    appearDelay={2}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex w-screen px-20 items-center gap-20">
                <div className="bg-white h-1 w-full rounded-full"></div>
                <h1 className="text-white text-9xl font-semibold w-full text-center whitespace-nowrap shake">
                  Time`s Up
                </h1>
                <div className="bg-white h-1 w-full rounded-full"></div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {showAnswer ? (
            <>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="w-screen flex flex-col items-center">
                  <div className="absolute flex flex-col justify-center items-center text-center gap-12">
                    <div className="flex w-screen px-20 items-center gap-20 -translate-y-20">
                      <div className="bg-white h-1 w-full rounded-full"></div>
                      <h1 className="text-white text-7xl font-semibold w-full text-center whitespace-nowrap shake">
                        Correct Answer is
                      </h1>
                      <div className="bg-white h-1 w-full rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute z-10 bg-white w-96 h-96 rounded-[40px] p-2 mt-10">
                    <div className=" border-4 border-green-600 w-full h-full rounded-[38px] flex justify-center items-center text-center">
                      <Image
                        src={"/images/full_image.png"}
                        width={300}
                        height={300}
                        alt="level 2 image"
                        className="self-center"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="bg-white w-96 h-96 rounded-[40px] p-2 mt-10 ">
                <div className=" border-4 border-green-600 w-full h-full rounded-[38px] flex justify-center items-center text-center">
                  <Image
                    src={"/images/half_image.png"}
                    width={300}
                    height={300}
                    alt="level 2 image"
                    className="self-center"
                  />
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
                  transition={{ delay: 4 }}
                  className="flex-col items-center">
                  <div className="absolute flex flex-col justify-center items-center text-center gap-12">
                    <div className="flex w-screen px-20 items-center gap-20 -translate-y-20">
                      <div className="bg-white h-1 w-full rounded-full"></div>
                      <h1 className="text-white text-7xl font-semibold w-full text-center whitespace-nowrap shake">
                        Correct Answer is
                      </h1>
                      <div className="bg-white h-1 w-full rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute z-10 bg-white w-96 h-96 rounded-[40px] p-2 mt-10">
                    <div className=" border-4 border-green-600 w-full h-full rounded-[38px] flex justify-center items-center text-center">
                      <Image
                        src={"/images/full_image.png"}
                        width={300}
                        height={300}
                        alt="level 2 image"
                        className="self-center"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, display: "none" }}
                  animate={{ opacity: 1, display: "block" }}
                  transition={{ delay: 3 }}
                  className="bg-white w-96 h-96 rounded-[40px] p-2 mt-10 ">
                  <div className=" border-4 border-green-600 w-full h-full rounded-[38px] flex justify-center items-center text-center">
                    <Image
                      src={"/images/half_image.png"}
                      width={300}
                      height={300}
                      alt="level 2 image"
                      className="self-center"
                    />
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
