import React from 'react';
import moment from 'moment';

const tileBox = {
  border: '1px black',
  float: 'center',
  padding: '2em',
  lineHeight: '2.5em',
  font: 'Georgia',
};

function ReviewIndividualTile(props) {
  const { review } = props;
  return (
    <div style={tileBox} className="review-entry">
      <span style={{ padding: '15px' }}>
        <i className="far fa-star">{review.rating}</i>
      </span>
      <span style={{ float: 'right', fontSize: '12px', wordSpacing: '2px' }}>
        {review.reviewer_name}, { moment(review.date).format('LL')}
      </span>
      <div>
        <strong>{review.summary}</strong>
      </div>
      <div style={{ lineHeight: '1em' }}>
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
