import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import QListItem from './QListItem';
import AddQuestion from './AddQuestion';

const productId = 20111;

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`/qa/questions/${productId}`)
      .then(({ data }) => {
        const { results } = data;
        setQuestions(results);
      }).catch((err) => {
        console.log('there was an error with the request', err);
      });
  }, [productId]);

  return (
    <div>
      <h4>Questions + Answers</h4>
      <div>
        <Search />
      </div>
      <div className="Questions-list">
        {questions.map((result) => (
          <QListItem key={result.question_id} question={result} />
        ))}
      </div>
      <div className="more-questions">
        <button type="button">More Answered Questions</button>
        {' '}
        <AddQuestion />
      </div>
    </div>
  );
}
