import { useState, useEffect } from 'react';
import './App.css';
import Description from './components/Description';
import Options from './components/Options';
import Feedback from './components/Feedback';
import Notification from './components/Notification';

function App() {
  const defaultFeedback = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const getStoredFeedback = () => {
    const stored = localStorage.getItem('feedback');
    return stored ? JSON.parse(stored) : defaultFeedback;
  };

  const [feedback, setFeedback] = useState(getStoredFeedback);


  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback(defaultFeedback);
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <>
      <Description />
      <Options
        options={Object.keys(feedback)}
        onLeaveFeedback={updateFeedback}
        showReset={totalFeedback > 0}
        onReset={resetFeedback}
      />
      {totalFeedback === 0 ? (
        <Notification message="No feedback yet." />
      ) : (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      )}
    </>
  );
}

export default App;
