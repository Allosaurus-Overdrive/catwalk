/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import axios from 'axios';
import PhotoDisplay from './PhotoDisplay';

export default function AnswersListItem({ answer, refresh }) {
  const {
    answer_id,
    body,
    answerer_name,
    date,
    helpfulness,
    photos,
  } = answer;

  const [helpClick, setHelpClick] = useState(false);
  const [reportClick, setReportClick] = useState(false);

  function handleHelpClick(e) {
    e.preventDefault();

    axios.put(`/qa/answers/${answer_id}/helpful`)
      .then(() => {
        console.log('NO CONTENT');
        refresh();
      }).catch((err) => {
        console.log('error updating helpfulness for answer', err);
      });
  }

  function handleReportClick(e) {
    e.preventDefault();

    axios.put(`/qa/answers/${answer_id}/report`)
      .then(() => {
        console.log('ANSWER REPORTED');
        refresh();
      }).catch((err) => {
        console.log('error reporting answer', err);
      });
  }

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
          {' '}
          <Moment format="MMMM DD, YYYY">{date}</Moment>
        </span>
        {' '}
        <span>
          Helpful?
        </span>
        <button
          type="button"
          onClick={(e) => { handleHelpClick(e); setHelpClick(true); }}
          disabled={helpClick === true}
        >
          Yes(
          {helpfulness}
          )
        </button>
        <button
          type="button"
          onClick={(e) => { handleReportClick(e); setReportClick(true); }}
          disabled={reportClick === true}
        >
          Report
        </button>
        <PhotoDisplay photos={photos} />
      </div>
    </div>
  );
}

AnswersListItem.propTypes = {
  refresh: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    answer_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
