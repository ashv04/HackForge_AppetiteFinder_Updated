"use client";

import { getRandomQuiz, type QuizQuestion } from "@/lib/quiz-bank";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Circle,
  CircleDot,
} from "lucide-react";
import AppNavbar from "@/components/app-navbar";

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(
    () => getRandomQuiz(5)
  );
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizQuestions.forEach((question, i) => {
      if (answers[i] === question.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleTryAgain = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setQuizQuestions(getRandomQuiz(5));
  };

  const getAnswerStatus = (questionIndex: number, optionIndex: number) => {
    if (!submitted) return null;
    const userAnswer = answers[questionIndex];
    if (optionIndex === quizQuestions[questionIndex].answer) {
      return "correct";
    }
    if (optionIndex === userAnswer && optionIndex !== quizQuestions[questionIndex].answer) {
      return "incorrect";
    }
    return null;
  };

  const allQuestionsAnswered = quizQuestions.every(
    (_, idx) => answers[idx] !== undefined
  );

  const progressPercent =
    (Object.keys(answers).length / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col">
      <AppNavbar />
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full px-4 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl mx-auto pt-10 pb-2 flex flex-col items-center">

            {/* Heading */}
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="inline-flex p-2 rounded-full bg-accent/10">
                  <Trophy className="h-10 w-10 text-accent align-middle" />
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-text-primary pt-1">
                  Knowledge Quiz
                </h1>
              </div>
              <p className="text-lg md:text-xl text-text-secondary font-medium tracking-wide text-center mt-1 mb-7 max-w-md">
                Test your knowledge with these quick questions!
              </p>
            </div>

            {/* Progress */}
            {!submitted && (
              <div className="w-full flex flex-col mb-6">
                <div className="w-full relative flex flex-col">
                  <div className="flex items-center justify-between mb-1 px-1">
                    <span className="text-sm text-text-secondary font-medium">Progress</span>
                    <span className="text-xs text-text-secondary bg-muted rounded-full px-3 py-1 ml-2">
                      {Object.keys(answers).length} of {quizQuestions.length}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div
                      className="bg-accent h-3 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Score */}
            {submitted && (
              <Card className="p-8 w-full bg-background shadow-lg rounded-2xl mb-8 animate-in fade-in-30">
                <div className="flex flex-col items-center justify-center">
                  <Trophy className="h-10 w-10 text-accent mb-3" />
                  <h2 className="font-bold text-2xl md:text-3xl mb-2 text-text-primary">Quiz Complete!</h2>
                  <p className="text-lg md:text-xl font-medium text-text-secondary">
                    Score: <span className="font-bold text-accent">{score}</span> out of {quizQuestions.length}
                  </p>
                </div>
              </Card>
            )}

            {/* Questions */}
            <div className="w-full flex flex-col gap-8">
              {quizQuestions.map((question, index) => (
                <Card
                  key={index}
                  className="p-6 md:p-8 rounded-3xl bg-white shadow-xl border-0 flex flex-col gap-2 transition-shadow duration-300 hover:shadow-2xl animate-in fade-in-25"
                >
                  <h3 className="text-lg md:text-2xl font-semibold text-text-primary mb-5 tracking-tight">
                    Q{index + 1}. {question.question}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {question.choices.map((option, idx) => {
                      const isSelected = answers[index] === idx;
                      const status = getAnswerStatus(index, idx);
                      const base =
                        "group flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 border border-border hover:border-accent hover:bg-accent/10 text-base font-medium select-none";
                      const checked = isSelected && !submitted ? "ring-2 ring-accent bg-accent/10 shadow-accent-sm" : "";
                      const correct = status === "correct" ? "border-green-500 bg-green-50 text-green-700 shadow-green-100" : "";
                      const incorrect = status === "incorrect" ? "border-red-500 bg-red-50 text-red-700 shadow-red-100" : "";

                      return (
                        <label
                          htmlFor={`q-${index}-${idx}`}
                          key={idx}
                          className={`relative ${base} ${checked} ${correct} ${incorrect} ${submitted ? "opacity-90" : "hover:scale-[1.025]"}`}
                          style={{ minHeight: 48 }}
                          tabIndex={0}
                          onClick={() => {
                            if (!submitted) handleAnswerChange(index, idx);
                          }}
                          onKeyDown={e => {
                            if ((e.key === "Enter" || e.key === " ") && !submitted) handleAnswerChange(index, idx);
                          }}
                        >
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-accent">
                            {submitted ? (
                              status === "correct" ? (
                                <CheckCircle className="h-6 w-6 text-green-500" />
                              ) : status === "incorrect" ? (
                                <XCircle className="h-6 w-6 text-red-500" />
                              ) : (
                                <Circle className="h-6 w-6 text-border" />
                              )
                            ) : isSelected ? (
                              <CircleDot className="h-6 w-6 text-accent" />
                            ) : (
                              <Circle className="h-6 w-6 text-border" />
                            )}
                          </span>
                          <span className="flex-1 text-base md:text-lg leading-snug">{option}</span>
                          <input
                            type="radio"
                            className="absolute left-0 top-0 opacity-0 w-full h-full"
                            name={`q-${index}`}
                            value={idx}
                            checked={isSelected}
                            onChange={() => {}}
                            disabled={submitted}
                            aria-checked={isSelected}
                          />
                        </label>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col items-center w-full gap-4">
              {!submitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  size="lg"
                  className="w-full max-w-sm bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 text-lg rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Submit Answers
                </Button>
              ) : (
                <Button
                  onClick={handleTryAgain}
                  size="lg"
                  className="w-full max-w-sm bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 text-lg rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Try Again
                </Button>
              )}
              {!submitted && !allQuestionsAnswered && (
                <p className="text-text-secondary text-sm text-center w-full mt-1">
                  Please answer all questions before submitting
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
