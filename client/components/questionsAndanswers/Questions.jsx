/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import QListItem from './QListItem';
import AddQuestion from './AddQuestion';

const productId = 20111;

export default function Questions({ productOverviewId }) {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`/qa/questions/${productOverviewId}`)
      .then(({ data }) => {
        const { results } = data;
        setQuestions(results);
      }).catch((err) => {
        console.log('there was an error with the request', err);
      });
  }, [productId]);

  function handleSubmit(e) {
    e.preventDefault();

    setSearch('');
  }

  function submitRefresh() {
    axios.get(`/qa/questions/${productOverviewId}`)
      .then(({ data }) => {
        const { results } = data;
        setQuestions(results);
      }).catch((err) => {
        console.log('there was an error with the request', err);
      });
  }

  return (
    <div>
      <h4>Questions + Answers</h4>
      <div>
        <Search
          string={search}
          submitSearch={handleSubmit}
          searchTerm={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="Questions-list">
        {questions.filter((question) => (
          question.question_body.toLowerCase().includes(search.substring(1).toLowerCase())
        )).map((result) => (
          <QListItem key={result.question_id} question={result} refresh={submitRefresh} />
        ))}
      </div>
      <div className="more-questions">
        <button type="button">More Answered Questions</button>
        {' '}
        <AddQuestion product={productOverviewId} refresh={submitRefresh} />
      </div>
    </div>
  );
}
