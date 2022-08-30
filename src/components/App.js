import React, { Component } from 'react';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';

class App extends Component {
  state = { good: 0, neutral: 0, bad: 0 };

  onBtnClick = e => {
    const value = e.target.id;
    this.setState(prevState => {
      return {
        [`${value}`]: prevState[`${value}`] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;

    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    const positive = ((good / total) * 100).toFixed(2);
    return positive;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();

    return (
      <div>
        <div style={{ width: 300, margin: '0 auto', textAlign: 'center' }}>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(this.state)}
              onLeaveFeedback={this.onBtnClick}
            />
          </Section>
          {total ? (
            <Section title="Statistics">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback}
                positivePercentage={this.countPositiveFeedbackPercentage}
              ></Statistics>
            </Section>
          ) : (
            <Notification message="There is no feedback" />
          )}
        </div>
      </div>
    );
  }
}

export default App;
