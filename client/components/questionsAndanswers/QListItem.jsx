/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AnswersListItem from './AnswersListItem';

export default function QListItem({ question }) {
  const { question_id, question_body, question_helpfulness } = question;

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers`)
      .then(({ data }) => {
        const { results } = data;
        setAnswers(results);
      }).catch((err) => {
        console.log('there was an error getting answers', err);
      });
  }, [question_id]);

  return (
    <div className="question-layout">
      <div className="question">
        <span>
          <h5>
            Q:
            {question_body}
          </h5>
          <span>
            Helpful?
            {' '}
            <a>
              Yes (
              {question_helpfulness}
              ) Add Answer
            </a>
          </span>
        </span>
      </div>
      <div className="answer">
        {answers.map((answer) => (
          <AnswersListItem key={answer.answer_id} answer={answer} />
        ))}
      </div>
    </div>
  );
}

QListItem.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question_body: PropTypes.string.isRequired,
    question_date: PropTypes.string.isRequired,
    asker_name: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
    reported: PropTypes.bool.isRequired,
  }).isRequired,
};
