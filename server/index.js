const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const axios = require('axios');
const config = require('../config.js');
const db = require('../database');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.use(express.static(PUBLIC_DIR));

const options = {
  headers: {
    Authorization: config.TOKEN,
  },
};

// ======================================================================
// Questions and Answers
// ======================================================================

app.get('/qa/questions/:productId', (req, res) => {
  const { productId } = req.params;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions/?product_id=${productId}`, options)
    .then(({ data }) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.log('there was an error getting questions based on product id', err);
    });
});

app.post('/qa/questions/:productId', (req, res) => {
  const { productId } = req.params;
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions/?product_id=${productId}`, req.body, options)
    .then(() => {
      res.status(201).end('created');
    }).catch((err) => {
      console.log('error sending post request', err);
    });
});

app.get('/qa/questions/:questionId/answers', (req, res) => {
  const { questionId } = req.params;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions/${questionId}/answers`, options)
    .then(({ data }) => {
      res.status(200).send(data);
    }).catch((err) => {
      console.log('there was an error at the server getting answers', err);
    });
});

app.put('/qa/questions/:questionId/helpful', (req, res) => {
  const { questionId } = req.params;

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions/${questionId}/helpful`, req.body, options)
    .then(() => {
      res.status(204).end('NO CONTENT');
    }).catch((err) => {
      console.log('error updating helpfulness', err);
    });
});

app.put('/qa/questions/:questionId/report', (req, res) => {
  const { questionId } = req.params;

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/questions/${questionId}/report`, req.body, options)
    .then(() => {
      res.status(204).end('NO CONTENT');
    }).catch((err) => {
      console.log('error reporting the question', err);
    });
});

app.put('/qa/answers/:answerId/helpful', (req, res) => {
  const { answerId } = req.params;

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/answers/${answerId}/helpful`, req.body, options)
    .then(() => {
      res.status(204).end('NO CONTENT');
    }).catch((err) => {
      console.log('error adding to answer helpfulness', err);
    });
});

app.put('/qa/answers/:answerId/report', (req, res) => {
  const { answerId } = req.params;

  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/qa/answers/${answerId}/report`, req.body, options)
    .then(() => {
      res.status(204).end('NO CONTENT');
    }).catch((err) => {
      console.log('error reporting answer at server', err);
    });
});

// ======================================================================
// Product Overview & Related & Outfits
// ======================================================================

app.get('/styles', (req, res) => {
  const productOverviewId = req.query.id;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/styles`, options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/products', (req, res) => {
  const productOverviewId = req.query.id;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}`, options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/related-products', (req, res) => {
  const productOverviewId = req.query.id;
  const relatedProductObjs = [];

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/related`, options)
    .then(({ data }) => {
      const promiseArray = [];

      for (let i = 0; i < data.length; i += 1) {
        promiseArray.push(
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${data[i]}`, options)
            .then(({ data }) => relatedProductObjs.push(data))
            .catch((err) => console.log('error in getting single product obj when getting related products: ', err)),
        );
      }

      Promise.all(promiseArray)
        .then(() => res.send(relatedProductObjs))
        .catch((err) => console.log('error in resolving promise.all: ', err));
    })
    .catch(() => res.sendStatus(400));
});

app.get('/related-styles', (req, res) => {
  const productOverviewId = req.query.id;
  const relatedProductsStyles = {};

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/related`, options)
    .then(({ data }) => {
      const promiseArray = [];

      for (let i = 0; i < data.length; i += 1) {
        promiseArray.push(
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${data[i]}/styles`, options)
            .then(({ data }) => {
              relatedProductsStyles[data.product_id] = data.results;
            })
            .catch((err) => console.log('error in getting single style obj when getting related products: ', err)),
        );
      }

      Promise.all(promiseArray)
        .then(() => res.send(relatedProductsStyles))
        .catch((err) => console.log('error in resolving promise.all: ', err));
    })
    .catch(() => res.sendStatus(400));
});

app.get('/product-features', (req, res) => {
  const productOverviewId = req.query.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}`, options)
    .then(({ data }) => { res.send(data); })
    .catch(() => res.sendStatus(400));
});

app.get('/outfit-styles', (req, res) => {
  const productOverviewId = req.query.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/styles`, options)
    .then(({ data }) => { res.send(data); })
    .catch(() => res.sendStatus(400));
});

// ======================================================================
// RATINGS & REVIEWS
// ======================================================================

app.get('/reviews', (req, res) => {
  const productOverviewId = req.query.id;
  const sortId = req.query.sort;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/?product_id=${productOverviewId}&count=100&sort=${sortId}`, options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(() => res.sendStatus(400));
});

app.get('/reviews/meta', (req, res) => {
  const productOverviewId = req.query.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/meta/?product_id=${productOverviewId}`, options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(() => res.sendStatus(400));
});

app.put('/reviews/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/${req.body.id}/helpful`, { body: { review_id: req.body.id } }, options)
    .then(() => res.send(204))
    .catch(() => console.log('error in updating helpfulness'));
});

app.put('/reviews/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/${req.body.id}/report`, { body: { review_id: req.body.id } }, options)
    .then(() => res.send(204))
    .catch(() => console.log('report error'));
});

app.post('/reviews', (req, res) => {
  const productOverviewId = req.body.product_id;
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/reviews/?product_id=${productOverviewId}`, req.body, options)
    .then(() => {
      res.status(201).end('created');
    })
    .catch((error) => console.log('server review post err', error));
});

// ======================================================================
// clicktracker for entire page
// ======================================================================

app.post('/clicktracker', (req, res) => {
  const params = [req.body.element, req.body.modulecomponent];
  const queryStr = 'INSERT INTO clicktracker (element, module) VALUES (?, ?)';

  db.query(queryStr, params, (err, data) => {
    if (err) {
      console.log('error in querying storeClick: ', err);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(PORT, () => {
  console.log(`server listening on localhost: ${PORT}`);
});
