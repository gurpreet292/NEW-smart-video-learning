import React, { useState, useEffect } from 'react';
import { FiAward, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { quizService } from '../../services/api';
import { toast } from 'react-toastify';
import { getScoreColor } from '../../utils/helpers';
import './Quiz.css';

const Quiz = ({ videoId }) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const fetchQuiz = async () => {
    try {
      const response = await quizService.getQuizByVideoId(videoId);
      setQuiz(response.data.quiz);
      setStartTime(Date.now());
    } catch (error) {
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (submitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    
    if (answeredCount < quiz.totalQuestions) {
      toast.warning(`Please answer all ${quiz.totalQuestions} questions`);
      return;
    }

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const answers = Object.entries(selectedAnswers).map(([questionIndex, selectedAnswer]) => ({
      questionIndex: parseInt(questionIndex),
      selectedAnswer
    }));

    try {
      const response = await quizService.submitQuiz(quiz.id, answers, timeTaken);
      setResults(response.data);
      setSubmitted(true);
      toast.success(`Quiz completed! Score: ${response.data.score}%`);
    } catch (error) {
      toast.error('Failed to submit quiz');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResults(null);
    setCurrentQuestion(0);
    setStartTime(Date.now());
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="spinner"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-error">
        <p>No quiz available for this video</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <FiAward className="quiz-icon" />
        <h3>Knowledge Quiz</h3>
        <span className="quiz-count">{quiz.totalQuestions} Questions</span>
      </div>

      {submitted && results && (
        <div className="quiz-results">
          <div className="results-header">
            <h4>Quiz Results</h4>
            <div
              className="score-badge"
              style={{ backgroundColor: getScoreColor(results.percentage) }}
            >
              {results.score}%
            </div>
          </div>
          <p className="results-summary">
            You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly!
          </p>
          <button onClick={handleRetake} className="retake-btn">
            Retake Quiz
          </button>
        </div>
      )}

      <div className="questions-container">
        {quiz.questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className={`question-card ${qIndex === currentQuestion ? 'active' : ''}`}
          >
            <div className="question-header">
              <span className="question-number">Question {qIndex + 1}</span>
              {question.difficulty && (
                <span className={`difficulty-badge ${question.difficulty}`}>
                  {question.difficulty}
                </span>
              )}
            </div>

            <h4 className="question-text">{question.question}</h4>

            <div className="options-grid">
              {question.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = results?.answers[qIndex]?.correctAnswer === oIndex;
                const isUserAnswer = results?.answers[qIndex]?.selectedAnswer === oIndex;
                const showResult = submitted && results;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswerSelect(qIndex, oIndex)}
                    className={`option-btn ${isSelected ? 'selected' : ''} ${
                      showResult
                        ? isCorrect
                          ? 'correct'
                          : isUserAnswer
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                    disabled={submitted}
                  >
                    <span className="option-label">{String.fromCharCode(65 + oIndex)}</span>
                    <span className="option-text">{option}</span>
                    {showResult && isCorrect && <FiCheckCircle className="result-icon" />}
                    {showResult && isUserAnswer && !isCorrect && (
                      <FiXCircle className="result-icon" />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && results?.answers[qIndex]?.explanation && (
              <div className="explanation">
                <strong>Explanation:</strong> {results.answers[qIndex].explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="quiz-footer">
          <div className="progress-info">
            Answered: {Object.keys(selectedAnswers).length} / {quiz.totalQuestions}
          </div>
          <button
            onClick={handleSubmit}
            className="submit-quiz-btn"
            disabled={Object.keys(selectedAnswers).length < quiz.totalQuestions}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
