import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaStar } from 'react-icons/fa';

const tileBox = {
  borderBottom: '1px solid black',
  lineHeight: '2.5em',
  font: 'Georgia',
};

function ReviewIndividualTile(props) {
  const { review } = props;
  const [yesCount, setYesCount] = useState(review.helpfulness);
  const [helpful, setHelpful] = useState(false);

  function handleYesClick() {
    if (!helpful) {
      setYesCount(yesCount + 1);
      axios.put('/reviews/helpful', { id: review.review_id })
        .then(() => setHelpful(true))
        .catch((err) => console.log(err));
    }
  }
  function handleNoClick() {
    axios.put('/reviews/report', { id: review.review_id })
      .then(() => console.log('removed item'))
      .catch((err) => console.log(err));
  }

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
      <div style={{ lineHeight: '1.5em', marginBottom: '1.5em' }}>
        {review.body}
        <br />
      </div>
      <div style={{ position: 'relative', left: '80px' }}>
        {review.photos.map((photo) => (
          review.photos.length > 0 ? <img height="60px" width="60px" border="3px" src={photo.url} alt="uploadedImg" /> : null
        ))}
      </div>
      <div style={{backgroundColor: 'lightgrey', fontSize: '16px', marginTop: '1em', marginBottom: '1em'}}>
        {review.response === null ? null : `Response from seller:  ${review.response}`}
      </div>
      <div>
        {review.recommend ? <i className="far fa-check-circle"><em>I recommend this product</em></i> : null}
      </div>
      <div style={{ fontSize: '14px' }}>
        Helpful?
        <button type="button" style={{ backgroundColor: 'transparent', border: 'none', position: 'relative', left: '5px' }} onClick={handleYesClick}> Yes </button>
        {yesCount === 0 ? null : `(${yesCount})`}
        <button type="button" style={{ backgroundColor: 'transparent', border: 'none', position: 'relative', left: '5px' }} onClick={handleNoClick}> Report </button>
      </div>
    </div>
  );
}

export default ReviewIndividualTile;
