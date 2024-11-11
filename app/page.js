/** @format */

"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import LevelTwo from "./components/LevelTwo";
import LevelThree from "./components/LevelThree";
import LevelFour from "./components/LevelFour";
import LevelOne from "./components/LevelOne";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  // -------------------
  const [isActive, setIsActive] = useState(false);
  // -------------------
  const [showLevelOne, setShowLevelOne] = useState(false);
  const [showLevelTwo, setShowLevelTwo] = useState(false);
  const [showLevelThree, setShowLevelThree] = useState(false);
  const [showLevelFour, setShowLevelFour] = useState(false);
  // --------------------------------
  const [showMenu, setShowMenu] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [startLevelOne, setStartLevelOne] = useState(false);
  const [startLevelTwo, setStartLevelTwo] = useState(false);
  const [startLevelThree, setStartLevelThree] = useState(false);
  const [startLevelFour, setStartLevelFour] = useState(false);
  // ------------------------------------------------------------
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showAnswerIsWrong, setShowAnswerIsWrong] = useState(false);
  // ------------------------------------------------------------

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  //---------------------------
  const startTimer = () => {
    setIsActive(true);
    playAudio();
  };
  const showAnswer = () => {
    setShowCorrectAnswer(true);
    setShowAnswerIsWrong(false);
    playAudioCorrect();
    pauseAndResetAudio();
  };
  const answerIsWrong = () => {
    setShowAnswerIsWrong(true);
    setShowCorrectAnswer(false);
    playAudioWrong();
    pauseAndResetAudio();
  };
  const levelOne = () => {
    setStartLevelOne(true);
  };
  const levelTwo = () => {
    setStartLevelTwo(true);
  };
  const levelThree = () => {
    setStartLevelThree(true);
  };
  const levelFour = () => {
    setStartLevelFour(true);
  };

  //---------------------------

  const reset = () => {
    //--------------------------
    setShowStartScreen(true);
    setIsActive(false);
    setShowCorrectAnswer(false);
    setIsTimeFinished(false);
    //--------------------------
    setStartLevelOne(false);
    setStartLevelTwo(false);
    setStartLevelThree(false);
    setStartLevelFour(false);
    //--------------------------
    setShowLevelOne(false);
    setShowLevelTwo(false);
    setShowLevelThree(false);
    setShowLevelFour(false);
    // --------------------------
    setSelectedOption("");
    setLockOption("");
    setQuestionIndex(0);
    setShowCorrect(false);
    setShowWrong(false);
    setPauseAnimation(false);
    setShowCorrectAnswer(false);
    setShowAnswerIsWrong(false);
    pauseAndResetAudio();
  };
  const proceedLevelOne = () => {
    setShowStartScreen(false);
    setIsActive(false);
    setShowLevelOne(true);
    setStartLevelOne(false);
    setShowLevelTwo(false);
    setShowLevelThree(false);
    setShowLevelFour(false);
    setStartLevelTwo(false);
    setShowCorrectAnswer(false);
    setShowAnswerIsWrong(false);
  };
  const proceedLevelTwo = () => {
    setShowStartScreen(false);
    setIsActive(false);
    setStartLevelOne(false);
    setShowLevelOne(false);
    setShowLevelTwo(true);
    setShowLevelThree(false);
    setShowLevelFour(false);
    setStartLevelTwo(false);
    setShowCorrectAnswer(false);
    setShowAnswerIsWrong(false);
  };
  const proceedLevelThree = () => {
    setShowStartScreen(false);
    setIsActive(false);
    setStartLevelOne(false);
    setShowLevelOne(false);
    setShowLevelTwo(false);
    setShowLevelThree(true);
    setShowLevelFour(false);
    setStartLevelTwo(false);
    setShowCorrectAnswer(false);
    setShowAnswerIsWrong(false);
  };
  const proceedLevelFour = () => {
    setShowStartScreen(false);
    setIsActive(false);
    setShowCorrect(false);
    setStartLevelOne(false);
    setShowLevelOne(false);
    setShowLevelTwo(false);
    setShowLevelThree(false);
    setShowLevelFour(true);
    setStartLevelTwo(false);
    setShowLevelThree(false);
    setPauseAnimation(false);
    setShowCorrectAnswer(false);
    setShowAnswerIsWrong(false);
  };
  // ----------------------------

  const [selectedOption, setSelectedOption] = useState("");
  const [lockOption, setLockOption] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  //------------------------
  // const [test, setTest] = useState(false);
  const [isTimeFinished, setIsTimeFinished] = useState(false);
  const [pauseAnimation, setPauseAnimation] = useState(false);

  const data = [
    {
      question: "1 + 1 = ?",
      correctAnswer: "B",
      answers: [
        { label: "A", value: 1 },
        { label: "B", value: 2 },
        { label: "C", value: 3 },
        { label: "D", value: 4 },
      ],
    },
    {
      question: "2 + 3 = ?",
      correctAnswer: "C",
      answers: [
        { label: "A", value: 4 },
        { label: "B", value: 6 },
        { label: "C", value: 5 },
        { label: "D", value: 7 },
      ],
    },
  ];

  const currentQuestion = data[questionIndex];

  const handleLockChange = (event) => {
    setLockOption(event.target.value);
    setSelectedOption("");
    setShowCorrect(false);
    setShowWrong(false);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    resetSelections();
  };

  const handlePreviousQuestion = () => {
    setQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    resetSelections();
  };

  const resetSelections = () => {
    setShowCorrectAnswer(false);
    setPauseAnimation(true);
    setIsTimeFinished(false);
    setSelectedOption("");
    setLockOption("");
    setShowCorrect(false);
    setShowWrong(false);
    setIsActive(false);
    setShowAnswerIsWrong(false);
  };
  // ----------------------------
  const audioRef = useRef(null);
  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sound.wav"); // Initialize the audio only once
    }
    audioRef.current.play();
  };
  const pauseAndResetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
    }
  };
  const playAudioCorrect = () => {
    const audio = new Audio("/correct.wav"); // path to your audio file in public folder
    audio.play();
  };
  const playAudioWrong = () => {
    const audio = new Audio("/wrong.wav"); // path to your audio file in public folder
    audio.play();
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <button
        className="bg-white text-black py-2 px-4 rounded-full active:scale-90 transition absolute z-10 top-5 right-6"
        onClick={toggleMenu}>
        {showMenu ? "X" : "V"}
      </button>
      {showMenu && (
        <div className="bg-white absolute z-30 top-10 right-10 w-64 h-fit p-4 rounded-lg flex flex-col gap-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={reset}>
            Reset
          </button>
          <div className="w-full h-px bg-black"></div>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={startTimer}>
            Start Timer
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={showAnswer}>
            Correct Answer
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={answerIsWrong}>
            Wrong Answer
          </button>
          <div className="w-full h-px bg-black"></div>
          <button
            className="bg-green-700 text-white px-6 py-2 rounded-full"
            onClick={proceedLevelOne}>
            Proceed to Level 1
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={levelOne}>
            Start Level 1
          </button>
          <button
            className="bg-green-700 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={proceedLevelTwo}>
            Proceed to Level 2
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={levelTwo}>
            Start Level 2
          </button>
          <button
            className="bg-green-700 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={proceedLevelThree}>
            Proceed to Level 3
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={levelThree}>
            Start Level 3
          </button>
          <button
            className="bg-green-700 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={proceedLevelFour}>
            Proceed to Level 4
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
            onClick={levelFour}>
            Start Level 4
          </button>
        </div>
      )}

      {/*  Start the game */}

      {showStartScreen && (
        <Image
          src={"/images/start_screen.png"}
          width={1200}
          height={1200}
          alt="main image"
          className="image-scaleUp-animation"
        />
      )}

      <>
        {showLevelOne && (
          <LevelOne
            isActive={isActive}
            levelOne={startLevelOne}
            showAnswer={showCorrectAnswer}
            isWrong={showAnswerIsWrong}
          />
        )}
        {showLevelTwo && (
          <LevelTwo
            isActive={isActive}
            levelTwo={startLevelTwo}
            showAnswer={showCorrectAnswer}
            isWrong={showAnswerIsWrong}
          />
        )}

        {showLevelThree && (
          <LevelThree
            isActive={isActive}
            levelThree={startLevelThree}
            showAnswer={showCorrectAnswer}
            isWrong={showAnswerIsWrong}
          />
        )}

        {showLevelFour && (
          <>
            <div className="bg-white absolute top-10 left-10 w-64 h-fit p-4 rounded-lg flex flex-col gap-4">
              <select
                name="lock"
                id="lock"
                onChange={handleLockChange}
                className="border-2 rounded-lg px-4">
                <option value="">Lock option</option>
                {currentQuestion.answers.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
                onClick={handleNextQuestion}>
                Next Question
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-full active:scale-90 transition"
                onClick={handlePreviousQuestion}>
                Previous Question
              </button>
            </div>
            <LevelFour
              isActive={isActive}
              showAnswer={showCorrectAnswer}
              levelFour={startLevelFour}
              currentQuestion={currentQuestion}
              selectedOption={selectedOption}
              showCorrect={showCorrect}
              showWrong={showWrong}
              lockOption={lockOption}
              questionIndex={data[questionIndex]}
              setLockOption={setLockOption}
              isTimeFinished={isTimeFinished}
              setIsTimeFinished={setIsTimeFinished} // Pass the setter as a prop
              pauseAnimation={pauseAnimation}
              isWrong={showAnswerIsWrong}
            />
          </>
        )}
      </>
    </div>
  );
}
