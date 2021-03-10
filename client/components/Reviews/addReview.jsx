/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaStar } from 'react-icons/fa';

Modal.setAppElement('#app');
function AddReview({ productOverviewId, clickTracker }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recommend, setIsRecommended] = useState();
  const [summary, setChangeSummary] = useState('');
  const [body, setChangeReview] = useState('');
  // eslint-disable-next-line camelcase
  const [reviewer_name, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setUploadPhoto] = useState(null);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [size, setSize] = useState(null);
  const [fit, setFit] = useState(null);
  const [comfort, setComfort] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [qual, setQual] = useState(null);

  const postReviewObj = {
    product_id: productOverviewId,
    rating,
    summary,
    body,
    recommend,
    name: reviewer_name,
    email,
    photos: [],
    characteristics: {},
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalIsOpen(false);
    axios.post('/reviews', postReviewObj)
      .then(() => console.log('added new review'))
      .catch(() => console.log('error posting review'));
  };

  const onPhotoUpload = (event) => {
    setUploadPhoto(URL.createObjectURL(event.target.files[0]));
  };

  const handleRating = () => {
    if (rating === 1) {
      return (<span>Poor</span>);
    } if (rating === 2) {
      return (<span>Fair</span>);
    } if (rating === 3) {
      return (<span>Average</span>);
    } if (rating === 4) {
      return (<span>Good</span>);
    } if (rating === 5) {
      return (<span>Great</span>);
    }
  };

  const handleSize = () => {
    if (size === 1) {
      return (<span>A size too small</span>);
    } if (size === 2) {
      return (<span>½ a size too small</span>);
    } if (size === 3) {
      return (<span>Perfect</span>);
    } if (size === 4) {
      return (<span>½ a size too big</span>);
    } if (size === 5) {
      return (<span>A size too wide</span>);
    }
  };

  const handleWidth = () => {
    if (width === 1) {
      return (<span>Too narrow</span>);
    } if (width === 2) {
      return (<span>Slightly narrow</span>);
    } if (width === 3) {
      return (<span>Perfect</span>);
    } if (width === 4) {
      return (<span>Slightly wide</span>);
    } if (width === 5) {
      return (<span>Too wide</span>);
    }
  };

  const handleComfort = () => {
    if (comfort === 1) {
      return (<span>Uncomfortable</span>);
    } if (comfort === 2) {
      return (<span>Slightly uncomfortable</span>);
    } if (comfort === 3) {
      return (<span>Ok</span>);
    } if (comfort === 4) {
      return (<span>Comfortable</span>);
    } if (comfort === 5) {
      return (<span>Perfect</span>);
    }
  };

  const handleQuality = () => {
    if (qual === 1) {
      return (<span>Poor</span>);
    } if (qual === 2) {
      return (<span>Below average</span>);
    } if (qual === 3) {
      return (<span>What I expected</span>);
    } if (qual === 4) {
      return (<span>Pretty great</span>);
    } if (qual === 5) {
      return (<span>Perfect</span>);
    }
  };

  const handleLength = () => {
    if (length === 1) {
      return (<span>Runs short</span>);
    } if (length === 2) {
      return (<span> Runs slightly short</span>);
    } if (length === 3) {
      return (<span>Perfect</span>);
    } if (length === 4) {
      return (<span>Runs slightly long</span>);
    } if (length === 5) {
      return (<span>Runs long</span>);
    }
  };

  const handleFit = () => {
    if (fit === 1) {
      return (<span>Runs tight</span>);
    } if (fit === 2) {
      return (<span> Runs slightly tight</span>);
    } if (fit === 3) {
      return (<span>Perfect</span>);
    } if (fit === 4) {
      return (<span>Runs slightly long</span>);
    } if (fit === 5) {
      return (<span>Runs long</span>);
    }
  };
  function handleModalClick() {
    setModalIsOpen(true);
    clickTracker(`product id: ${productOverviewId}`, 'Ratings & Reviews/Add Review');
  }
  return (
    <div>
      <button type="button" onClick={handleModalClick} style={{ margin: '1.5em', position: 'relative', left: '200px', bottom: '88px', fontSize: '20px' }}>
        Add Review +
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={
         {
           overlay: { backgroundColor: 'grey' },
           content: {
             backgroundColor: '#33FFD7', fontSize: '18px', textAlign: 'center', width: '1000px', height: '500px', justifyContent: 'space-between', lineHeight: '2em', color: '#C70039',
           },
         }
        }
      >
        <form style={{ float: 'center' }}
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <h2>Write Your Review</h2>
          {/* <h3>About the [products/:product_id.name]</h3> */}
          <div>
            <legend style={{ position: 'relative' }}>How Much Would You Rate This Product?* </legend>
            <div style={{ position: 'relative', left: '20px' }}>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      required
                      style={{ opacity: 0 }}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      size={40}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      color={ratingValue <= (hover || rating) ? '#ffc107' : 'lightgrey'}
                    />
                  </label>
                );
              })}
              <span style={{ padding: '2em', marginTop: '1.5em' }}>{handleRating()}</span>
            </div>
          </div>
          <div style={{ padding: '2em', marginTop: '2em' }}>
            <legend>Do You Recommend?* </legend>
            <input
              required
              type="radio"
              id="yes"
              name="recommend"
              value="yes"
              onChange={() => setIsRecommended(true)}
            />
            <label htmlFor="yes" title="Recommended">
              Yes
            </label>
            <input
              type="radio"
              id="no"
              name="recommend"
              value="no"
              onChange={() => setIsRecommended(false)}
            />
            <label htmlFor="no" title="notRecommended">
              No
            </label>
          </div>
          <div>
            <br />
            <legend style={{ position: 'relative', top: '44px', right: '15px' }}> Size* </legend>
            <br />
            <div>
              <span style={{ float: 'left', position: 'relative', left: '170px' }}>
                A size too small
              </span>
              {[...Array(5)].map((star, i) => {
                const sizeValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="size"
                      value={sizeValue}
                      required
                      style={{ width: 60, float: 'center' }}
                      onClick={() => setSize(sizeValue)}
                    />
                  </label>
                );
              })}
              <span style={{ float: 'right', position: 'relative', right: '240px' }}>A size too big</span>
              <span style={{ padding: '1em', position: 'relative', top: '40px', right: '200px', float: 'center', color: 'black' }}>{handleSize()}</span>
            </div>
          </div>
          <div>
            <br />
            <legend style={{ position: 'relative', top: '44px' }}> Width* </legend>
            <br />
            <div>
              <span style={{ float: 'left', position: 'relative', left: '170px' }}>
                Too narrow
              </span>
              {[...Array(5)].map((star, i) => {
                const widthValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="width"
                      value={widthValue}
                      required
                      style={{ width: 60, float: 'center' }}
                      onClick={() => setWidth(widthValue)}
                    />
                  </label>
                );
              })}
              <span style={{ float: 'right', position: 'relative', right: '240px' }}>
                Too wide
              </span>
              <span style={{ padding: '1em', position: 'relative', top: '40px', right: '200px', float: 'center', color: 'black' }}>{handleWidth()}</span>
            </div>
          </div>
          <div>
            <br />
            <legend style={{ position: 'relative', top: '44px' }}> Comfort* </legend>
            <br />
            <div>
              <span style={{ float: 'left', position: 'relative', left: '170px' }}>
                Uncomfortable
              </span>
              {[...Array(5)].map((star, i) => {
                const comfortValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="comfort"
                      value={comfortValue}
                      required
                      style={{ width: 60, float: 'center' }}
                      onClick={() => setComfort(comfortValue)}
                    />
                  </label>
                );
              })}
              <span style={{ float: 'right', position: 'relative', right: '240px' }}>
                Perfect
              </span>
              <span style={{ padding: '1em', position: 'relative', top: '40px', right: '200px', float: 'center', color: 'black' }}>{handleComfort()}</span>
            </div>
          </div>
          <div>
            <br />
            <legend style={{ position: 'relative', top: '44px' }}> Length* </legend>
            <br />
            <div>
              <span style={{ float: 'left', position: 'relative', left: '170px' }}>
                Runs short
              </span>
              {[...Array(5)].map((star, i) => {
                const lengthValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="length"
                      value={lengthValue}
                      required
                      style={{ width: 60, float: 'center' }}
                      onClick={() => setLength(lengthValue)}
                    />
                  </label>
                );
              })}
              <span style={{ float: 'right', position: 'relative', right: '240px' }}>
                Runs long
              </span>
              <span style={{ padding: '1em', position: 'relative', top: '40px', right: '200px', float: 'center', color: 'black' }}>{handleLength()}</span>
            </div>
          </div>
          <div>
            <br />
            <legend style={{ position: 'relative', top: '44px' }}> Fit* </legend>
            <br />
            <div>
              <span style={{ float: 'left', position: 'relative', left: '170px' }}>
                Runs tight
              </span>
              {[...Array(5)].map((star, i) => {
                const fitValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="fit"
                      value={fitValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setFit(fitValue)}
                    />
                  </label>
                );
              })}
              <span style={{ float: 'right', position: 'relative', right: '240px' }}>
                Runs big
              </span>
              <span style={{ padding: '1em', position: 'relative', top: '40px', right: '200px', float: 'center', color: 'black' }}>{handleFit()}</span>
            </div>
          </div>
          <div>
            <br />
            <legend style={{ position: 'relative', top: '44px' }}> Quality* </legend>
            <br />
            <div>
              <span style={{ float: 'left', position: 'relative', left: '170px' }}>
                Poor
              </span>
              {[...Array(5)].map((star, i) => {
                const qualValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="qual"
                      value={qualValue}
                      required
                      style={{ width: 60 }}
                      onClick={() => setQual(qualValue)}
                    />
                  </label>
                );
              })}
              <span style={{ float: 'right', position: 'relative', right: '240px' }}>
                Perfect
              </span>
              <span style={{ padding: '1em', position: 'relative', top: '40px', right: '200px', float: 'center', color: 'black' }}>{handleQuality()}</span>
            </div>
          </div>
          <div style={{ padding: '1.5em', marginTop: '4em' }}>
            <label htmlFor="Summary" title="ReviewSummary">
              Review Summary
            </label>
            <textarea
              placeholder="Example: Best Purchase ever"
              maxLength="60"
              value={summary}
              onChange={(event) => setChangeSummary(event.target.value)}
            />
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="Review" title="ReviewBody">
              Review Body*
            </label>
            <textarea
              placeholder="Why did you like the product or not?"
              minLength="50"
              maxLength="1000"
              required
              rows="4"
              value={body}
              onChange={(event) => setChangeReview(event.target.value)}
            />
          </div>
          <div>
            <input
              type="file"
              name="photo"
              onChange={onPhotoUpload}
            />
            <img
              src={photos}
              height="50"
              width="50"
              alt="User uploaded"
            />
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="nickname" title="nickname">
              What Is Your Nickname?: *
            </label>
            <input
              type="textbox"
              placeholder="Example: jackson11!"
              required
              maxLength={60}
              // eslint-disable-next-line camelcase
              value={reviewer_name}
              onChange={(event) => setNickname(event.target.value)}
            />
            <p style={{ fontSize: '15px' }}>
              (For privacy reasons, do not use your full name or email address)
            </p>
          </div>
          <div style={{ padding: '1.5em' }}>
            <label htmlFor="email" title="email" required="required" maxLength="60">
              Email: *
            </label>
            <input
              type="email"
              placeholder="Example: jackson11@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ fontSize: '15px' }}>
              (For authentication reasons, you will not be emailed)
            </p>
          </div>
          <button
            type="submit"
          >
            Submit Review
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default AddReview;
