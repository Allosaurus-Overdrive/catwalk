import React from 'react';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';

const tileBox = {
  borderBottom: '1px solid black',
  lineHeight: '2.5em',
  font: 'Georgia',
};

function ReviewIndividualTile(props) {
  const { review } = props;
  return (
    <div style={tileBox} className="review-entry">
      <span>
        {[...Array(5)].map((star, idx) => (
        <label key={idx} value={review.rating}>
          <FaStar size={13} color={review.rating > idx ? '#ffc107' : 'lightgrey'} />
          </label>
        ))}
      </span>
      <span style={{ float: 'right', fontSize: '13px', wordSpacing: '2px' }}>
        {review.reviewer_name}, { moment(review.date).format('LL')}
      </span>
      <div style={{ lineHeight: '1em' }}>
        <strong>{review.summary}</strong>
      </div>
      <div style={{ lineHeight: '1.2em' }}>
        {review.body}
      </div>
      <div>
        {review.recommend ? <i className="far fa-check-circle"><em>I recommend this product</em></i> : null}
      </div>
      <div style={{ fontSize: '14px' }}>
        Helpful?
        {review.helpfulness ? ` Yes(${review.helpfulness})` : 'No'}
      </div>
    </div>
  );
}

export default ReviewIndividualTile;
