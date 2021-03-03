const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const config = require('../config.js');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => {
  res.send('hello from server');
});

app.get('/related-products', (req, res) => {
  const options = {
    headers: {
      Authorization: config.TOKEN,
    },
  };

  const productOverviewId = req.query.id;
  const relatedProductObjs = [];

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/related`, options)
    .then(({ data }) => {
      const promiseArray = [];

      for (let i = 0; i < data.length; i++) {
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
  const options = {
    headers: {
      Authorization: config.TOKEN,
    },
  };

  const productOverviewId = req.query.id;
  const relatedProductsStyles = {};

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}/related`, options)
    .then(({ data }) => {
      const promiseArray = [];

      for (let i = 0; i < data.length; i++) {
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
  const options = {
    headers: {
      Authorization: config.TOKEN,
    },
  };

  const productOverviewId = req.query.id;
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/${productOverviewId}`, options)
    .then(({ data }) => { res.send(data.features); })
    .catch(() => res.sendStatus(400));
});

app.listen(PORT, () => {
  console.log(`server listening on localhost: ${PORT}`);
});
