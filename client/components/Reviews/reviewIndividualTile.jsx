import React from 'react';
import moment from 'moment';
const tileBox = {
  border: '1px solid black',
  margin: '2em',
};

function ReviewIndividualTile(props) {
  return (
    <div style={tileBox} className="review-entry">
      <span>
        {props.review.rating}
        --------------------
      </span>
      <span>
        {props.review.reviewer_name}
        ,
        {moment(props.review.date).format('LL')}
      </span>
      <div>
        <strong>{props.review.summary}</strong>
      </div>
      <div>
        {props.review.body}
      </div>
      <div>
        {props.review.recommend ? <i className="far fa-check-circle">I recommend this product</i>: null}
      </div>
      <div>
        Helpful?
        {props.review.helpfulness ? `Yes (${props.review.helpfulness})`: 'No'}
      </div>
    </div>
  );
}

export default ReviewIndividualTile;
