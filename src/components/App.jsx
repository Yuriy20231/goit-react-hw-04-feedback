import { useState } from 'react';
import { Notification } from './Notification/Notification';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOption/FeedbackOption';
import { Section } from './Section/Section';
import css from './App.module.css';
export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const leaveFeedback = option => {
    if (option === 'good') setGood(prev => prev + 1);
    if (option === 'neutral') setNeutral(prev => prev + 1);
    if (option === 'bad') setBad(prev => prev + 1);
  };

  const countTotalFeedback = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return Math.floor((good / (good + neutral + bad)) * 100 || 0);
  };

  return (
    <div className={css.container}>
      <Section title="Please Leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={leaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};