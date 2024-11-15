/** @format */

import Image from "next/image";
import React, { useState } from "react";
import Letter from "./Letter";
import Timer from "./Timer";
import WrongAnswer from "./WrongAnswer";
import { motion, AnimatePresence } from "framer-motion";

export default function LevelOne({ levelOne, isActive, showAnswer, isWrong }) {
  const correctWord = "GLOW&HANDSOME";
  const jumbleWord = "WH&NOADSMOGLE";
  const [firstPart, secondPart] = correctWord.split("&");

  const [imageAnimationFinished, setImageAnimationFinished] = useState(false);
  const [isTimeFinished, setIsTimeFinished] = useState(false); // State to track if time is finished

  const handleImageAnimationEnd = () => {
    setImageAnimationFinished(true);
  };

  const handleTimeFinished = () => {
    setIsTimeFinished(true);
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center "bg-green-700 font-custom"`}>
      {!showAnswer && !isWrong ? (
        <>
          {!isTimeFinished ? (
            <>
              <Image
                src={"/images/levelOne_start_screen.png"}
                width={900}
                height={900}
                className={`image-scaleUp-animation ${
                  levelOne && "image-scaleDown-MoveUp"
                }`}
                alt="level 2 image"
                onAnimationEnd={handleImageAnimationEnd}
              />
              {levelOne && imageAnimationFinished && (
                <>
                  <div className="w-[1400px] flex gap-4 flex-wrap items-center justify-center">
                    {jumbleWord.split("").map((char, index) => (
                      <Letter key={index} letter={char} index={index} />
                    ))}
                  </div>

                  <Timer
                    isActive={isActive}
                    onTimeFinished={handleTimeFinished}
                    appearDelay={1}
                  />
                </>
              )}
            </>
          ) : (
            // Out of time DIV
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
                  className="flex w-screen px-20 items-center justify-center text-center gap-20 absolute top-24">
                  <div className="bg-white h-1 w-full rounded-full"></div>
                  <h1 className="text-white text-8xl font-semibold   whitespace-nowrap ">
                    Answer is
                  </h1>
                  <div className="bg-white h-1 w-full rounded-full"></div>
                </motion.div>
              </AnimatePresence>
              {correctWord === "GLOW&HANDSOME" ||
              correctWord === "GLOW&LOVELY" ? (
                <div
                  className="w-[1600px] flex flex-col flex-wrap gap-5 items-center appearAnimation "
                  style={{
                    animationDelay: `${3.5}s`, // Applying the delay
                  }}>
                  {/* Render first line with the `&` included */}
                  <div className="flex gap-4">
                    {firstPart.split("").map((char, index) => (
                      <Letter key={index} letter={char} />
                    ))}
                    <Letter letter="&" /> {/* Manually add the `&` character */}
                  </div>
                  {/* Render second line */}
                  <div className="flex gap-4">
                    {secondPart.split("").map((char, index) => (
                      <Letter key={index} letter={char} />
                    ))}
                  </div>
                </div>
              ) : (
                // Other words

                <div className="w-[1400px] flex justify-center gap-5 flex-wrap items-center appearAnimation">
                  {correctWord.split("").map((char, index) => (
                    <Letter key={index} letter={char} index={index} />
                  ))}
                </div>
              )}
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
                  {correctWord === "GLOW&HANDSOME" ||
                  correctWord === "GLOW&LOVELY" ? (
                    <div className="w-[1600px] flex flex-col flex-wrap gap-5 items-center appearAnimation">
                      {/* Render first line with the `&` included */}
                      <div className="flex gap-4">
                        {firstPart.split("").map((char, index) => (
                          <Letter key={index} letter={char} />
                        ))}
                        <Letter letter="&" />{" "}
                        {/* Manually add the `&` character */}
                      </div>
                      {/* Render second line */}
                      <div className="flex gap-4">
                        {secondPart.split("").map((char, index) => (
                          <Letter key={index} letter={char} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Other words

                    <div className="w-[1400px] flex flex-col gap-5 flex-wrap items-center appearAnimation">
                      {correctWord.split("").map((char, index) => (
                        <Letter key={index} letter={char} index={index} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </>
      )}
    </div>
  );
}
