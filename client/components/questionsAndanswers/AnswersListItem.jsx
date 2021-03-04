/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import PhotoDisplay from './PhotoDisplay';

export default function AnswersListItem({ answer }) {
  const {
    answer_id,
    body,
    answerer_name,
    date,
    helpfulness,
    photos,
  } = answer;

  return (
    <div key={answer_id}>
      <p>
        A:
        {body}
      </p>
      <div>
        <span>
          By
          {answerer_name}
          ,
          {date}
        </span>
        {' '}
        <span>
          Helpful? Yes(
          {helpfulness}
          ) Report
        </span>
        <PhotoDisplay photos={photos} />
      </div>
    </div>
  );
}

AnswersListItem.propTypes = {
  answer: PropTypes.shape({
    answer_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
